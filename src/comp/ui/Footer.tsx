export default function Navbar() {
    return (
        <nav className="bg-slate-100 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <p className="font-semibold text-xl mb-2">
                    <span className="text-blue-500">vat</span>ACARS
                </p>
                <p className="text-sm text-slate-600">© 2024 vatACARS Team. All rights reserved.</p>
                <div className="mt-2">
                <p className="text-sm text-slate-400"><span className="font-semibold text-red-300">Disclaimer:</span> The information contained on this website is for informational purposes only and should not be used for air navigation.</p>
                <p className="text-sm text-slate-400">vatACARS is not affiliated with or endorsed by vatSys nor VATSIM (including any divisions).</p>
                </div>
            </div>
        </nav>
    );
}