import { useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const qs = require("querystring");
import useUser from "@lib/useUser";

import Link from "next/link";
import Image from "next/image";

import { VscClose } from "react-icons/vsc";
import { FaDiscord } from "react-icons/fa6";

export default () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date().toUTCString().slice(-12, -7));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toUTCString().slice(-12, -7));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required(),
        password: Yup.string()
            .required()
    });
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(loginSchema) });
    const { errors } = formState;

    async function submitLogin(data) {
        setLoading(true);

        const resp = await fetch("/api/provider/local", {
            method: "POST",
            body: JSON.stringify({ email: data.email, password: data.password })
        }).then(resp => resp.json());

        if (resp.status !== "success") {
            setLoading(false);
            return setStatus(resp.message);
        }

        setStatus(resp.message);
        setTimeout(() => router.reload(), 2000);
    }

    async function logOut() {
        setLoading(true);

        await fetch("/api/account/logout", { method: "POST" });
        setTimeout(() => router.reload(), 1000);
    }

    const googleCommit = useGoogleLogin({ onSuccess: d => router.push(`/auth/provider/google?${qs.stringify(d)}`) });

    const dropdownItem = (href, label) => router.asPath !== href ? (
        <Link href={href} key={label}>
            <li className="dropdown-item">
                {label}
            </li>
        </Link>
    ) : (
        <li className="cursor-pointer dropdown-item bg-zinc-700 hover:bg-zinc-700" key={label}>
            {label}
        </li>
    );

    return (
        <>
            <nav className={`fixed top-0 w-full px-12 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl' : 'bg-transparent'
                } border-b border-zinc-800/50`}>
                <div className="container mx-auto px-4">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="relative w-8 h-8">
                                <Image
                                    src="/img/vatacars-logo-sm-dark.png"
                                    alt="vatACARS Logo"
                                    fill
                                    priority
                                    className="object-contain hover:opacity-80 transition-opacity"
                                />
                            </Link>
                            <div className="hidden md:flex items-center gap-6">
                                <Link href="/download">
                                    <span className="cursor-pointer text-zinc-300 hover:text-white transition-colors duration-200">Download</span>
                                </Link>
                                <Link href="/docs">
                                    <span className="cursor-pointer text-zinc-300 hover:text-white transition-colors duration-200">Documentation</span>
                                </Link>
                                <Link href="/stats">
                                    <span className="cursor-pointer text-zinc-300 hover:text-white transition-colors duration-200">Stats</span>
                                </Link>

                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-4">
                                {isLoading ? (
                                    <span className="loading loading-infinity" />
                                ) : user.username ? (
                                    <div className="dropdown relative inline-flex text-zinc-400 hover:text-zinc-200 transition-colors duration-200 [--placement:bottom-end] [--auto-close:inside]">
                                        <button id="dropdown-footer" type="button" className="dropdown-toggle flex items-center space-x-2" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                                            <span>{user.username}</span>
                                            <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4 transition-all duration-200" />
                                        </button>
                                        <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60 bg-zinc-800" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-footer">
                                            {dropdownItem("/me", "Account Details")}
                                            {dropdownItem("/me/history", "Connection History")}
                                            <li className="dropdown-footer gap-2">
                                                <button onClick={() => logOut()} disabled={loading} className="btn btn-error btn-soft btn-block">{loading ? <span className="loading" /> : "Sign Out"}</button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <button onClick={() => setModalOpen(true)} className="cursor-pointer py-1 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
                                        Sign In
                                    </button>
                                )}
                            </div>
                            <span className="icon-[tabler--point] text-zinc-600" />
                            <span className="text-sm text-zinc-400">
                                {currentTime}z
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="loginModal" tabIndex={-1} aria-hidden={true} className={`${modalOpen ? "fixed" : "hidden"} overflow-y-auto overflow-x-hidden top-0 left-0 right-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div onClick={() => setModalOpen(false)} className="absolute w-full h-full backdrop-blur-sm" />
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-zinc-800 rounded-lg shadow border-2 border-zinc-600">
                        <button onClick={() => setModalOpen(false)} className="absolute top-3 right-2.5 p-2 text-slate-400 bg-transparent hover:text-slate-200 hover:bg-zinc-700 rounded-lg text-lg transition-all duration-200">
                            <VscClose />
                            <span className="sr-only">Close login popup</span>
                        </button>
                        <div className="p-5">
                            <div className="flex flex-col items-center text-center">
                                <img src="/img/vatacars-logo-dark.png" className="h-12 my-3" />
                            </div>

                            <div className={`${status ? "" : "hidden"} flex justify-center pt-3 px-6 font-medium`}>
                                {status}
                            </div>

                            <form onSubmit={handleSubmit(submitLogin)} className="w-full px-4 pt-6 flex-col space-y-3">
                                <div className="relative">
                                    <input disabled={loading} {...register("email")} name="email" type="text" autoComplete="email" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Email Address or username" />
                                    <label htmlFor="email" className="input-floating-label peer-focus:text-zinc-300">Email / Username</label>
                                </div>
                                <div className="relative">
                                    <input disabled={loading} {...register("password")} name="password" type="password" autoComplete="current-password" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Password" />
                                    <label htmlFor="password" className="input-floating-label peer-focus:text-zinc-300">Password</label>
                                    <div className="w-full flex justify-end">
                                        <Link href="/auth/forgot">
                                            <span className="block cursor-pointer text-sm text-blue-400 link link-animated">Forgot password?</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="form-control pt-3">
                                    <button disabled={loading} type="submit" className="btn inline-flex w-full bg-blue-500 text-slate-100 outline-none hover:bg-blue-400 transition-all duration-200">
                                        {loading ? <span className="loading loading-infinity" /> : "Continue"}
                                    </button>
                                </div>
                                <div className="text-center text-sm text-slate-400">
                                    Don't have an account yet?
                                    <Link href="/auth/signup">
                                        <span className="ml-2 font-medium text-blue-400 link link-animated">Sign up</span>
                                    </Link>
                                </div>
                            </form>

                            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                                <div className="h-px w-full bg-slate-400" />
                                OR
                                <div className="h-px w-full bg-slate-400" />
                            </div>

                            <div className="flex flex-col gap-2 px-4 mb-3">
                                <button disabled={loading} onClick={async () => { setModalOpen(false); await router.push("/auth/provider/vatsim"); router.reload() }} className="btn inline-flex items-center justify-center gap-4 bg-slate-700 hover:bg-slate-600 border border-transparent hover:border-slate-500 transition-all duration-200">
                                    <img src="/img/VATSIM_Logo_No_Tagline_2000px.png"
                                        alt="VATSIM Logo"
                                        className="hover:opacity-80 transition-opacity w-16 col-span-2"
                                    />
                                    <span className="text-sm">Continue with VATSIM</span>
                                </button>
                                {/*
                                <button onClick={() => googleCommit()} className="px-12 h-10 w-full inline-flex items-center justify-center gap-4 rounded bg-slate-700 hover:bg-slate-600 border border-transparent hover:border-slate-500 transition-all duration-200">
                                    <FaGoogle className="text-xl" />
                                    <span className="text-sm">Continue with Google</span>
                                </button>
                                */}
                                <button onClick={async () => { setModalOpen(false); await router.push("/auth/provider/discord"); router.reload() }} className="px-12 h-10 w-full inline-flex items-center justify-center gap-4 rounded bg-slate-700 hover:bg-slate-600 border border-transparent hover:border-slate-500 transition-all duration-200">
                                    <FaDiscord className="text-xl" />
                                    <span className="text-sm">Continue with Discord</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}