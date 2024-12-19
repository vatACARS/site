import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "./fetcher";
import type { VatACARSUserData } from "./types";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
    const { data: user, mutate: mutateUser, isValidating } = useSWR<VatACARSUserData>("/api/session", fetcher);

    useEffect(() => {
        if (!redirectTo || !user) return;

        if (
            (redirectTo && !redirectIfFound && !user?.username) ||
            (redirectIfFound && user?.username)
        ) {
            Router.push(redirectTo);
        }
    }, [user, redirectIfFound, redirectTo]);

    return { user, mutateUser, isLoading: isValidating && !user };
}