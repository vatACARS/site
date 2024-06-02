import { NextApiRequest, NextApiResponse } from "next";
import { VatACARSUserData } from "../../lib/types";

const scope = ["full_name", "vatsim_details", "email"].join(" ");

const OAUTH_QS = new URLSearchParams({
    client_id: process.env.vatsim_client_id,
    redirect_uri: process.env.vatsim_oauth_redirect_uri,
    response_type: "code",
    scope,
}).toString();

const OAUTH_URI = `https://auth.vatsim.net/oauth/authorize?${OAUTH_QS}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.redirect("/");

    const { code = null, error = null } = req.query;

    if (error) {
        return res.redirect(`/?error=${req.query.error}`);
    }

    if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);

    const body = new URLSearchParams({
        client_id: process.env.vatsim_client_id,
        client_secret: process.env.vatsim_client_secret,
        grant_type: "authorization_code",
        redirect_uri: process.env.vatsim_oauth_redirect_uri,
        code,
        scope,
    }).toString();

    const { access_token = null, refresh_token, token_type = "Bearer" } = await fetch("https://auth.vatsim.net/oauth/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
    }).then((res) => res.json());

    if (!access_token || typeof access_token !== "string") {
        return res.redirect(OAUTH_URI);
    }

    res.redirect(`/api/login?token_type=${token_type}&access_token=${access_token}&refresh_token=${refresh_token}`);
}