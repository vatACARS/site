import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession, IronSession } from "iron-session";
import { SessionData, TemporarySessionData, sessionOptions } from "@lib/session";
import { sendApiResponse } from "@lib/apiResponse";
import { prisma } from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
    const session = await getIronSession<SessionData | TemporarySessionData>(req, res, sessionOptions);
    if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    const { code } = JSON.parse(req.body);
    if (!code) return sendApiResponse(res, "error", "Missing required field: code.", {}, 400);

    const body = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_VATSIM_CLIENT_ID,
        client_secret: process.env.VATSIM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_VATSIM_OAUTH_REDIRECT_URI,
        code,
        scope: ["full_name", "vatsim_details", "email"].join(" "),
    }).toString();

    const { access_token = null, refresh_token, token_type = "Bearer", expires_in } = await fetch("https://auth.vatsim.net/oauth/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
    }).then(async (res) => {
        let resp = await res.json();
        return resp;
    });

    if (!access_token || typeof access_token !== "string") return sendApiResponse(res, "error", "Unexpected response from VATSIM", {}, 502);

    const vatsimUserInfo = await fetch("https://auth.vatsim.net/api/user", {
        headers: {
            Authorization: `${token_type} ${access_token}`,
            Accept: "application/json"
        },
    }).then((res) => res.json());

    const oAuthAccount = await prisma.oAuthAccount.findUnique({
        where: {
            provider_providerId: {
                provider: "vatsim",
                providerId: vatsimUserInfo.data.cid
            }
        },
        include: {
            user: true
        }
    });

    if (oAuthAccount && oAuthAccount.user) {
        await prisma.oAuthAccount.update({
            where: {
                provider_providerId: {
                    provider: "vatsim",
                    providerId: vatsimUserInfo.data.cid
                }
            },
            data: {
                accessToken: access_token,
                refreshToken: refresh_token,
                tokenExpiry: new Date(Date.now() + expires_in * 1000)
            }
        });

        (session as IronSession<SessionData>).user = {
            id: oAuthAccount.user.id,
            username: oAuthAccount.user.username,
            firstName: oAuthAccount.user.firstName,
            lastName: oAuthAccount.user.lastName
        }
        await session.save();

        return sendApiResponse(res, "success", `Logged in as ${oAuthAccount.user.username}`);
    }

    // Account doesn't exist yet - prepare for link
    (session as IronSession<TemporarySessionData>).oauth = {
        provider: "vatsim",
        providerId: vatsimUserInfo.data.cid,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiry: new Date(Date.now() + expires_in * 1000),
        userInfo: vatsimUserInfo,
    };
    await session.save();

    return sendApiResponse(res, "success", "Welcome to vatACARS!", { action: "accountRequired" });
} catch (e) {
    console.error(e);
    return sendApiResponse(res, "error", "An error occurred while logging in.", {}, 500);
}
}