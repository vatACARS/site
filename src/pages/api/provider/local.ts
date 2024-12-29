import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession, IronSession } from "iron-session";
import { SessionData, sessionOptions } from "@lib/session";
import { sendApiResponse } from "@lib/apiResponse";
import { prisma } from "@lib/prisma";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    const { email, password } = JSON.parse(req.body);
    if (!email) return sendApiResponse(res, "error", "Missing required field: email.", {}, 400);
    if (!password) return sendApiResponse(res, "error", "Missing required field: password.", {}, 400);

    let userAccount = await prisma.acarsUser.findUnique({
        where: { email }
    });

    if(!userAccount) userAccount = await prisma.acarsUser.findUnique({
        where: { username: email }
    });

    if(!userAccount) return sendApiResponse(res, "error", "Incorrect login credentials.", {}, 401);

    bcrypt.compare(password, userAccount.password, async (e, result) => {
        if(e) return sendApiResponse(res, "error", "Something went wrong on our end.", {}, 500);
        if(!result) return sendApiResponse(res, "error", "Incorrect login credentials.", {}, 401);

        (session as IronSession<SessionData>).user = {
            id: userAccount.id,
            username: userAccount.username,
            firstName: userAccount.firstName,
            lastName: userAccount.lastName
        }
        await session.save();

        return sendApiResponse(res, "success", `Logged in as ${userAccount.username}`, {
            id: userAccount.id,
            username: userAccount.username,
            firstName: userAccount.firstName,
            lastName: userAccount.lastName,
            apiToken: userAccount.apiToken
        });
    });
}