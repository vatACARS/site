import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") return res.status(405).json({ success: false, message: `${req.method} method prohibited.` });
    const { token } = req.query;
    if(!token || typeof token !== "string") return res.status(401).json({ success: false, message: "Missing token in request query." });

    let VatACARSUserToken = await prisma.authToken.findUnique({ where: { token }} );
    if(!VatACARSUserToken) return res.status(401).json({ success: false, message: "Bad auth token" });

    let VatACARSUser = await prisma.vatACARSUser.findUnique({ where: { id: VatACARSUserToken.acars_user_id } });
    if(!VatACARSUser) return res.status(500).json({ success: false, message: "Missing user for auth token. Please email contact@vatacars.com" });

    const vatsimUserInfo = await fetch("https://auth.vatsim.net/api/user", {
        headers: {
            Authorization: `Bearer ${VatACARSUser.access_token}`,
            Accept: "application/json"
        },
    }).then((res) => res.json());

    const { cid, personal, vatsim } = vatsimUserInfo.data;
    const { name_first, name_last, email = "N/A" } = personal;
    const { rating, division, region, subdivision } = vatsim;

    const vatACARSUserData = {
        data: {
            authorised: true,
            cid, name_first, name_last, email, rating, division, region, subdivision
        }
    }

    return res.status(200).json({ success: true, vatACARSUserData });
}