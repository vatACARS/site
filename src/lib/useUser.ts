import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "./fetcher";
import type { VatACARSUserData, VatACARSUnauthorisedUser } from "./types";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
	const { data: user, mutate: mutateUser } = useSWR<VatACARSUserData | VatACARSUnauthorisedUser>("/api/user", fetcher);

	useEffect(() => {
		if(!redirectTo || !user) return;

		if(
			(redirectTo && !redirectIfFound && !user?.data.authorised) ||
			(redirectIfFound && user?.data.authorised)
		) {
			Router.push(redirectTo);
		}
	}, [ user, redirectIfFound, redirectTo ]);

	return { user, mutateUser }
}
