import { useState, useEffect } from "react";
import useUser from "@lib/useUser";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Image from "next/image";
import { FaLink } from "react-icons/fa6";

export default () => {
    const router = useRouter();
    useUser({ redirectIfFound: true, redirectTo: "/account" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const [onboardingDetails, setOnboardingDetails] = useState({
        provider: "",
        providerId: "",
        userInfo: {
            firstName: "",
            lastName: "",
            email: ""
        }
    });

    useEffect(() => {
        if (!router.isReady) return;

        const getOnboardingDetails = async () => {
            const data = await fetch("/api/getOnboardingDetails").then(res => res.json());
            if (!data.provider) return router.push("/");

            setOnboardingDetails({
                provider: data.provider,
                providerId: data.providerId,
                userInfo: data.userInfo
            });
        }

        getOnboardingDetails();
    }, [router.isReady]);

    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username cannot be more than 20 characters"),
        password: Yup.string()
            .required()
    });
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(loginSchema) });
    const { errors } = formState;

    async function submitLogin(data) {
        setLoading(true);
        setStatus("Provisioning your account...");
        
        const resp = await fetch("/api/account/onboard", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                firstName: onboardingDetails.userInfo.firstName,
                lastName: onboardingDetails.userInfo.lastName,
                email: onboardingDetails.userInfo.email
            })
        }).then(resp => resp.json());

        if (resp.status !== "success") {
            setLoading(false);
            return setStatus(resp.message);
        }

        setStatus(resp.message);
        setTimeout(() => router.push("/me"), 3000);
    }

    return (
        <div className="max-w-6xl py-12 mx-auto">
            <h3 className="text-2xl font-medium">Welcome to vatACARS!</h3>
            <span className="text-zinc-400">Please create an account with us to complete your registration.</span>
            <div className="flex space-x-8 mt-8 items-center">
                <div className="card bg-zinc-800 min-h-40 w-1/4">
                    <div className="card-body relative items-center justify-center">
                        {!onboardingDetails.provider ? (
                            <>
                                <span className="loading loading-infinity loading-lg mb-2" />
                                <p>Loading...</p>
                            </>
                        ) : (
                            <>
                                <img src="/img/VATSIM_Logo_No_Tagline_2000px.png"
                                    alt="VATSIM Logo"
                                    className="absolute bottom-3 right-3 hover:opacity-80 transition-opacity w-24"
                                />
                                <p className="font-medium text-lg">{onboardingDetails.userInfo.firstName} {onboardingDetails.userInfo.lastName}</p>
                                <p className="text-sm text-zinc-500">{onboardingDetails.userInfo.email}</p>
                            </>
                        )}
                    </div>
                </div>

                <FaLink className="text-4xl text-zinc-600" />

                <div className="card bg-zinc-800 min-h-40 w-3/4 px-4">
                    <form onSubmit={handleSubmit(submitLogin)} className="w-full px-4 py-6 flex-col space-y-3">
                        <div className="relative flex-col items-center">
                            <div className="h-12">
                                <Image
                                    src="/img/vatacars-logo-dark.png"
                                    alt="vatACARS Logo"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="text-center text-zinc-400 font-medium">{status}</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <input disabled={loading} {...register("username")} autoComplete="off" name="username" type="text" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Username" />
                                <label htmlFor="username" className="input-floating-label peer-focus:text-zinc-300">Username</label>
                            </div>
                            <div className="relative">
                                <input disabled autoComplete="off" name="email" type="email" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Email Address" value={onboardingDetails.userInfo.email} />
                                <label htmlFor="email" className="input-floating-label peer-focus:text-zinc-300">Email</label>
                            </div>
                            <div className="relative">
                                <input disabled autoComplete="off" name="firstName" type="text" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="First Name" value={onboardingDetails.userInfo.firstName} />
                                <label htmlFor="firstName" className="input-floating-label peer-focus:text-zinc-300">First Name</label>
                            </div>
                            <div className="relative">
                                <input disabled autoComplete="off" name="lastName" type="text" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Last Name" value={onboardingDetails.userInfo.lastName} />
                                <label htmlFor="lastName" className="input-floating-label peer-focus:text-zinc-300">Last Name</label>
                            </div>
                            <div className="relative">
                                <input disabled={loading} {...register("password")} autoComplete="off" name="password" type="password" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Password" />
                                <label htmlFor="password" className="input-floating-label peer-focus:text-zinc-300">Password</label>
                            </div>
                            <div className="relative">
                                <button disabled={loading} type="submit" className="btn inline-flex w-full bg-blue-500 text-slate-100 outline-none hover:bg-blue-400 transition-all duration-200">
                                    {loading ? <span className="loading loading-infinity" /> : "Finish"}
                                </button>
                            </div>
                        </div>
                        <span className="text-sm text-zinc-500">
                            By clicking Finish, you agree to our <a href="/terms" className="link link-animated text-blue-400">Terms of Service</a> and <a href="/privacy" className="link link-animated text-blue-400">Privacy Policy</a>.
                        </span>
                        {errors ? (
                            <div className="text-red-500 text-sm">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key].message}</p>
                                ))}
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    )
}