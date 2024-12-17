import { hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { useEffect } from "react";
import { useRouter } from "next/router";

import { VscLoading } from "react-icons/vsc"
import { FaGoogle } from "react-icons/fa6";

export default () => {
    const router = useRouter();

    useEffect(() => {
        return
    }, [ router ]);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full gap-y-4 flex flex-col items-center justify-center">
            <FaGoogle className="text-4xl" />
            <h3 className="font-medium text-xl animate-pulse">Please wait...</h3>
            <div className="pt-12">
                <div className="flex space-x-4 items-center rounded bg-slate-800 py-2 px-8">
                    <span className="font-medium">
                        Communicating with Google
                    </span>
                    <VscLoading className="animate-spin text-xl" />
                </div>
            </div>
        </div>
    )
}