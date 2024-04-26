import { useEffect, useState } from "react";
import Link from "next/link";
import { hasCookie, setCookie } from "cookies-next";
import AOS from "aos";

import "../comp/index.css";
import "aos/dist/aos.css";

export default function ServicesStatusApp({ Component, pageProps: { ...pageProps } }) {
	const [showConsent, setShowConsent] = useState(true);

	useEffect(() => {
		AOS.init();
		setShowConsent(hasCookie("localConsent"));
	}, []);

	const acceptCookie = () => {
		setShowConsent(true);
		setCookie("localConsent", "true", { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) });
	};

	return (
		<>
			<Component {...pageProps} />
			{!showConsent && (
				<div className="fixed inset-0 bg-slate-700 bg-opacity-70">
					<div className="fixed w-full bottom-0 left-0 right-0 py-8 bg-slate-200">
						<div className="max-w-6xl mx-auto flex items-end justify-between">
							<div className="text-slate-800 text-base mr-8">
								<h1 className="text-lg font-semibold mb-2"><span className="text-blue-500">vat</span>ACARS</h1>
								<p className="font-semibold">This website uses cookies to improve user experience.</p>
								<p className="text-slate-600 -mt-1">By using our website you consent to all cookies in accordance with our <Link href="/privacy"><span className="underline text-blue-500 cursor-pointer">Privacy Policy</span></Link>.</p>
							</div>
							<button className="bg-green-500 py-2 px-8 rounded text-white" onClick={() => acceptCookie()}>
								Accept
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}