import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession, IronSession } from "iron-session";
import { SessionData, TemporarySessionData, sessionOptions } from "@lib/session";
import { sendApiResponse } from "@lib/apiResponse";
import { prisma } from "@lib/prisma";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    const { username, password, firstName, lastName, email } = JSON.parse(req.body);
    if (!username || !password || !firstName || !lastName || !email) return sendApiResponse(res, "error", "Missing required fields.", {}, 400);

    let user = await prisma.acarsUser.findUnique({ where: { username } });
    if (user) return sendApiResponse(res, "error", "That username is taken.", {}, 401);
    user = await prisma.acarsUser.findUnique({ where: { email } });
    if (user) return sendApiResponse(res, "error", "That email is already in use.", {}, 401);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.acarsUser.create({
        data: {
            username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            email: email,
        }
    });

    await session.destroy();

    session.user = {
        id: newUser.id,
        username,
        firstName: firstName,
        lastName: lastName,
    }

    await session.save();
    return sendApiResponse(res, "success", "Account provisioned successfully.");
}