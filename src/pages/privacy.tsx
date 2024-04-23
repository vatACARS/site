import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import SEO from "../comp/meta/SEO";

export default function Privacy() {
    return (
        <div>
            <SEO title="Privacy Policy" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Privacy Policy</h1>
                    <span className="text-lg text-slate-500">Last updated on 24<sup>th</sup> April, 2024.</span>
                </div>
                <div key="introduction">
                    <p className="text-slate-700">This privacy policy ("Policy") describes how vatACARS ("vatACARS", "we", "us" or "our") collects, protects and uses the personally identifiable information ("Personal Information" or "PII") you ("User", "you" or "your") may provide through the vatACARS website (vatacars.com) or in the course of using any vatACARS products (collectively, "Software"). The policy also describes the choices available to you regarding the use of your Personal Information and how you can access and update this information. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.</p>
                </div>

                <div key="personal information collected">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Collection of personal information</h2>
                    <p className="text-slate-700">We do not collect any Personal Information from you.</p>
                </div>

                <div key="non-personal information collected">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Collection of non-personal information</h2>
                    <p className="text-slate-700">When you visit the Website, our servers automatically record information that your browser sends. This data may include information such as your device's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics.</p>
                </div>

                <div key="managing personal information">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Managing personal information</h2>
                    <p className="text-slate-700">As we do not collect any personal information, we do not provide any controls for managing.</p>
                </div>

                <div key="use and processing of collected information">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Use and processing of collected information</h2>
                    <p className="text-slate-700">Any of the information we collect from you may be used to personalize your experience, improve our Website, and operate our Website. Non-Personal Information collected is used only to identify potential cases of abuse and establish statistical information regarding Website usage. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.</p>
                </div>

                <div key="information transfer and storage">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Information transfer and storage</h2>
                    <p className="text-slate-700">Depending on your location, data transfers may involve transferring and storing your information in a country other than your own. You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by us to safeguard your information. If any such transfer takes place, you can find out more by checking the relevant sections of this document.</p>
                </div>

                <div key="cookies">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Cookies</h2>
                    <p className="text-slate-700">The Website uses "cookies" to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you. We may use cookies to collect, store, and track information for statistical purposes to operate our Website. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.</p>
                </div>

                <div key="links to other websites">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Links to other websites</h2>
                    <p className="text-slate-700">Our Website contains links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other websites or third parties. We encourage you to be aware when you leave our Website and to read the privacy statements of each and every website that may collect Personal Information.</p>
                </div>

                <div key="information security">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Information security</h2>
                    <p className="text-slate-700">We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all information and data exchanged between you and our Website cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third-party, despite best efforts.</p>
                </div>

                <div key="legal disclosure">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Legal disclosure</h2>
                    <p className="text-slate-700">We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena, or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request. In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account and personal data will likely be among the assets transferred.</p>
                </div>

                <div key="changes and amendments">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Changes and amendments</h2>
                    <p className="text-slate-700">We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena, or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request. In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account and personal data will likely be among the assets transferred.</p>
                </div>

                <div key="acceptance of this policy">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Acceptance of this policy</h2>
                    <p className="text-slate-700">You acknowledge that you have read this Policy and agree to all its terms and conditions. By using the Website or our Software you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website or our Software.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}