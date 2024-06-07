import { getIronSession } from "iron-session";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionData, sessionOptions } from "../../lib/session";

const prisma = new PrismaClient();

export default async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    await session.destroy();
    res.redirect("/");
}