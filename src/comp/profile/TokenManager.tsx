import { useState, useEffect } from "react";

import { FaTrash, FaRegStar } from "react-icons/fa6";

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

export default function ProfileTokenManager({ user }) {
    const [apiKeys, setApiKeys] = useState([]);
    const [tokenVisible, setTokenVisible] = useState(false);

    const [genkeyWaiting, setGenkeyWaiting] = useState(false);
    const [genkeyMessage, setGenkeyMessage] = useState("");

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
        }
        setGenkeyWaiting(false);
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

    function revealToken() {
        setTokenVisible(true);
    }

    useEffect(() => {
        //fetchApiKeys();

        setApiKeys([
            {
                token: "1234567890",
                created: new Date(),
                expires: new Date()
            }
        ])
    }, [ user ]);

    return (
        <>
            <h4 className="font-light text-3xl">Token Management</h4>
            <div className="mt-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-dark">
                                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                    Token
                                </th>
                                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                    Created
                                </th>
                                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                    Expiry
                                </th>
                                <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                    Tools
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiKeys.map(tokenData => (
                                <tr className="bg-[#343434] border-b border-dark transition duration-300 ease-in-out hover:bg-[#454545]">
                                    <td className="text-sm px-6 py-4 whitespace-nowrap flex items-center space-x-2 group">
                                        <span onClick={() => revealToken()} className={`bg-dark px-2 py-1 rounded-sm group-hover:bg-[#343434] group-hover:shadow-sm transform transition duration-200 ${!tokenVisible ? "cursor-pointer" : ""}`}>{tokenVisible ? tokenData.token : `${tokenData.token.substring(0, 10)}...`}</span>
                                        {!tokenVisible && <a onClick={() => revealToken()} className="text-xs group-hover:underline cursor-pointer">(click to reveal)</a>}
                                    </td>
                                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                                        {getRelativeTime(new Date(tokenData.created))}
                                    </td>
                                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                                        {new Date(tokenData.expires).toLocaleString()}
                                    </td>
                                    <td className="text-sm px-6 py-4 whitespace-nowrap flex flex-row space-x-2">
                                        {/*<a className="cursor-pointer rounded-md bg-yellow-300 flex flex-row items-center space-x-2 py-1 px-2 transition-all duration-200 hover:bg-yellow-400">
                                                    <FaRecycle />
                                                    <span>Regenerate</span>
                                                </a>*/}
                                        <a onClick={() => deleteKey(tokenData.token)} className="cursor-pointer rounded-md bg-red-500 font-semibold flex flex-row items-center space-x-2 py-1 px-2 transition-all duration-200 hover:bg-red-400">
                                            <FaTrash />
                                            <span>Delete</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!apiKeys[0] && (
                        <div className="bg-[#343434] border-b border-dark transition duration-300 ease-in-out hover:bg-[#454545] px-6 py-4 whitespace-nowrap">
                            <p className="text-center">You have no keys currently</p>
                        </div>
                    )}
                    <div className="w-full mt-2 flex flex-row space-x-4 items-center justify-end">
                        <p>{genkeyMessage}</p>
                        <a onClick={() => generateKey()} className={`rounded-md flex flex-row space-x-2 items-center font-semibold py-2 px-3 transition-all duration-300 ${genkeyWaiting == true ? "bg-dark" : "bg-green-700 cursor-pointer"}`}>
                            {genkeyWaiting ? (<p>Please wait...</p>) : (<>
                                <FaRegStar />
                                <span>Generate New Token</span>
                            </>)}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}