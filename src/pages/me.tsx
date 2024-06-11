import { useState, useEffect } from "react";
import Link from "next/link";
import useUser from "../lib/useUser";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";
import Modal from '../comp/ui/Modal';

import { FaUserLarge, FaRecycle, FaTrash, FaRegStar } from "react-icons/fa6";
import { BsKey } from "react-icons/bs";

import { BsDiscord } from "react-icons/bs";

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
var units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}
var getRelativeTime = (d1, d2 = new Date()) => {
    var elapsed = d1 - d2.getTime()

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit)
}

export default function Me() {
    const [showModal, setShowModal] = useState(false);

    const [waiting, setWaiting] = useState(false);
    const [message, setMessage] = useState("");

    const [genkeyWaiting, setGenkeyWaiting] = useState(false);
    const [genkeyMessage, setGenkeyMessage] = useState("");

    const [apiKeys, setApiKeys] = useState([]);
    const [tokenVisible, setTokenVisible] = useState(false);

    const [selectedNickname, setSelectedNickname] = useState("1");

    const [tab, setTab] = useState("account");
    //const { user } = useUser({ redirectTo: "/api/oauth" });

    const user = {
        data: {
            authorised: true,
            cid: "100000",
            name_first: "Test",
            name_last: "User",
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
            },
            authToken: [{
                auth_token: "123abc",
                created: new Date(),
                expires: new Date().setMonth(new Date().getMonth() + 1)
            }]
        }
    }

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

    function revealToken() {
        setTokenVisible(true);
    }

    async function fetchApiKeys() {
        if(!user) return;
        if (!user.data.authorised) return;

        const res = await fetch("/api/fetchKeys", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(resp => resp.json());

        if(res.success) setApiKeys(res.apiKeys);

        setApiKeys([{
            "id": "6667c02ee816b680cf1067c9",
            "token": "vAcV1-ff78ece1ad3cf5100499d1b40d",
            "created": "2024-06-11T03:10:38.241Z",
            "expires": "2024-07-11T03:10:38.241Z",
            "acars_user_id": "665c844f256f8274f6ed4a69"
        }]);
    }

    async function generateKey() {
        if (!user.data.authorised) return;
        setGenkeyWaiting(true);
        setGenkeyMessage("");

        const res = await fetch("/api/generateKey", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(resp => resp.json());

        setGenkeyMessage(res.message);
        if(res.success) {
            fetchApiKeys();
        } else {
            setGenkeyWaiting(false);
        }
    }

    async function deleteKey(token) {
        if (!user.data.authorised) return;
        setGenkeyMessage("");

        const res = await fetch("/api/deleteKey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
        }).then(resp => resp.json());

        setGenkeyMessage(res.message);
        if(res.success) fetchApiKeys();
    }

    useEffect(() => {
        fetchApiKeys();
    }, [ /* user */ ]);

    if (!user) return <p>Please wait...</p>;
    if (!user.data.authorised) return <p>Redirecting you...</p>

    return (
        <>
            <SEO title="User Details" />
            <Navbar />
            <div className="mx-auto max-w-6xl px-12 py-6 mb-12 space-y-12">
                <div className="pt-12">
                    <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                        My Account
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Manage your account and API keys.
                    </p>
                </div>
                <div className="mt-8 flex border-b border-gray-200">
                    <button onClick={() => setTab("account")} className={`flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 ${tab === "account" ? "text-blue-600 border-blue-500" : "text-gray-700 border-transparent cursor-base hover:border-gray-400"} sm:px-4 -px-1 whitespace-nowrap focus:outline-none`}>
                        <FaUserLarge />
                        <span className="mx-1 text-sm sm:text-base">
                            Account Details
                        </span>
                    </button>

                    <button onClick={() => setTab("keys")} className={`flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 ${tab === "keys" ? "text-blue-600 border-blue-500" : "text-gray-700 border-transparent cursor-base hover:border-gray-400"} sm:px-4 -px-1 whitespace-nowrap focus:outline-none`}>
                        <BsKey />
                        <span className="mx-1 text-sm sm:text-base">
                            Tokens
                        </span>
                    </button>
                </div>
                {tab == "account" ? (
                    <div key="userData" className="flex flex-col space-y-8">
                        <div id="vatACARS">
                            <div className="flex items-center space-x-3">
                                <div className="w-14 h-14 rounded-full bg-blue-500 text-white justify-center text-2xl flex items-center">{user.data.name_first.substring(0, 1)}{user.data.name_last.substring(0, 1)}</div>
                                <div className="text-lg flex flex-col -space-y-2">
                                    <span className="font-semibold">{user.data.name_first} {user.data.name_last}</span>
                                    <span className="text-slate-400 text-sm">CID: {user.data.cid}</span>
                                </div>
                            </div>
                        </div>
                        <div id="VATSIM">
                            <div className="flex flex-col">
                                <p className="text-lg text-blue-500">VATSIM Information</p>
                                <p>Controller Rating: {user.data.rating.long} ({user.data.rating.short})</p>
                                <p className="mt-2">Region: {user.data.region.name} ({user.data.region.id})</p>
                                <p>Division: {user.data.division.name} ({user.data.division.id})</p>
                                <p>Subdivision: {user.data.subdivision.id != null ? `${user.data.subdivision.name} (${user.data.subdivision.id})` : "None"}</p>
                            </div>
                        </div>
                        <div id="discord">
                            <p className="text-lg text-blue-500">Linked Discord Account</p>
                            {user.data.discord != null ? (
                                <div className="flex flex-col">
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
                                                        <input type="radio" value="1" checked={selectedNickname == "1"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                        <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                            <p>{user.data.name_first} - {user.data.cid}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="mt-2 flex flex-col space-y-2">
                                                    <label className="cursor-pointer">
                                                        <input type="radio" value="2" checked={selectedNickname == "2"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                        <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                            <p>{user.data.name_first} {user.data.name_last.substring(0, 1)} - {user.data.cid}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="mt-2 flex flex-col space-y-2">
                                                    <label className="cursor-pointer">
                                                        <input type="radio" value="3" checked={selectedNickname == "3"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
                                                        <div className="text-sm w-48 rounded-md px-2 py-1 bg-slate-200 text-slate-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-500 peer-checked:ring-offset-2">
                                                            <p>{user.data.name_first} {user.data.name_last} - {user.data.cid}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="mt-2 flex flex-col space-y-2">
                                                    <label className="cursor-pointer">
                                                        <input type="radio" value="4" checked={selectedNickname == "4"} onChange={handleRadioChange} className="peer sr-only" name="nickname" />
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
                                <div className="flex flex-col">
                                    <p>You have not linked your Discord account.</p>
                                    <div className="flex">
                                        <Link href="/api/discord">
                                            <button className="px-4 py-2 bg-[#5865F2] text-white font-semibold flex items-center space-x-2 rounded-md">
                                                <BsDiscord />
                                                <span>Link your Discord Account</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : tab == "keys" ? (
                    <div key="userData" className="flex flex-col space-y-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-slate-300">
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Token
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Created
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Expiry
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Tools
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiKeys.map(tokenData => (
                                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-slate-200">
                                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap flex items-center space-x-2 group">
                                                <span className="bg-gray-200 px-2 py-1 rounded-md group-hover:bg-indigo-100 group-hover:shadow-sm transform transition duration-200">{tokenVisible ? tokenData.token : `${tokenData.token.substring(0, 10)}...`}</span>
                                                {!tokenVisible && <a onClick={() => revealToken()} className="text-xs group-hover:underline cursor-pointer">(click to reveal)</a>}
                                            </td>
                                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                {getRelativeTime(new Date(tokenData.created))}
                                            </td>
                                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                {new Date(tokenData.expires).toLocaleString()}
                                            </td>
                                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap flex flex-row space-x-2">
                                                <a className="rounded-md bg-yellow-300 flex flex-row items-center space-x-2 py-1 px-2">
                                                    <FaRecycle />
                                                    <span>Regenerate</span>
                                                </a>
                                                <a onClick={() => deleteKey(tokenData.token)} className="rounded-md bg-red-300 flex flex-row items-center space-x-2 py-1 px-2">
                                                    <FaTrash />
                                                    <span>Delete</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!apiKeys[0] && (
                                <div className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-slate-200 text-gray-900 px-6 py-4 whitespace-nowrap">
                                    <p className="text-center">You have no keys currently</p>
                                </div>
                            )}
                            <div className="mt-2 flex flex-row space-x-4 items-center justify-end">
                                <p className="text-slate-700">{genkeyMessage}</p>
                                <a onClick={() => generateKey()} className={`rounded-md flex flex-row space-x-2 items-center py-2 px-3 transition-all duration-300 ${genkeyWaiting == true ? "bg-slate-300" : "bg-green-300 cursor-pointer"}`}>
                                    {genkeyWaiting ? (<p>Please wait...</p>) : (<>
                                        <FaRegStar />
                                        <span>Generate New Token</span>
                                    </>)}
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
            <Footer />
        </>
    )
}