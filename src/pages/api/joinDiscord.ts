import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "../../lib/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.user) return res.status(401).json({ success: false, message: "Not logged in" });
    const { nickname } = await req.body;
    let nick = parseInt(nickname);
    if(!nick || nick < 1 || nick > 4) nick = 1;

    const nicks = [
        `${session.user.data.name_first} - ${session.user.data.cid}`,
        `${session.user.data.name_first} ${session.user.data.name_last.substring(0, 1)} - ${session.user.data.cid}`,
        `${session.user.data.name_first} ${session.user.data.name_last} - ${session.user.data.cid}`,
        `| ${session.user.data.cid} |`
    ]

    let VatACARSUser = await prisma.vatACARSUser.findUnique({
        where: { cid: session.user.data.cid },
        include: { discord_user: true }
    });

    if(!VatACARSUser.discord_user) return res.status(401).json({ success: false, message: "Discord account not linked" });

    const body = JSON.stringify({
        access_token: VatACARSUser.discord_user.access_token.toString(),
        nick: nicks[nick-1]
    });

    const resp = await fetch(`https://discord.com/api/guilds/${"1233928217530990725"}/members/${VatACARSUser.discord_user.discord_id}`, {
        headers: {
            Authorization: `Bot ${process.env.discord_bot_token}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body
    });

    if(resp.status == 204) return res.json({ success: true, message: "You're already in the server." });
    res.json({ success: true, message: `Added you as: ${nicks[nick-1]}` });
}