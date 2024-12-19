import { getIronSession } from "iron-session";
import { sessionOptions, TemporarySessionData } from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";

const cache: { [key: string]: { data: any; expires: number } } = {};
const CACHE_TTL = 60 * 1000; // 1 minute

export default async function userRoute(req: NextApiRequest, res: NextApiResponse) {
	const session = await getIronSession<TemporarySessionData>(req, res, sessionOptions);
	
	if(session.oauth) {
		const cacheKey = `${session.oauth.provider}:${session.oauth.providerId}`;
        
        const cachedData = cache[cacheKey];
        if (cachedData && cachedData.expires > Date.now()) return res.json(cachedData.data);

		if(session.oauth.provider === "vatsim") {
			const vatsimUserInfo = await fetch("https://auth.vatsim.net/api/user", {
				headers: {
					Authorization: `Bearer ${session.oauth.accessToken}`,
					Accept: "application/json"
				},
			}).then((res) => res.json());

			const responseData = {
                provider: session.oauth.provider,
                providerId: session.oauth.providerId,
                userInfo: {
					firstName: vatsimUserInfo.data.personal.name_first,
					lastName: vatsimUserInfo.data.personal.name_last,
					email: vatsimUserInfo.data.personal.email
				}
            };

			cache[cacheKey] = {
                data: responseData,
                expires: Date.now() + CACHE_TTL
            };

			return res.json(responseData);
		} else return res.json({});
	} else return res.json({});
}