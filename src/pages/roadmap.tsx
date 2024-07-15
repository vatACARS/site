import { useEffect } from "react";

import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import SEO from "../comp/meta/SEO";

export default function Roadmap() {
    return (
        <div>
            <SEO title="Roadmap" />
            <Navbar />
            <div className="mx-auto max-w-7xl px-12 py-6 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Roadmap</h1>
                    <span className="text-lg text-slate-500">This page is a work in progress.</span>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-12 leading-6 text-black border-0 border-solid lg:mt-20 lg:grid-cols-4 sm:mt-16 sm:grid-cols-2 border-zinc-200">
                    <div className="leading-6">
                        <p className="m-0 text-sm font-semibold tracking-wide uppercase text-slate-400">
                            Phase 1
                        </p>
                        <div className="flex relative justify-start">
                            <span className="pr-5 text-xl font-bold bg-slate-50 text-slate-900">
                                Launching
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}