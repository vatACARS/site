import { sendApiResponse } from "@lib/apiResponse";
import { SessionData, sessionOptions } from "@lib/session";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (req.method !== "POST") return sendApiResponse(res, "error", "Method not allowed.", {}, 405);
    
    await session.destroy();
    return sendApiResponse(res, "success", "Logged out successfully.");
}