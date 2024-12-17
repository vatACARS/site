import { useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/router";
const qs = require("querystring");

import Link from "next/link";
import Image from "next/image";

import { VscClose } from "react-icons/vsc";
import { FaDiscord, FaGoogle } from "react-icons/fa6";

export default () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const googleCommit = useGoogleLogin({ onSuccess: d => router.push(`/auth/provider/google?${qs.stringify(d)}`) });

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

                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <button onClick={() => setModalOpen(true)} className="cursor-pointer py-1 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="loginModal" tabIndex={-1} aria-hidden={true} className={`${modalOpen ? "fixed" : "hidden"} overflow-y-auto overflow-x-hidden top-0 left-0 right-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div onClick={() => setModalOpen(false)} className="absolute w-full h-full backdrop-blur-sm" />
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-slate-800 rounded-lg shadow">
                        <button onClick={() => setModalOpen(false)} className="absolute top-3 right-2.5 p-2 text-slate-400 bg-transparent hover:text-slate-200 hover:bg-slate-700 rounded-lg text-lg transition-all duration-200">
                            <VscClose />
                            <span className="sr-only">Close login popup</span>
                        </button>
                        <div className="p-5">
                            <div className="flex flex-col items-center text-center">
                                <img src="/img/vatacars-logo-dark.png" className="h-12 my-3" />
                            </div>

                            <form action="#" className="w-full px-4 pt-6 flex-col space-y-1">
                                <div className="form-control">
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input name="email" type="email" autoComplete="email" required className="block w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 shadow-sm placeholder:text-slate-500 focus:ring-1 focus:ring-white focus:ring-offset-1" placeholder="Email Address" />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input name="password" type="password" autoComplete="current-password" required className="block w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 shadow-sm placeholder:text-slate-500 focus:ring-1 focus:ring-white focus:ring-offset-1" placeholder="Password" />
                                </div>
                                <Link href="/auth/forgot">
                                    <div className="w-full flex justify-end">
                                        <p className="cursor-pointer text-sm text-blue-400 link link-animated">Forgot password?</p>
                                    </div>
                                </Link>
                                <div className="form-control pt-3">
                                    <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-2 py-3 text-sm font-medium text-slate-100 outline-none hover:bg-blue-400 focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-slate-400 transition-all duration-200">
                                        Continue
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
                                <button onClick={async () => { setModalOpen(false); await router.push("/auth/provider/vatsim"); router.reload() }} className="px-12 h-10 w-full inline-flex items-center justify-center gap-4 rounded bg-slate-700 hover:bg-slate-600 border border-transparent hover:border-slate-500 transition-all duration-200">
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
                                <button onClick={async () => { setModalOpen(false); await router.push("/auth/provider/discord"); router.reload() }} className="px-12 h-10 w-full inline-flex items-center justify-center gap-4 rounded bg-slate-700 hover:bg-slate-600 border border-transparent hover:border-slate-500 transition-all duration-200">
                                    <FaDiscord className="text-xl" />
                                    <span className="text-sm">Continue with Discord</span>
                                </button>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}