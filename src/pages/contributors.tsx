import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";

import { FaMedal } from "react-icons/fa6";

export default function Contributors() {
    return (
        <div>
            <SEO title="Contributors" />
            <Navbar />

            <div className="mx-auto max-w-7xl px-12 py-6 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Contributors</h1>
                    <span className="text-lg text-slate-500">Meet the vatACARS Team</span>
                </div>

                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <div key="plutonus" className="relative items-center bg-slate-900 rounded-lg shadow-lg sm:flex">
                        <div className="absolute top-0 -right-1 text-blue-500 text-2xl font-bold px-3 py-1">
                            <FaMedal />
                        </div>
                        <img className="w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://cdn.discordapp.com/avatars/684048077736509503/a_87ee19569a1d118b76f846e7d2ba559f.gif?size=512" />
                        <div className="px-5">
                            <h3 className="flex flex-col -space-y-1 mb-2 text-xl font-semibold tracking-tight text-slate-300">
                                <p>Joshua H.</p>
                                <span className="text-blue-400 text-sm">@PlutonusDev</span>
                            </h3>
                            <span className="text-slate-400">Project Lead & Core Maintainer</span>
                        </div>
                    </div>

                    <div key="scorcher" className="relative items-center bg-slate-900 rounded-lg shadow-lg sm:flex">
                        <div className="absolute top-0 -right-1 text-blue-500 text-2xl font-bold px-3 py-1">
                            <FaMedal />
                        </div>
                        <img className="w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://cdn.discordapp.com/avatars/552397345359396875/ce0e43d801b601c6df0a1eb1de645424.png?size=512" />
                        <div className="px-5">
                            <h3 className="flex flex-col -space-y-1 mb-2 text-xl font-semibold tracking-tight text-slate-300">
                                <p>Edward M.</p>
                                <span className="text-blue-400 text-sm">@AussieScorcher</span>
                            </h3>
                            <span className="text-slate-400">Research Lead & Core Maintainer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}