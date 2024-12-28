import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("querystring");

import { VscLoading } from "react-icons/vsc"
import { FaSatellite } from "react-icons/fa6";

export default () => {
    const router = useRouter();
    const [status, setStatus] = useState("Checking your browser");
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <div className="my-12 gap-y-4 flex flex-col items-center justify-center">
            <FaSatellite className="text-6xl text-blue-500" />
            <h3 className="font-medium text-xl animate-pulse">{failed ? "Something went wrong!" : success ? "Identity confirmed." : "Please wait..."}</h3>
            <div className="pt-12">
                <div className="flex space-x-4 items-center rounded bg-slate-800 py-2 px-8">
                    <span className="font-medium">
                        {status}
                    </span>
                    {(!failed || !success) && <VscLoading className="animate-spin text-xl" />}
                </div>
            </div>
        </div>
    )
}