import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";

import SEO from "../comp/meta/SEO";

export default function Privacy() {
    return (
        <div>
            <SEO title="Privacy Policy" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 mb-12 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Privacy Policy</h1>
                    <span className="text-lg text-slate-500">Last updated on 4<sup>th</sup> June, 2024.</span>
                </div>
                <div key="introduction">
                    <p className="text-slate-700">This privacy policy ("Policy") describes how vatACARS ("vatACARS", "we", "us" or "our") collects, protects and uses the personally identifiable information ("Personal Information" or "PII") you ("User", "you" or "your") may provide through the vatACARS website (vatacars.com) or in the course of using any vatACARS products (collectively, "Software"). The policy also describes the choices available to you regarding the use of your Personal Information and how you can access and update this information. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.</p>
                </div>

                <div key="personal information collected">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Collection of personal information</h2>
                    <p className="text-slate-700">We collect the following Personal Information when you log in to our services:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">OAuth Access and Refresh Tokens:</span> These tokens are used to authenticate your Discord and VATSIM accounts and allow for secure communication between our services and these platforms.</li>
                        <li><span className="font-semibold">Discord ID:</span> Your unique identifier on the Discord platform.</li>
                    </ul>
                    <p className="text-slate-700 mt-2">Additionally, when you log in, we collect information such as your email, first and last name, and other details. This information is stored only in your browser and is not transmitted to or stored on our servers.</p>
                    <p className="text-slate-700 mt-2">We collect and use this information for the following purposes:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">Authentication:</span> To verify your identity and grant you access to our services.</li>
                        <li><span className="font-semibold">Account Linking:</span> To connect your Discord account with our services for seamless authentication and personalization.</li>
                        <li><span className="font-semibold">Service Personalisation:</span> To tailor your experience and provide relevant content based on your preferences.</li>
                    </ul>
                </div>

                <div key="non-personal information collected">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Collection of non-personal information</h2>
                    <p className="text-slate-700">When you visit the Website, our servers automatically record information that your browser sends. This data may include information such as your device's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics.</p>
                </div>

                <div key="managing personal information">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Managing personal information</h2>
                    <p className="text-slate-700">You have the following options to manage your personal information:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">Information Stored in Your Browser</span></li>
                        <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                            <li><span className="font-semibold">Clear Cookies:</span> You can clear the cookies stored by our website through your browser settings. This will delete the login information and preferences saved in your browser.</li>
                            <li><span className="font-semibold">Browser Settings:</span> You can adjust your browser settings to control how cookies are handled, including blocking or deleting them.</li>
                        </ul>
                        <li><span className="font-semibold">OAuth Connections</span></li>
                        <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                            <li><span className="font-semibold">VATSIM:</span> You can revoke the OAuth access and refresh tokens through the VATSIM authorizations page, available here: <a className="underline text-blue-500" href="https://auth.vatsim.net/authorizations">https://auth.vatsim.net/authorizations</a></li>
                            <li><span className="font-semibold">Discord:</span> You can revoke the OAuth access and refresh tokens through your Discord settings, under "Authorized Apps".</li>
                        </ul>
                    </ul>
                    <p className="text-slate-700 mt-2">We aim to provide you with control over your personal information. To have any and all of your data removed from our databases, please contact a core maintainer through our designated support channels.</p>
                </div>

                <div key="use and processing of collected information">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Use and processing of collected information</h2>
                    <p className="text-slate-700">We use the collected information for the following purposes:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">Discord ID</span></li>
                        <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                            <li>To link your Discord account with our services.</li>
                            <li>To personalize your experience on our platform by displaying your Discord username and avatar.</li>
                        </ul>
                        <li><span className="font-semibold">OAuth Access and Refresh Tokens</span></li>
                        <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                            <li>To authenticate your access to our services and the connected platforms (Discord and VATSIM).</li>
                            <li>To maintain the connection between your accounts and ensure seamless communication.</li>
                        </ul>
                        <li><span className="font-semibold">Linked Account Information (stored in your browser)</span></li>
                        <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                            <li>To facilitate your login process and remember your preferences.</li>
                            <li>To enhance your user experience by pre-filling certain fields and customising content.</li>
                        </ul>
                    </ul>
                    <p className="text-slate-700 mt-4">We do not share your Personal Information with third parties except in the following cases:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">With your consent:</span> We may share your information with third-party services or platforms if you explicitly authorise us to do so.</li>
                        <li><span className="font-semibold">Legal requiremnent:</span> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                    </ul>
                    <p className="text-slate-700 mt-4">We are committed to using your information responsibly and transparently. If you have any questions about how we use your data, please don't hesitate to contact us.</p>
                </div>

                <div key="information transfer and storage">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Information transfer and storage</h2>
                    <p className="text-slate-700">Depending on your location, data transfers may involve transferring and storing your information in a country other than your own. You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by us to safeguard your information.</p>
                    <p className="text-slate-700 mt-2">Your Discord ID and OAuth tokens are securely stored on MongoDB Atlas servers located in Sydney, Australia. We have chosen MongoDB Atlas for its robust security measures and compliance with industry standards to protect your data.</p>
                    <p className="text-slate-700 mt-2">The information stored in your browser, such as your login details and preferences, is not transferred to or stored on our servers. It remains solely on your device and is managed through your browser's settings.</p>
                    <p className="text-slate-700 mt-2">We do not transfer your Personal Information to countries outside of Australia. We are committed to ensuring that your data is handled in accordance with Australian privacy laws and regulations.</p>
                    <p className="text-slate-700 mt-2">If you have any concerns regarding the storage or transfer of your data, please contact us through our designated support channels.</p>
                </div>

                <div key="cookies">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Cookies</h2>
                    <p className="text-slate-700">Our website uses cookies to enhance your browsing experience and provide personalized features. Cookies are small text files placed on your device by your web browser. They help us remember your preferences, facilitate logins, and gather anonymous statistical data about website usage.</p>
                    <p className="text-slate-700 mt-2">You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies, but please note that disabling cookies may limit certain functionalities of our website.</p>
                    <p className="text-slate-700 mt-2">By using our website, you consent to the use of cookies as described in this policy. If you have any concerns about cookies, please refer to your browser's help documentation or contact us for further assistance.</p>
                </div>

                <div key="links to other websites">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Links to other websites</h2>
                    <p className="text-slate-700">Our Website contains links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other websites or third parties. We encourage you to be aware when you leave our Website and to read the privacy statements of each and every website that may collect Personal Information.</p>
                </div>

                <div key="information security">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Information security</h2>
                    <p className="text-slate-700">We prioritize the security of your information and employ a multi-layered approach to protect it.</p>
                    <p className="text-slate-700 mt-2 font-semibold">Technical Safeguards:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">Encryption:</span> We use industry-standard encryption algorithms to protect your data whenever in transit.</li>
                        <li><span className="font-semibold">Secure Storage:</span> Your sensitive data is stored on MongoDB Atlas servers, which employ industry-standard security measures, including access controls, firewalls, and intrusion detection systems.</li>
                        <li><span className="font-semibold">Security Audits:</span> We regularly conduct security audits and vulnerability assessments to identify and address potential risks.</li>
                    </ul>
                    <p className="text-slate-700 mt-4 font-semibold">Operational Safeguards:</p>
                    <ul className="list-disc list-inside pl-4 flex flex-col mt-2 space-y-2">
                        <li><span className="font-semibold">Limited Access:</span> Only authorized personnel have access to your Personal Information on a need-to-know basis.</li>
                        <li><span className="font-semibold">Secure Development Practices:</span> We adhere to secure coding practices and regularly update our software to patch vulnerabilities.</li>
                    </ul>
                    <p className="text-slate-700 mt-4">While we strive to maintain the highest level of security, no system can be completely immune to potential threats. In the unlikely event of a security breach, we will notify you promptly and take appropriate measures to mitigate any harm.</p>
                </div>

                <div key="legal disclosure">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Legal disclosure</h2>
                    <p className="text-slate-700">We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena, or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request. In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account and personal data will likely be among the assets transferred.</p>
                    <p className="text-slate-700 mt-2">We will not sell or rent your Personal Information to third parties for their marketing purposes.</p>
                    <p className="text-slate-700 mt-2">We are committed to protecting your privacy and will only disclose your information when necessary and in accordance with applicable laws. If you have any questions regarding our legal disclosure practices, please contact us.</p>
                </div>

                <div key="changes and amendments">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Changes and amendments</h2>
                    <p className="text-slate-700">We may update this Privacy Policy from time to time. When we make changes, we will revise the "Last updated" date at the top of the Policy. We encourage you to review this Policy periodically to stay informed about how we are protecting your information. Your continued use of the Website or our Software following the posting of changes constitutes your acceptance of such changes.</p>
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