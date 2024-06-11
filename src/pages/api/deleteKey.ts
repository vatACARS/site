import { randomBytes } from "node:crypto";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") return res.status(405).json({ success: false, message: `${req.method} method prohibited.` });
	const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.user) return res.status(401).json({ success: false, message: "Not logged in" });

    const { token } = await req.body;

    let VatACARSUser = await prisma.vatACARSUser.findUnique({
        where: { cid: session.user.data.cid },
        include: { auth_token: true }
    });

    if(VatACARSUser.auth_token.token !== token) return res.status(401).json({ success: false, message: "Token does not exist on your account." });

    await prisma.authToken.delete({
        where: {
            token
        }
    });

    session.user.data.authToken = [];
    await session.save();

    return res.status(200).json({ success: true, message: `Successfully deleted an API key: ${token.substring(0, 10)}(...)` });
}