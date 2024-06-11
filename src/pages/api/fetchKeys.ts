import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
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

    return res.json({ success: true, apiKeys: [ VatACARSUser.auth_token ] || [] });
}