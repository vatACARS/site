import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <section className="w-full px-8 text-slate-200 bg-dark z-50">
            <div className="container flex flex-col flex-wrap md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
                <div className="relative flex flex-row">
                    <div className="flex items-center mb-5 font-medium lg:items-center lg:justify-center md:mb-0 w-32 h-8">
                        <Link href="/">
                            <Image src="/img/vatacars-logo-dark.png" layout="fill" objectFit="contain" />
                        </Link>
                    </div>
                </div>
                <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-notsodark">
                    <Link href="/">
                        <span className="mr-6 font-medium leading-6 text-notsodark hover:text-slate-50 transition-all duration-300 cursor-pointer">Home</span>
                    </Link>
                    <Link href="/">
                        <span className="mr-6 font-medium leading-6 text-notsodark hover:text-slate-50 transition-all duration-300 cursor-pointer">Source Code</span>
                    </Link>
                    <Link href="/">
                        <span className="mr-6 font-medium leading-6 text-notsodark hover:text-slate-50 transition-all duration-300 cursor-pointer">Sign In</span>
                    </Link>
                </nav>
            </div>
        </section>
    );
}