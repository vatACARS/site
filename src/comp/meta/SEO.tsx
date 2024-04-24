import React from "react";
import Head from "next/head";

const SEO: React.FC<SEOProps> = ({ description = "Facilitate real-time text-based communication between air traffic controllers and pilots within vatSys.", keywords = ["vatSys", "ACARS", "plugin", "vatsim", "vatpac"], title, site_name, site_url = "https://vatacars.com/", twitter_handle }) => (
	<Head>
		<title>vatACARS {title ? `- ${title}` : ""}</title>
		<link rel="icon" href="/favicon.ico" />
		<meta name="description" content={description} />
		<meta name="keywords" content={keywords?.join(", ")} />
		<meta name="theme-color" content="#AC8DFB" />

		<meta property="og:type" content="website" />
		<meta property="og:title" content={`vatACARS ${title ? `- ${title}` : ""}`} />
		<meta property="og:description" content={description} />
		<meta property="og:site_name" content={site_name} />
		<meta property="og:url" content={site_url} />
		<meta property="og:image" content="/img/logo.png" />

		{/*<meta name="twitter:card" content="summary_large_image" />*/}
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:site" content={site_url} />
		{/*<meta name="twitter:creator" content={twitter_handle} />*/}
		<meta name="twitter:image" content="/img/logo.png" />
	</Head>
);

export interface SEOProps {
	description?: string;
	lang?: string;
	meta?: any[];
	keywords?: string[];
	title?: string;
	site_name?: string;
	site_url?: string;
	twitter_handle?: string;
}

export default SEO;