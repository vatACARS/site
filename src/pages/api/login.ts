import type { VatACARSUserData } from "../../lib/types";
import { getIronSession } from "iron-session";
import { PrismaClient } from "@prisma/client/edge";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionData, sessionOptions } from "../../lib/session";

const prisma = new PrismaClient();

export default async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    const { token_type, access_token, refresh_token } = req.query;
    if(!token_type || !access_token || !refresh_token) return res.redirect("/api/oauth");

    const { cid, name_first, name_last, email, rating, division, region, subdivision } = await fetch("https://auth.vatsim.net/api/user", {
        headers: { Authorization: `${token_type[0]} ${access_token[0]}` },
    }).then((res) => res.json());

    let user = await prisma.vatACARSUser.findUnique({
        where: { cid }
    });

    if(!user) {
        user = await prisma.vatACARSUser.create({
            data: {
                cid: cid,
                access_token: access_token[0],
                refresh_token: refresh_token[0]
            }
        });
    }

    const vatACARSUserData: VatACARSUserData = {
        data: {
            authorised: true,
            cid, name_first, name_last, email, rating, division, region, subdivision
        }
    }

    session.user = vatACARSUserData;
    await session.save();

    return res.json(vatACARSUserData);
}