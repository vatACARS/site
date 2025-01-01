import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@lib/session";
import { sendApiResponse } from "@lib/apiResponse";
import { prisma } from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session || !session.user) return sendApiResponse(res, "error", "You must be logged in to link your Hoppies account.", {}, 401);
    const { hoppiesCode } = JSON.parse(req.body);
    if (!hoppiesCode) return sendApiResponse(res, "error", "Missing required field: hoppiesCode.", {}, 400);

    const oAuthAccount = await prisma.oAuthAccount.findUnique({
        where: {
            provider_providerId: {
                provider: "hoppies",
                providerId: hoppiesCode
            }
        }
    });

    if (oAuthAccount) return sendApiResponse(res, "error", "This Hoppies account is already linked to another user.", {}, 409);

    const data = await fetch("http://www.hoppie.nl/acars/system/connect.html", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            logon: hoppiesCode,
            from: session.user.id.substring(0, 6),
            to: "vatACARS",
            type: "telex",
            packet: "KNOCK KNOCK"
        })
    }).then(data => data.text());
    if(data !== "ok") return sendApiResponse(res, "error", "Invalid Hoppies code.", {}, 400);

    await prisma.oAuthAccount.create({
        data: {
            provider: "hoppies",
            providerId: hoppiesCode,
            accessToken: hoppiesCode,
            refreshToken: "",
            tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
            user: {
                connect: {
                    id: session.user.id
                }
            }
        }
    });

    return sendApiResponse(res, "success", "Hoppies account linked successfully.");
}