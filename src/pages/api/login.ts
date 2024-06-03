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
    const { name_first, name_last, email } = personal;
    const { rating, division, region, subdivision } = vatsim;
    
    let user = await prisma.vatACARSUser.findUnique({
        where: { cid }
    });

    if(!user) {
        user = await prisma.vatACARSUser.create({
            data: {
                cid: cid,
                access_token: access_token.toString(),
                refresh_token: refresh_token.toString()
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
            })
        }
    }

    const vatACARSUserData: VatACARSUserData = {
        data: {
            authorised: true,
            cid, name_first, name_last, email, rating, division, region, subdivision
        }
    }

    session.user = vatACARSUserData;
    await session.save();

    return res.redirect("/me");
}