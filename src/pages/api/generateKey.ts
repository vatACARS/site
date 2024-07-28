import { randomBytes } from "node:crypto";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import agenda from "../../lib/agenda";
import type { AuthTokenLink } from "../../lib/types";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userRoute(req: NextApiRequest, res: NextApiResponse<AuthTokenLink | any>) { // TODO: "any" is ambiguous, we should have an "ApiResponse" type
	const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.user) return res.status(401).json({ success: false, message: "Not logged in" });

    let VatACARSUser = await prisma.vatACARSUser.findUnique({
        where: { cid: session.user.data.cid },
        include: { auth_token: true }
    });

    if(VatACARSUser.auth_token) return res.status(401).json({ success: false, message: "You have reached your limit of (1) API key." });

    const token = `vAcV1-${randomBytes(26).toString('hex').slice(0, 26)}`;
    const created = new Date();
    const expires = new Date(new Date().setMonth(new Date().getMonth() + 6))
    await prisma.vatACARSUser.update({
        where: { cid: session.user.data.cid },
        data: {
            auth_token: {
                create: {
                    token,
                    created,
                    expires
                }
            }
        }
    });

    agenda.schedule("in 6 months", "invalidate auth token", { token })

    session.user.data.authToken = [{ token, created, expires }];

    return res.status(200).json({ success: true, token, created, expires, message: `Successfully created an API key for ${session.user.data.name_first}.` });
}