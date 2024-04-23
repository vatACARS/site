import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="px-12 relative flex h-16 items-center justify-between border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h3 className="font-semibold text-lg">
                                <Link href="/">
                                    <p className="cursor-pointer"><span className="text-blue-500">vat</span>ACARS</p>
                                </Link>
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-8">
                            <Link href="/download"><span className="hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium text-slate-900 cursor-pointer">Download</span></Link>
                            <Link href="/privacy"><span className="hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium text-slate-900 cursor-pointer">Privacy</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}