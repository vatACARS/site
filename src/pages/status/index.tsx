import { useEffect } from "react";
import { useRouter } from "next/router";

import SEO from "../../comp/meta/SEO";
import Loader from "../../comp/meta/Loader";

export default function ServiceIndex() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => router.push("/status/services"), 3000);
	}, [ router ]);

	return (<><SEO title="Service Status" /><Loader label="Redirecting you..." /></>);
}
