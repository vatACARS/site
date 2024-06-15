import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") return res.status(405).json({ success: false, message: `${req.method} method prohibited.` });
    const { token } = req.query;
    if(!token || typeof token !== "string") return res.status(401).json({ success: false, message: "Missing token in request query." });

    let VatACARSUserToken = await prisma.authToken.findUnique({ where: { token }} );
    if(!VatACARSUserToken) return res.status(401).json({ success: false, message: "Bad auth token" });

    let VatACARSUser = await prisma.vatACARSUser.findUnique({ where: { id: VatACARSUserToken.acars_user_id }, include: { vatsim_user: true } });
    if(!VatACARSUser || !VatACARSUser.vatsim_user) return res.status(500).json({ success: false, message: "Missing user for auth token. Please email contact@vatacars.com" });

    
    const cid = VatACARSUser.cid;
    const { name_first, name_last} = VatACARSUser.vatsim_user;
    const rating = {
        id: VatACARSUser.vatsim_user.rating_id,
        long: VatACARSUser.vatsim_user.rating_long,
        short: VatACARSUser.vatsim_user.rating_short
    };
    const division = {
        id: VatACARSUser.vatsim_user.division_id,
        name: VatACARSUser.vatsim_user.division_name
    };
    const region = {
        id: VatACARSUser.vatsim_user.region_id,
        name: VatACARSUser.vatsim_user.region_name
    };
    const subdivision = {
        id: VatACARSUser.vatsim_user.sdivision_id,
        name: VatACARSUser.vatsim_user.sdivision_name
    };

    const vatACARSUserData = {
        data: {
            authorised: true,
            cid, name_first, name_last, rating, division, region, subdivision
        }
    }

    return res.status(200).json({ success: true, vatACARSUserData });
}