import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
	password: process.env.AUTH_COOKIE_PWD as string,
	cookieName: "session",
	cookieOptions: {
		secure: false
	}
}

export interface SessionData {
	user: {
		id: string;
		username: string;
		firstName: string;
		lastName: string;
	}
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
