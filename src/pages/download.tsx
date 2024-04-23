import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import SEO from "../comp/meta/SEO";

export default function Privacy() {
    return (
        <div>
            <SEO title="Download" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Download</h1>
                    <span className="text-lg text-slate-500">This page is a placeholder.</span>
                </div>
            </div>
            <Footer />
        </div>
    );
}