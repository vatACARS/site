import { useState } from "react";

import SEO from "../comp/meta/SEO";
import Navbar from "../comp/ui/Navbar";
import Map from "../comp/ui/Map";
import Footer from "../comp/ui/Footer";

import { FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
    const [liveInfo, setLiveInfo] = useState(null);

    return (
        <>
            <SEO title="Welcome!" />
            <Navbar />

            <section className="max-w-6xl mx-auto md:px-24 lg:px-0 mt-12 md:mt-20">
                <div className="px-12 text-center md:text-left">
                    <h1 className="text-2xl md:text-6xl font-semibold md:font-extrabold tracking-tight text-notsodark font-semibold mt-8">
                        <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 text-transparent bg-clip-text">Stay Connected & Fly Smarter</span>
                    </h1>
                    <p className="mt-4 text-md md:text-xl text-notsodark font-semibold">
                        Chat easily with ATC, keep your flight data in check, and enjoy seamless communication. Our tools make your flights smoother and more immersive.
                    </p>
                </div>
                <div className="md:px-12 flex flex-col w-full justify-center py-12">
                    <div className="relative md:rounded-lg overflow-hidden w-full h-[50vh] border-2 md:border-4 border-dark shadow-xl">
                        <Map setSelectedFeature={()=>null} setLiveInfo={setLiveInfo} enableInteractions={false} className="w-full h-full" />
                        <a href="/coverage">
                            <div className="absolute top-5 right-5 pointer-cursor">
                                <div className="p-2 bg-blue-500 rounded-md border-2 border-kindadark">
                                    <FaExternalLinkAlt className="text-notsodark" />
                                </div>
                            </div>
                        </a>
                        <div className="absolute border-t border-kindadark bottom-0 left-0 w-full px-2 bg-dark flex flex-row justify-center md:justify-end space-x-2 items-center">
                            <div className="w-[8px] h-[8px] border-[1.5px] border-green-300 bg-green-600 rounded-full animate-pulse" />
                            <p className="text-md text-notsodark">There {liveInfo?.length == 1 ? "is" : "are"} currently <span className="font-semibold">{liveInfo?.length == 0 ? "no" : liveInfo?.length} station{liveInfo?.length == 1 ? "" : "s"}</span> online{liveInfo?.length > 0 ? <span className="hidden md:inline"> uplinking with <span className="font-semibold">{"0"} aircraft</span></span> : ""}.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}