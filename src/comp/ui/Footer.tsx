import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-slate-100 py-24">
            <div className="flex flex-row justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pl-12">
                    <p className="font-semibold text-xl mb-2">
                        <span className="text-blue-500">vat</span>ACARS
                    </p>
                    <p className="text-sm text-slate-600">© 2024 vatACARS Team. All rights reserved.</p>
                    <div className="mt-2">
                        <p className="text-sm text-slate-400"><span className="font-semibold text-red-300">Disclaimer:</span> The information contained on this website is for informational purposes only and should not be used for air navigation.</p>
                        <p className="text-sm text-slate-400">vatACARS is not affiliated with or endorsed by vatSys nor VATSIM (including any divisions).</p>
                    </div>
                </div>

                <div className="pr-12 text-right text-slate-700 flex flex-col space-y-2">
                    <Link href="https://status.vatacars.com/">
                        <span className="hover:text-slate-500 px-3 rounded-md font-medium text-slate-900 cursor-pointer flex flex-row space-x-1 items-center">
                            <span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0 animate-pulse" />
                            <p>Service Status</p>
                        </span>
                    </Link>
                    <Link href="/privacy">
                        <span className="hover:text-slate-500 px-3 rounded-md font-medium text-slate-900 cursor-pointer">Privacy Policy</span>
                    </Link>
                    <Link href="/terms">
                        <span className="hover:text-slate-500 px-3 rounded-md font-medium text-slate-900 cursor-pointer">Terms of Use</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}