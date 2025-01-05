import Head from 'next/head';
import { useRouter } from 'next/router';

type SEOProps = {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
};

const defaultTitle = 'vatACARS';
const defaultDescription = 'Chat easily with ATC, keep your flight data in check, and enjoy seamless communication. Our tools make your flights smoother and more immersive.';
const defaultKeywords = 'acars, vatsim, vatsys, airline, virtual airline, va, vatpac, vatnz';
const defaultAuthor = 'vatACARS Team';

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    author,
}) => {
    const router = useRouter();

    return (
        <Head>
            <title>{title ? `${defaultTitle} | ${title}` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content={author || defaultAuthor} />
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={`https://vatacars.com${router.asPath}`} />
            <meta property="og:type" content="website" />
        </Head>
    );
};

export default SEO;