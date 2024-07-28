import Navbar from '../comp/ui/Navbar';
import SEO from '../comp/meta/SEO';

export default function Err404() {
    return (
        <>
            <SEO title="404 Not Found" />
            <div className="absolute top-0 left-0 w-full">
                <Navbar />
            </div>

            <div className="flex items-center justify-center h-screen bg-kindadark">
                <div className="flex flex-col space-y-4 mx-24">
                    <h1 className="text-6xl font-semibold text-notsodark">Oops! 🛫</h1>
                    <p className="text-2xl text-notsodark">It looks like this page is out of our airspace. The link you followed might be outdated or the page has flown away.</p>
                    <span className="text-lg pt-4 text-notsodark">Not to worry, we'll get you back on course:</span>
                    <ul className="text-md text-notsodark list-disc list-inside">
                        <li>Check the URL for any typos.</li>
                        <li>Return to the <a href="/" className="underline">Home Page</a> or <a href="javascript:window.history.back();" className="underline">Go Back</a> a page.</li>
                        <li>Contact a <span className="font-semibold text-[#cc4c15]">@Maintainer</span> on the Discord if you believe this is a mistake.</li>
                    </ul>
                </div>
            </div>
        </>
    );
}