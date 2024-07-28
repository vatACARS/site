import Link from "next/link";

import { FaPatreon, FaXTwitter } from "react-icons/fa6";
import { BsOpencollective } from "react-icons/bs";

export default function Footer() {
    return (
        <footer className="bg-dark py-4 text-notsodark">
            <div className="container px-4 mx-auto">
                <div className="-mx-4 flex flex-wrap justify-between">
                    <div className="px-4 my-4 w-full xl:w-1/5">
                        <a href="/" className="block w-56 lg:mx-10">
                            <img src="/img/vatacars-logo-sm-dark.png" alt="vatACARS" className="w-12 h-12" />
                        </a>
                    </div>

                    <div className="px-4 my-4 w-full sm:w-auto">
                        <h2 className="inline-block text-2xl pb-2 mb-4 border-b-4 border-blue-500">vatACARS</h2>
                        <ul className="">
                            <Link href="/terms">
                                <li className="cursor-pointer transition-all duration-300 hover:text-slate-50">Terms of Service</li>
                            </Link>
                            <Link href="/privacy">
                                <li className="cursor-pointer transition-all duration-300 hover:text-slate-50">Privacy</li>
                            </Link>
                            <li className="cursor-pointer transition-all duration-300 hover:text-slate-50">
                                <a href="https://status.vatacars.com" className="flex flex-row space-x-2 items-center">
                                    <span>Service Status</span>
                                    <div className="w-[8px] h-[8px] border-[1.5px] border-green-300 bg-green-600 rounded-full animate-pulse" />
                                </a>
                            </li>
                            <li className="cursor-pointer transition-all duration-300 hover:text-slate-50">
                                <a href="https://github.com/vatACARS">
                                    <span>Our Github</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="px-4 my-4 w-full sm:w-auto">
                        <h2 className="inline-block text-2xl pb-2 mb-4 border-b-4 border-blue-500">Helpful Links</h2>
                        <ul className="">
                            <Link href="/">
                                <li className="cursor-pointer transition-all duration-300 hover:text-slate-50">Homepage</li>
                            </Link>
                            <Link href="/me">
                                <li className="cursor-pointer transition-all duration-300 hover:text-slate-50">My Profile</li>
                            </Link>
                        </ul>
                    </div>

                    <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
                        <h2 className="inline-block text-2xl pb-2 mb-4 border-b-4 border-blue-500">Connect With Us</h2>
                        <div className="flex flex-row space-x-2">
                            <a target="_blank" className="p-2 rounded-full border-2 border-notsodark transition-all duration-300 hover:text-slate-50 hover:border-slate-50">
                                <FaPatreon />
                            </a>
                            <a target="_blank" className="p-2 rounded-full border-2 border-notsodark transition-all duration-300 hover:text-slate-50 hover:border-slate-50">
                                <FaXTwitter />
                            </a>
                            <a href="https://opencollective.com/vatacars-project" target="_blank" className="p-2 rounded-full border-2 border-notsodark transition-all duration-300 hover:text-slate-50 hover:border-slate-50">
                                <BsOpencollective />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}