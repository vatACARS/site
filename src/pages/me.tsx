import useUser from "../lib/useUser";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

export default function Me() {
    const { user } = useUser({ redirectTo: "/api/oauth" });

    if(!user) return <p>Authorising you...</p>;
    if(!user.data.authorised) return <p>Redirecting you...</p>

    return (
        <>
            <SEO title="User Details" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 mb-12 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">User Information</h1>
                </div>
                <div key="userData">
                    <div className="flex flex-col text-slate-700">
                        <p>CID: {user.data.cid}</p>
                        {/*<p>First Name: {user.data.name_first}</p>
                        <p>Last Name: {user.data.name_last}</p>
                        <p>Email: {user.data.email}</p>
                        <p className="mt-2">Controller Rating: {user.data.rating.long} ({user.data.rating.short})</p>
                        <p className="mt-2">Region: {user.data.region.name} ({user.data.region.id})</p>
                        <p>Division: {user.data.division.name} ({user.data.division.id})</p>
                        <p>Subdivision: {user.data.subdivision.name} ({user.data.subdivision.id})</p>*/}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}