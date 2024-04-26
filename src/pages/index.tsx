import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";
import SEO from "../comp/meta/SEO";

import { VscGithubInverted } from "react-icons/vsc";
import { HiOutlineDownload } from "react-icons/hi";

export default function Index() {
    const hrs = new Date().getHours();

    useEffect(() => {
        const elements = document.querySelectorAll('.grid-background > div') as NodeListOf<HTMLElement>;;

        elements.forEach((elem) => {
            const delay = getRandomInt(0, 5);
            const duration = getRandomInt(3, 6);

            elem.style.animationDelay = `${delay}s`;
            elem.style.animationDuration = `${duration}s`;
        });
    }, []);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <>
            <SEO />
            <Navbar />

            <section className="relative mt-24 text-center flex flex-col space-y-8">
                <p className="mx-auto -mt-12 max-w-2xl text-lg text-slate-700">Introducing <span className="text-blue-500">vat</span>ACARS.</p>

                <h1 className="mx-auto max-w-4xl font-display font-medium tracking-tight text-slate-900 text-5xl flex flex-row space-x-2 justify-center">
                    <span className="inline-block">The</span>
                    <span className="relative whitespace-nowrap text-blue-500 mx-auto">
                        <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
                        <span className="relative">Next Generation</span>
                    </span>
                    <span className="inline-block">CPDLC Interface</span>
                </h1>

                <span className="text-xl">This project is under development and not yet ready for public use. We'll announce the launch date soon!</span>

                <div className="mt-12 flex flex-col justify-center gap-y-5 sm:flex-row sm:gap-y-0 sm:gap-x-6">
                    <Link href="https://github.com/vatACARS/plugin">
                        <span className="cursor-pointer flex flex-row items-center space-x-2 rounded-full py-2 px-4 text-slate-50 font-semibold bg-slate-800 hover:bg-slate-600" data-aos="fade-right" data-aos-duration="2000">
                            <VscGithubInverted />
                            <span>Source Code</span>
                        </span>
                    </Link>
                    <a href="https://cdn.vatacars.com/dist/vatACARS Hub Setup 0.1.0.exe" target="_blank">
                        <span className="cursor-pointer flex flex-row items-center space-x-2 rounded-full py-2 px-4 text-slate-800 ring-slate-800 outline-2 font-semibold bg-slate-200" data-aos="fade-left" data-aos-duration="2000">
                            <HiOutlineDownload />
                            <p className="flex flex-row items-center space-x-1">
                                <span>vatACARS Hub</span>
                                <span className="text-xs text-slate-500">v0.1.0</span>
                            </p>
                        </span>
                    </a>
                </div>

                <div className="flex flex-row items-center pb-12 justify-center space-x-4">
                    <div className="translate-x-24">
                        <Image src="/img/dispatch.png" layout="intrinsic" width={537} height={354} />
                    </div>
                    <div className="-translate-x-24">
                        <Image src="/img/editor.png" layout="intrinsic" width={590} height={480} />
                    </div>
                </div>

                {/*<div className="relative w-full max-w-4xl mx-auto my-12 h-[1/2]">
                    <img src="/img/dispatch.png" className="absolute inset-0 object-cover z-10" alt="vatACARS Dispatch Window" />
                    <img src="/img/editor.png" className="absolute inset-0 object-cover z-20 -top-1/2 translate-x-1/2 translate-y-[15%]" alt="vatACARS Editor Window" />
                </div>*/}
            </section>

            <Footer />
        </>
    );
}