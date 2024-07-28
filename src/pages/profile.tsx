import { useState } from "react";
import Link from "next/link";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import MyDetails from "../comp/profile/MyDetails";
import Support from "../comp/profile/Support";
import TokenManager from "../comp/profile/TokenManager";

import { FaUser, FaCircleQuestion, FaKey, FaArrowLeft } from "react-icons/fa6";

import useUser from "../lib/useUser";

export default function Profile() {
    const [tab, setTab] = useState("details");
    const hrs = new Date().getHours();
    const { user } = useUser({ redirectTo: "/api/oauth" });

    return (
        <>
            <SEO title="My Profile" />
            <Navbar />

            <div className="w-full bg-dark py-12">
                <div className="flex flex-wrap items-center space-x-4 max-w-6xl mx-12 justify-center lg:justify-start xl:mx-auto">
                    <h3 className="font-semibold text-4xl text-notsodark">{hrs && hrs < 12 ? "Good morning" : hrs >= 12 && hrs <= 17 ? "Good afternoon" : "Good evening"},</h3>
                    {!user ? <div className="h-10 w-64 animate-pulse bg-kindadark rounded-md" /> : user?.data?.authorised! ? user?.data?.name_first! : "..."}
                    <span className="font-semibold text-4xl text-notsodark">!</span>
                </div>
            </div>

            <section className="max-w-6xl mx-auto md:px-24 lg:px-0 mt-12 md:mt-20 pb-24">
                <div className="flex flex-col px-24 lg:flex-row lg:space-x-4">
                    <div className="flex flex-col space-y-2 w-full lg:w-1/3 py-4">
                        <h3 className="font-semibold text-2xl text-notsodark border-b-4 border-blue-500">Profile</h3>
                        <div className="flex flex-col">
                            <span onClick={() => setTab("details")} className={`flex flex-row items-center cursor-pointer space-x-4 w-full pl-4 py-1 ${tab == "details" ? "border-r-4 bg-dark border-blue-400 text-blue-400 transition-all duration-300" : "text-notsodark hover:text-blue-500 hover:bg-dark hover:border-r-4 hover:border-blue-400 transition-all ease-out duration-300"}`}>
                                <FaUser />
                                <span className="font-semibold">My Details</span>
                            </span>
                            <span onClick={() => setTab("support")} className={`flex flex-row items-center cursor-pointer space-x-4 w-full pl-4 py-1 ${tab == "support" ? "border-r-4 bg-dark border-blue-400 text-blue-400 transition-all duration-300" : "text-notsodark hover:text-blue-500 hover:bg-dark hover:border-r-4 hover:border-blue-400 transition-all ease-out duration-300"}`}>
                                <FaCircleQuestion />
                                <span className="font-semibold">Help & Support</span>
                            </span>
                        </div>
                        <h3 className="font-semibold pt-4 text-2xl text-notsodark border-b-4 border-blue-500">Security</h3>
                        <div className="flex flex-col">
                            <span onClick={() => setTab("tokens")} className={`flex flex-row items-center cursor-pointer space-x-4 w-full pl-4 py-1 ${tab == "tokens" ? "border-r-4 bg-dark border-blue-400 text-blue-400 transition-all duration-300" : "text-notsodark hover:text-blue-500 hover:bg-dark hover:border-r-4 hover:border-blue-400 transition-all ease-out duration-300"}`}>
                                <FaKey />
                                <span className="font-semibold">Token Manager</span>
                            </span>
                        </div>
                        <div className="pt-8">
                            <Link href="/api/logout">
                                <span className="flex flex-row items-center cursor-pointer space-x-4 w-full pl-4 py-1 text-notsodark hover:text-red-500 hover:bg-dark hover:border-r-4 hover:border-red-400 transition-all ease-out duration-300 cursor-pointer">
                                    <FaArrowLeft />
                                    <span className="font-semibold">Sign Out</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="h-grow hidden lg:block w-[4px] bg-dark rounded-full" />
                    <div className="h-[4px] lg:hidden w-grow bg-dark rounded-full" />
                    <div className="flex flex-col space-y-4 pl-2 pt-12 lg:pt-0 w-full md:w-2/3 text-notsodark py-4">
                        {tab == "details" && <MyDetails user={user} />}
                        {tab == "support" && <Support user={user} />}
                        {tab == "tokens" && <TokenManager user={user} />}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}