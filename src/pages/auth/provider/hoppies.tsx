import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const qs = require("querystring");
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FaSatellite } from "react-icons/fa6";

export default () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState("");
    const [success, setSuccess] = useState("");

    const loginSchema = Yup.object().shape({
        hoppiesCode: Yup.string().required().min(16)
    });
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(loginSchema) });
    const { errors } = formState;

    async function submitHoppies(data) {
        setLoading(true);
        setFailed("");
        setSuccess("");

        const resp = await fetch("/api/provider/hoppies", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(resp => resp.json());

        if (resp.status !== "success") {
            setLoading(false);
            return setFailed(resp.message);
        }

        setSuccess(resp.message);
        setTimeout(() => router.push("/me"), 2000);
    }


    return (
        <div className="my-12 gap-y-4 flex flex-col items-center justify-center">
            <FaSatellite className="text-6xl text-blue-500" />
            <h3 className="font-medium text-xl">{failed ? failed : success ? success : "Enter your Hoppies logon code:"}</h3>
            <form onSubmit={handleSubmit(submitHoppies)} className="pt-12">
                <div className="relative">
                    <input disabled={loading} {...register("hoppiesCode")} type="text" className="px-4 py-2 min-w-96 border border-gray-300 rounded-lg" required />
                </div>
                <div className="relative pt-3 flex justify-center">
                    <button disabled={loading} type="submit" className="btn inline-flex w-full bg-blue-500 w-48 text-slate-100 outline-none hover:bg-blue-400 transition-all duration-200">
                        {loading ? <span className="loading loading-infinity" /> : "Link"}
                    </button>
                </div>
            </form>
        </div>
    )
}