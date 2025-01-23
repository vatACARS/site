import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("querystring");

import { VscLoading } from "react-icons/vsc"

const OAUTH_QS = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_VATSIM_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_VATSIM_OAUTH_REDIRECT_URI,
    response_type: "code",
    scope: ["full_name", "vatsim_details", "email"].join(" "),
}).toString();

const OAUTH_URI = `https://auth.vatsim.net/oauth/authorize?${OAUTH_QS}`;

export default () => {
    const router = useRouter();
    const [status, setStatus] = useState("Checking your browser");
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(!router.isReady) return;
        if(!router.query?.z) {
            router.replace({
                pathname: "/auth/provider/vatsim",
                query: qs.stringify({ z: true, ...router.query })
            }, "/login", { shallow: true });
        }
        if(router && !router.query?.code) {
            setStatus("Redirecting you to VATSIM...");
            setTimeout(() => router.push(OAUTH_URI), 3000);
            return;
        }

        const connect = async () => {
            setStatus("Communicating with VATSIM...");

            const resp = await fetch("/api/provider/vatsim", {
                method: "POST",
                body: JSON.stringify({ code: router.query?.code })
            }).then(resp => resp.json());

            if(resp.status !== "success") {
                setFailed(true);
                return setStatus(resp.message);
            }

            setSuccess(true);
            setStatus(resp.message);

            if(resp.data?.action! === "accountRequired") return setTimeout(() => router.push("/auth/onboarding"), 3000);
            return setTimeout(() => router.push("/me"), 3000);
        }

        connect();
    }, [ router.isReady ]);

    return (
        <div className="my-12 gap-y-4 flex flex-col items-center justify-center">
            <img src="/img/VATSIM_Logo_No_Tagline_2000px.png"
                alt="VATSIM Logo"
                className="hover:opacity-80 transition-opacity w-52"
            />
            <h3 className="font-medium text-xl animate-pulse">{failed ? "Something went wrong!" : success ? "Identity confirmed." : "Please wait..."}</h3>
            <div className="pt-12">
                <div className="flex space-x-4 items-center rounded bg-slate-800 py-2 px-8">
                    <span className="font-medium">
                        {status}
                    </span>
                    {(!failed || !success) && <VscLoading className="animate-spin text-xl" />}
                </div>
                {failed && (
                    <div className="flex items-center justify-center">
                        <button onClick={async () => { await router.push("/auth/provider/vatsim"); router.reload() }} className="cursor-pointer mt-12 rounded bg-blue-500 hover:bg-blue-400 text-medium transition-all duration-200 px-4 py-2">Try again</button>
                    </div>
                )}
            </div>
        </div>
    )
}