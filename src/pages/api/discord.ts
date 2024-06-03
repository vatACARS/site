import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "../../lib/session";
import { PrismaClient } from "@prisma/client";

const scope = ["identify", "guilds.join"].join(" ");

const prisma = new PrismaClient();

const OAUTH_QS = new URLSearchParams({
    client_id: process.env.discord_client_id,
    redirect_uri: process.env.discord_oauth_redirect_uri,
    response_type: "code",
    scope
}).toString();

const OAUTH_URI = `https://discord.com/oauth2/authorize?${OAUTH_QS}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.user) return res.redirect("/api/oauth");

    if (req.method !== "GET") return res.redirect("/");

    const { code = null, error = null } = req.query;

    if (error) {
        return res.redirect(`/?error=${req.query.error}`);
    }

    if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);

    let body = new URLSearchParams({
        client_id: process.env.discord_client_id,
        client_secret: process.env.discord_client_secret,
        grant_type: "authorization_code",
        redirect_uri: process.env.discord_oauth_redirect_uri,
        code,
        scope,
    }).toString();

    const { access_token = null, refresh_token, token_type = "Bearer" } = await fetch("https://discord.com/api/oauth2/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
    }).then((res) => res.json());

    if (!access_token || typeof access_token !== "string") {
        return res.redirect(OAUTH_URI);
    }

    console.log("token success");

    const user = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `${token_type} ${access_token}` },
    }).then((res) => res.json());

    if (!("id" in user)) {
        return res.redirect(OAUTH_URI);
    }

    body = JSON.stringify({
        access_token: access_token.toString(),
        nick: `${session.user.data.name_first} - ${session.user.data.cid}`
    });

    /*const join = await fetch(`https://discord.com/api/guilds/${"1233928217530990725"}/members/${user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.discord_bot_token}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body
    }).then(resp => resp.json());*/

    session.user.data.discord = {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar
    }

    let VatACARSUser = await prisma.vatACARSUser.findUnique({
        where: { cid: session.user.data.cid },
        include: { discord_user: true }
    });

    if (VatACARSUser.discord_user) {
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
    } else {
        await prisma.vatACARSUser.update({
            where: { cid: session.user.data.cid },
            data: {
                discord_user: {
                    create: {
                        discord_id: user.id,
                        access_token: access_token.toString(),
                        refresh_token: refresh_token.toString(),
                    },
                },
            },
        });
    }

    await session.save();

    res.redirect("/me");
}
