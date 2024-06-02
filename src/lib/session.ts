import type { SessionOptions } from "iron-session";
import type { VatACARSUserData } from "./types";

export const sessionOptions: SessionOptions = {
	password: process.env.auth_cookie_pwd as string,
	cookieName: "session",
	cookieOptions: {
		secure: true
	}
}

export interface SessionData {
	user: VatACARSUserData
}
