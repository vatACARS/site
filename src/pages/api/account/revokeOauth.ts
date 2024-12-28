import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession, IronSession } from "iron-session";
import { SessionData, TemporarySessionData, sessionOptions } from "@lib/session";
import { sendApiResponse } from "@lib/apiResponse";
import { prisma } from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getIronSession<SessionData>(req, res, sessionOptions);
        if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
        const { provider } = JSON.parse(req.body);
        if (!provider) return sendApiResponse(res, "error", "Missing required field: provider.", {}, 400);
        if(!session) return sendApiResponse(res, "error", "Unauthorized.", {}, 401);

        const { oauthAccounts } = await prisma.acarsUser.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                oauthAccounts: true
            }
        });
        if(!oauthAccounts) return sendApiResponse(res, "error", "No OAuth accounts found.", {}, 404);
        if(!oauthAccounts.some((account) => account.provider === provider)) return sendApiResponse(res, "error", "No OAuth account found for this provider.", {}, 404);

        await prisma.oAuthAccount.delete({
            where: {
                provider_providerId: {
                    provider: provider,
                    providerId: oauthAccounts.find((account) => account.provider === provider).providerId
                }
            }
        });

        return sendApiResponse(res, "success", "OAuth account revoked.", {}, 200);
    } catch (e) {
        console.error(e);
        return sendApiResponse(res, "error", "Internal server error.", {}, 500);
    }
}