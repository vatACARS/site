import { useEffect } from "react";
import AOS from "aos";

import "../comp/index.css";
import "aos/dist/aos.css";

export default function ServicesStatusApp({ Component, pageProps: { ...pageProps } }) {
	useEffect(() => {
		AOS.init();
	}, []);

	return <Component {...pageProps} />;
}