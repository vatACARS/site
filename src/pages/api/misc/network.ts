import { NextApiRequest, NextApiResponse } from "next";

export default async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch("https://api.vatacars.com/data/network", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resp => resp.json());

    return res.status(200).json(response);
}