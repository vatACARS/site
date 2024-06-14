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
        include: {
            discord_user: true,
            auth_token: true
        }
    });

    let discord = null;
    let authToken = [];

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
            include: {
                discord_user: true,
                auth_token: true
            }
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
            }).then((res) => res.json()).catch(async () => {
                let body = new URLSearchParams({
                    client_id: process.env.discord_client_id,
                    client_secret: process.env.discord_client_secret,
                    grant_type: "refresh_token",
                    code: user.discord_user.refresh_token
                }).toString();
            
                const { access_token = null, refresh_token, token_type = "Bearer" } = await fetch("https://discord.com/api/oauth2/token", {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    method: "POST",
                    body,
                }).then((res) => res.json());

                await prisma.vatACARSUser.update({
                    where: { cid: session.user.data.cid },
                    data: {
                        discord_user: {
                            update: {
                                access_token: access_token.toString(),
                                refresh_token: refresh_token.toString(),
                            },
                        },
                    },
                });
            });
            if ("id" in user) {
                discord = {
                    id: discordUser.id,
                    username: discordUser.username,
                    discriminator: discordUser.discriminator,
                    avatar: discordUser.avatar
                }
            }
        }

        if(user.auth_token) {
            authToken = [{
                token: user.auth_token.token,
                creatred: user.auth_token.created,
                expires: user.auth_token.expires
            }]
        }
    }

    const vatACARSUserData: VatACARSUserData = {
        data: {
            authorised: true,
            cid, name_first, name_last, email, rating, division, region, subdivision,
            discord,
            authToken
        }
    }

    session.user = vatACARSUserData;
    await session.save();

    return res.redirect("/me");
}