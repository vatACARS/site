import { useState } from "react";
import Link from "next/link";
import useUser from "../lib/useUser";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";
import Modal from '../comp/ui/Modal';

import { BsDiscord } from "react-icons/bs";

export default function Me() {
    const [showModal, setShowModal] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedNickname, setSelectedNickname] = useState("1");
    const { user } = useUser({ redirectTo: "/api/oauth" });

    /*const user = {
        data: {
            authorised: true,
            cid: "100000",
            name_first: "Test",
            name_last: "User",
            email: "testuser@vatsim.net",
            rating: {
                id: 0,
                long: "RATING_LONG",
                short: "RATING_SHORT"
            },
            region: {
                name: "REGION_NAME",
                id: "REGION_ID"
            },
            division: {
                name: "DIVISION_NAME",
                id: "DIVISION_ID"
            },
            subdivision: {
                name: "SUBDIVISION_NAME",
                id: "SUBDIVISION_ID"
            },
            discord: {
                id: "684000000000000000",
                username: "TestUser",
                discriminator: "1234",
                avatar: ""
            }
        }
    }*/

    const handleRadioChange = (event) => {
        setSelectedNickname(event.target.value);
    };

    async function joinDiscord() {
        if (!user.data.authorised) return;
        setWaiting(true);
        setMessage("");

        const res = await fetch("/api/joinDiscord", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ nickname: selectedNickname })
        }).then(resp => resp.json());

        if (res.success) return setMessage(res.message);
        setWaiting(false);
        setMessage(res.message);
    }

    if (!user) return <p>Please wait...</p>;
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
                                    <img className="w-14 h-14 rounded-full shadow-xl" src={`https://cdn.discordapp.com/avatars/${user.data.discord.id}/${user.data.discord.avatar}.webp?size=256`} />
                                    <div className="text-lg flex flex-col -space-y-2">
                                        <span className="font-semibold">{user.data.discord.username}{user.data.discord.discriminator != "0" ? `#${user.data.discord.discriminator}` : ""}</span>
                                        <span className="text-slate-400">{user.data.discord.id}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p onClick={() => !showModal && setShowModal(true)}>
                                        <span className={`px-4 py-2 text-white font-semibold flex items-center space-x-2 rounded-md transition-all duration-200 ${showModal ? "bg-slate-900" : "bg-[#5865F2] cursor-pointer"}`}>
                                            <BsDiscord />
                                            <span>{showModal ? "Waiting..." : "Join the Discord"}</span>
                                        </span>
                                    </p>
                                    <Modal title="Join the Discord" isOpen={showModal} onClose={() => setShowModal(false)}>
                                        <span className="text-sm">Nickname Preference:</span>
                                        <div className="mt-2 flex flex-col space-y-2">
                                            <label className="cursor-pointer">
                                                <input type="radio" value="1" checked={selectedNickname=="1"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                    <p>{user.data.name_first} - {user.data.cid}</p>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="mt-2 flex flex-col space-y-2">
                                            <label className="cursor-pointer">
                                                <input type="radio" value="2" checked={selectedNickname=="2"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                    <p>{user.data.name_first} {user.data.name_last.substring(0, 1)} - {user.data.cid}</p>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="mt-2 flex flex-col space-y-2">
                                            <label className="cursor-pointer">
                                                <input type="radio" value="3" checked={selectedNickname=="3"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                    <p>{user.data.name_first} {user.data.name_last} - {user.data.cid}</p>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="mt-2 flex flex-col space-y-2">
                                            <label className="cursor-pointer">
                                                <input type="radio" value="4" checked={selectedNickname=="4"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                    <p>| {user.data.cid} |</p>
                                                </div>
                                            </label>
                                        </div>

                                        <span className="text-slate-400 text-sm flex mt-4">To change your nickname preferences, leave the Discord server first.</span>
                                        <p onClick={() => !waiting && joinDiscord()}>
                                            <div className="flex flex-row items-center space-x-2 mt-2">
                                                <span className={`w-32 justify-center px-2 py-1 flex items-center space-x-2 rounded-md transition-all duration-200 ${waiting ? "bg-slate-200 text-slate-600" : "bg-[#5865F2] cursor-pointer text-white"}`}>
                                                    <BsDiscord />
                                                    <span>{waiting ? "..." : "Finish"}</span>
                                                </span>
                                                <span>{message}</span>
                                            </div>
                                        </p>
                                    </Modal>
                                </div>
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