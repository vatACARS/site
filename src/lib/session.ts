import type { SessionOptions } from "iron-session";
import type { VatACARSUserData } from "./types";

export const sessionOptions: SessionOptions = {
	password: process.env.AUTH_COOKIE_PWD as string,
	cookieName: "session",
	cookieOptions: {
		secure: true
	}
}

export interface SessionData {
	user: VatACARSUserData;
}

export interface TemporarySessionData {
	oauth: {
		provider: "vatsim" | "google" | "discord";
		providerId: string;
		accessToken: string;
		refreshToken: string;
		tokenExpiry: Date;
		userInfo: any;
	}
}
