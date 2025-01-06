import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession, IronSession } from "iron-session";
import { SessionData, TemporarySessionData, sessionOptions } from "@lib/session";
import { sendApiResponse } from "@lib/apiResponse";
import { prisma } from "@lib/prisma";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<TemporarySessionData>(req, res, sessionOptions);
    if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    if(!session.oauth) return sendApiResponse(res, "error", "Missing onboarding information.", {}, 401);
    const { username, password, firstName, lastName, email } = JSON.parse(req.body);
    if (!username || !password || !firstName || !lastName || !email) return sendApiResponse(res, "error", "Missing required fields.", {}, 400);

    const user = await prisma.acarsUser.findUnique({ where: { username } });
    if (user) return sendApiResponse(res, "error", "That username is taken.", {}, 401);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.acarsUser.create({
        data: {
            username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            email: email,
            oauthAccounts: {
                create: {
                    provider: session.oauth.provider,
                    providerId: session.oauth.providerId,
                    accessToken: session.oauth.accessToken,
                    refreshToken: session.oauth.refreshToken,
                    tokenExpiry: session.oauth.tokenExpiry
                }
            }
        }
    });

    if(session.oauth.provider === "discord") {
        await fetch(`https://discord.com/api/users/@me/applications/${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}/role-connection`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${session.oauth.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                platform_name: "vatACARS",
                platform_username: username
            })
        });
    }

    await session.destroy();

    (session as unknown as IronSession<SessionData>).user = {
        id: newUser.id,
        username,
        firstName: firstName,
        lastName: lastName,
    }

    await session.save();
    return sendApiResponse(res, "success", "Account provisioned successfully.");
}