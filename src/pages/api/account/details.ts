import { sendApiResponse } from "@lib/apiResponse";
import { SessionData, sessionOptions } from "@lib/session";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.user) return sendApiResponse(res, "error", "Not logged in.", {}, 401);

    const acarsUser = await prisma.acarsUser.findUnique({
        where: {
            id: session.user.id
        },
        include: {
            oauthAccounts: true
        }
    });

    if(!acarsUser) return sendApiResponse(res, "error", "User not found.", {}, 404);

    return sendApiResponse(res, "success", "User details retrieved successfully.", {
        user: {
            id: acarsUser.id,
            email: acarsUser.email,
            firstName: acarsUser.firstName,
            lastName: acarsUser.lastName,
            createdAt: acarsUser.createdAt,
            updatedAt: acarsUser.updatedAt,
            oauthAccounts: acarsUser.oauthAccounts.map(oauthAccount => {
                return {
                    id: oauthAccount.id,
                    provider: oauthAccount.provider,
                    providerId: oauthAccount.providerId,
                    createdAt: oauthAccount.createdAt,
                    updatedAt: oauthAccount.updatedAt
                };
            })
        }
    });
}