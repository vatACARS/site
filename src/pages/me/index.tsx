import { useState, useEffect } from "react";
import { FaChevronRight, FaDiscord, FaLinkSlash, FaSatellite } from "react-icons/fa6";
import Link from "next/link";
import useUser from "@lib/useUser";

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default () => {
    const { isLoading, user } = useUser({ redirectTo: "/" });
    const [ready, setReady] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [unlinkedProviders, setUnlinkedProviders] = useState([]);
    const [alert, setAlert] = useState(null);

    const fetchAccountDetails = async () => {
        const resp = await fetch("/api/account/details", {
            method: "GET"
        }).then(res => res.json());

        setAccountDetails(resp.data);

        // Find any oauth providers that the user doesn't have linked
        const linkedProviders = resp.data.user.oauthAccounts.map(account => account.provider);
        const unlinkedProviders = ["vatsim", "discord", "hoppies"].filter(provider => !linkedProviders.includes(provider));
        setUnlinkedProviders(unlinkedProviders);
        setReady(true);
    }

    useEffect(() => {
        if(isLoading || !user.id) return;

        fetchAccountDetails();
    }, [ isLoading ]);

    async function revokeOAuth(provider) {
        const resp = await fetch(`/api/account/revokeOauth`, {
            method: "POST",
            body: JSON.stringify({ provider })
        }).then(res => res.json());

        if(resp.status === "success") fetchAccountDetails();

        setAlert(resp.message);
    }

    return (
        <div className="relative">
            <nav className="text-sm text-zinc-400 flex space-x-2 mb-4">
                {["Home", "Account"].map((crumb, index) => (
                    <span className="flex space-x-2 items-center" key={index}>
                        {index > 0 && <FaChevronRight />}
                        <span>{crumb}</span>
                    </span>
                ))}
            </nav>
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            {alert && (
                <div className="absolute top-0 right-0 max-w-[50%] alert alert-soft" role="alert">
                    <div className="flex-1">
                        <span className="block sm:inline">{alert}</span>
                    </div>
                </div>
            )}
            <div className="flex">
                <nav className="shrink-0 tabs tabs-bordered tabs-vertical" aria-label="Tabs" role="tablist" data-tabs-vertical="true" aria-orientation="horizontal">
                    <button type="button" className="tab active-tab:tab-active active" id="tabs-vertical-item-1" data-tab="#tabs-vertical-1" aria-controls="tabs-vertical-1" role="tab" aria-selected="true">
                        Account Details
                    </button>
                    <button type="button" className="tab active-tab:tab-active" id="tabs-vertical-item-2" data-tab="#tabs-vertical-2" aria-controls="tabs-vertical-2" role="tab" aria-selected="false">
                        Security
                    </button>
                    <button type="button" className="tab active-tab:tab-active" id="tabs-vertical-item-3" data-tab="#tabs-vertical-3" aria-controls="tabs-vertical-3" role="tab" aria-selected="false">
                        Preferences
                    </button>
                </nav>

                <div className="ms-3 w-full">
                    <div id="tabs-vertical-1" role="tabpanel" aria-labelledby="tabs-vertical-item-1">
                        <div className="bg-zinc-800 py-4 px-6">
                            <h2 className="text-lg font-bold mb-4">User Information</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="cursor-not-allowed relative">
                                    <input type="text" id="firstName" className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white disabled:text-zinc-500" value={accountDetails?.user?.firstName} disabled />
                                    <label className="input-floating-label peer-focus:text-zinc-300" htmlFor="firstName">First Name</label>
                                </div>
                                <div className="cursor-not-allowed relative">
                                    <input type="text" id="lastName" className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white disabled:text-zinc-500" value={accountDetails?.user?.lastName} disabled />
                                    <label className="input-floating-label peer-focus:text-zinc-300" htmlFor="lastName">Last Name</label>
                                </div>

                                <div className="cursor-not-allowed relative">
                                    <input type="email" id="email" className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white disabled:text-zinc-500" value={accountDetails?.user?.email} disabled />
                                    <label className="input-floating-label peer-focus:text-zinc-300" htmlFor="email">Email</label>
                                </div>
                            </div>

                            <h2 className="text-lg font-bold mt-8 mb-4">Connected Accounts</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {accountDetails?.user?.oauthAccounts.map((account, index) => (
                                    <div key={index} className="flex flex-col items-center bg-zinc-900 p-2 rounded-lg shadow-lg">
                                        <div className="flex space-x-2 items-center">
                                            {account.provider === "vatsim" ? (
                                                <img src="/img/VATSIM_Logo_No_Tagline_2000px.png" className="h-5" />
                                            ) : account.provider === "discord" ? (
                                                <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                                                    <FaDiscord />
                                                </div>
                                            ) : account.provider === "hoppies" ? (
                                                <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                                                    <FaSatellite />
                                                </div>
                                            ) : <span className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">?</span>}
                                            <span className="text-zinc-400 font-medium">{account.providerId}</span>
                                        </div>
                                        <span className="text-zinc-500 text-sm">Linked: {new Date(account.updatedAt).toLocaleDateString()}</span>
                                        <div className="flex space-x-2 items-center py-1">
                                            <button disabled={!ready} onClick={() => { setReady(false); revokeOAuth(account.provider) }} type="button" className="btn btn-sm btn-warning">
                                                <FaLinkSlash className="text-lg" />
                                                <span>Revoke</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* Allow user to connect any oauth provider they don't already have */}
                                {unlinkedProviders.map((provider, index) => (
                                    <div key={index} className="flex flex-col items-center bg-zinc-900 p-2 rounded-lg shadow-lg">
                                        <div className="flex space-x-2 items-center">
                                            {provider === "vatsim" ? (
                                                <img src="/img/VATSIM_Logo_No_Tagline_2000px.png" className="h-5" />
                                            ) : provider === "discord" ? (
                                                <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                                                    <FaDiscord />
                                                </div>
                                            ) : provider === "hoppies" ? (
                                                <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                                                    <FaSatellite />
                                                </div>
                                            ) : <span className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">?</span>}
                                            <span className="text-zinc-400 font-medium">{capitalizeFirstLetter(provider)}</span>
                                        </div>
                                        <span className="text-zinc-500 text-sm">Not linked</span>
                                        <div className="flex space-x-2 items-center py-1">
                                            <Link href={`/auth/provider/${provider}`} passHref>
                                                <button disabled={!ready} onClick={() => setReady(false)} className="btn btn-sm btn-primary">
                                                    <FaLinkSlash className="text-lg" />
                                                    <span>Link</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-lg text-red-400/70 font-bold mt-8 mb-4">Danger Zone</h2>
                            <button type="button" className="btn btn-error">Delete Account & Data</button>
                        </div>
                        <div id="tabs-vertical-2" role="tabpanel" aria-labelledby="tabs-vertical-item-2" className="hidden">
                            <p>testing one two</p>
                        </div>
                        <div id="tabs-vertical-3" role="tabpanel" aria-labelledby="tabs-vertical-item-3" className="hidden">
                            <p>Tab3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}