import type { VatACARSUserData } from "../../lib/types";
import { getIronSession } from "iron-session";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionData, sessionOptions } from "../../lib/session";

const prisma = new PrismaClient();

export default async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    const { token_type, access_token, refresh_token } = req.query;
    if(!token_type || !access_token || !refresh_token) return res.redirect("/api/oauth");

    const vatsimUserInfo = await fetch("https://auth.vatsim.net/api/user", {
        headers: {
            Authorization: `${token_type} ${access_token}`,
            Accept: "application/json"
        },
    }).then((res) => res.json());

    const { cid, personal, vatsim } = vatsimUserInfo.data;
    const { name_first, name_last, email = "N/A" } = personal;
    const { rating, division, region, subdivision } = vatsim;
    
    let user = await prisma.vatACARSUser.findUnique({
        where: { cid },
        include: { discord_user: true }
    });

    let discord = null;

    if(!user) {
        await prisma.vatACARSUser.create({
            data: {
                cid: cid,
                access_token: access_token.toString(),
                refresh_token: refresh_token.toString()
            }
        });

        user = await prisma.vatACARSUser.findUnique({
            where: { cid },
            include: { discord_user: true }
        });
    } else {
        if(user.access_token != access_token) {
            await prisma.vatACARSUser.update({
                where: { cid },
                data: {
                    access_token: access_token.toString(),
                    refresh_token: refresh_token.toString()
                }
            });
        }
        
        if(user.discord_user) {
            const discordUser = await fetch("https://discord.com/api/users/@me", {
                headers: { Authorization: `Bearer ${user.discord_user.access_token}` },
            }).then((res) => res.json());
            if ("id" in user) {
                discord = {
                    id: discordUser.id,
                    username: discordUser.username,
                    discriminator: discordUser.discriminator,
                    avatar: discordUser.avatar
                }
            }
        }
    }

    const vatACARSUserData: VatACARSUserData = {
        data: {
            authorised: true,
            cid, name_first, name_last, email, rating, division, region, subdivision,
            discord
        }
    }

    session.user = vatACARSUserData;
    await session.save();

    return res.redirect("/me");
}