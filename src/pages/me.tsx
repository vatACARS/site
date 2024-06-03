import useUser from "../lib/useUser";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import { BsDiscord } from "react-icons/bs";

export default function Me() {
    //const { user } = useUser({ redirectTo: "/api/oauth" });

    const user = {
        data: {
            authorised: true,
            cid: 100000,
            name_first: "Test",
            name_last: "User",
            email: "testuser@vatsim.net",
            rating: {
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
            }
        }
    }

    if (!user) return <p>Authorising you...</p>;
    if (!user.data.authorised) return <p>Redirecting you...</p>

    return (
        <>
            <SEO title="User Details" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 mb-12 space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-2xl text-slate-700 mb-4">Account Information</h1>
                </div>
                <div key="userData">
                    <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-full bg-blue-500 text-white justify-center text-2xl flex items-center">{user.data.name_first.substring(0, 1)}{user.data.name_last.substring(0, 1)}</div>
                        <div className="text-lg flex flex-col -space-y-2">
                            <span className="font-semibold">{user.data.name_first} {user.data.name_last}</span>
                            <span className="text-slate-400">{user.data.email.substring(0, 4)}...@{user.data.email.split("@")[1]}</span>
                            
                        </div>
                    </div>
                    {/*<div className="flex flex-col text-slate-700">
                        <p>CID: {user.data.cid}</p>
                        <p>First Name: {user.data.name_first}</p>
                        <p>Last Name: {user.data.name_last}</p>
                        <p>Email: {user.data.email}</p>
                        <p className="mt-2">Controller Rating: {user.data.rating.long} ({user.data.rating.short})</p>
                        <p className="mt-2">Region: {user.data.region.name} ({user.data.region.id})</p>
                        <p>Division: {user.data.division.name} ({user.data.division.id})</p>
                        <p>Subdivision: {user.data.subdivision.id != null ? `${user.data.subdivision.name} (${user.data.subdivision.id})` : "None"}</p>
                    </div>*/}
                </div>
                <button className="px-4 py-2 bg-[#5865F2] text-white font-semibold flex items-center space-x-2 rounded-md">
                    <BsDiscord />
                    <span>Join the Discord</span>
                </button>
            </div>
            <Footer />
        </>
    )
}