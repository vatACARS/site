import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "./fetcher";
import type { VatACARSUserData } from "./types";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
    let { data: user, mutate: mutateUser, isValidating } = useSWR<VatACARSUserData | any>("/api/session", fetcher);

    useEffect(() => {
        if(isValidating) return;
        if (!redirectTo || user?.failed) return;

        user = user as VatACARSUserData;
        if (
            (redirectTo && !redirectIfFound && !user?.username) ||
            (redirectIfFound && user?.username)
        ) {
            Router.push(redirectTo);
        }
    }, [user, isValidating]);

    return { user, mutateUser, isLoading: isValidating && !user };
}