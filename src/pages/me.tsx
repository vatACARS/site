import Link from "next/link";
import useUser from "../lib/useUser";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import { BsDiscord } from "react-icons/bs";
import { VatACARSUserData } from "../lib/types";

export default function Me() {
    const { user } = useUser({ redirectTo: "/api/oauth" });

    if (!user) return;
    if (!user.data.authorised) return <p>Redirecting you...</p>

    return (
        <>
            <SEO title="User Details" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 mb-12 space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-2xl text-slate-700 mb-4">Account Information</h1>
                </div>
                <div key="userData" className="flex flex-col space-y-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-full bg-blue-500 text-white justify-center text-2xl flex items-center">{user.data.name_first.substring(0, 1)}{user.data.name_last.substring(0, 1)}</div>
                        <div className="text-lg flex flex-col -space-y-2">
                            <span className="font-semibold">{user.data.name_first} {user.data.name_last}</span>
                            <span className="text-slate-400">{user.data.email.substring(0, 4)}...@{user.data.email.split("@")[1]}</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg text-blue-500">VATSIM Information</p>
                        <p className="mt-2">CID: {user.data.cid}</p>
                        <p>Controller Rating: {user.data.rating.long} ({user.data.rating.short})</p>
                        <p className="mt-2">Region: {user.data.region.name} ({user.data.region.id})</p>
                        <p>Division: {user.data.division.name} ({user.data.division.id})</p>
                        <p>Subdivision: {user.data.subdivision.id != null ? `${user.data.subdivision.name} (${user.data.subdivision.id})` : "None"}</p>
                    </div>
                    {user.data.discord != null ? (
                        <div className="flex flex-col">
                            <p className="text-lg text-blue-500">Linked Discord Account</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-14 h-14 rounded-full shadow-xl justify-center text-2xl flex items-center"><img src={`https://cdn.discordapp.com/avatars/${user.data.discord.id}/${user.data.discord.avatar}.webp?size=256`} /></div>
                                    <div className="text-lg flex flex-col -space-y-2">
                                        <span className="font-semibold">{user.data.discord.username}{user.data.discord.discriminator != "0" ? `#${user.data.discord.discriminator}` : ""}</span>
                                        <span className="text-slate-400">{user.data.discord.id}</span>
                                    </div>
                                </div>
                                <Link href="/api/discord">
                                    <button className="px-4 py-2 bg-[#5865F2] text-white font-semibold flex items-center space-x-2 rounded-md">
                                        <BsDiscord />
                                        <span>Join the Discord</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex">
                            <Link href="/api/discord">
                                <button className="px-4 py-2 bg-[#5865F2] text-white font-semibold flex items-center space-x-2 rounded-md">
                                    <BsDiscord />
                                    <span>Link your Discord Account</span>
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}