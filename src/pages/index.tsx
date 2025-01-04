import Link from "next/link"

import { MdFileDownload, MdMenuBook } from "react-icons/md"

export default () => {
    return (
        <div className="flex flex-col space-y-24 py-12">
            <div className="flex flex-col text-center">
                <p className="font-sans text-3xl mx-auto flex flex-col font-bold text-zinc-200 max-w-5xl lg:text-5xl md:text-6xl">
                    <span>Streamline Communications,</span>
                    <span>Enhance your Efficiency</span>
                </p>
                <div className="h-10"></div>
                <p className="max-w-4xl text-xl mx-auto text-zinc-400 md:text-2xl">
                    Chat easily with ATC, keep your flight data in check, and enjoy seamless communication. Our tools make your flights smoother and more immersive.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                    <p
                        className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400">
                        Modernised and optimised
                    </p>
                    <h2 className="text-4xl font-bold">Built for everybody</h2>
                    <div className="h-6" />
                    <p className="text-lg text-zinc-400 md:pr-10">
                        Designed for pilots and air traffic controllers alike, vatACARS delivers a streamlined and
                        realistic experience, making advanced data link communication accessible to everyone.
                    </p>
                    <div className="h-8" />
                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-800 text-center">
                        <div className="flex flex-col space-y-4">
                            <p className="font-semibold text-zinc-400">For Users</p>
                            <Link href="/download" className="flex flex-col">
                                    <button className="mx-4 btn btn-outline btn-primary border-dashed">
                                        <span>Downloads</span>
                                        <MdFileDownload className="text-xl" />
                                    </button>
                            </Link>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <p className="font-semibold text-zinc-400">For Developers</p>
                            <Link href="/docs" className="flex flex-col">
                                    <button className="mx-4 btn btn-outline hover:btn-success border-dashed">
                                        <span>Documentation</span>
                                        <MdMenuBook className="text-xl" />
                                    </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-zinc-900 to-black h-96" />
                </div>
            </div>
        </div>
    )
}