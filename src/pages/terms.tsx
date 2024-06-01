import Navbar from "../comp/ui/Navbar";
import Footer from "../comp/ui/Footer";
import SEO from "../comp/meta/SEO";

export default function Terms() {
    return (
        <div>
            <SEO title="Terms of Use" />
            <Navbar />
            <div className="mx-auto max-w-4xl px-12 py-6 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Terms of Use</h1>
                    <span className="text-lg text-slate-500">Last updated on 18<sup>th</sup> May, 2024.</span>
                </div>

                <div key="introduction">
                    <p className="text-slate-700">Welcome to vatACARS! These terms of use ("Terms") govern your access to and use of the open-source vatACARS software and any related services provided by us. By using vatACARS, you agree to these Terms. Please read them carefully.</p>
                </div>

                <div key="license">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">License</h2>
                    <p className="text-slate-700">Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use the vatACARS plugin, pilot client, and installer for your personal or internal business purposes.</p>
                </div>

                <div key="user-account">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">User Account</h2>
                    <p className="text-slate-700">You may be required to create a user account to access certain features of vatACARS. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                </div>

                <div key="user-responsibilities">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">User Responsibilities</h2>
                    <p className="text-slate-700">By using vatACARS, you agree to:</p>
                    <ul className="text-slate-700 list-disc list-inside space-y-2">
                        <li>Use the software in compliance with its intended use as a CPDLC simulation.</li>
                        <li>Not to use the software for any unlawful purpose.</li>
                        <li>Not to impersonate any person or entity.</li>
                        <li>Not to interfere with the operation of vatACARS.</li>
                        <li>Not to upload or transmit viruses or other malicious code.</li>
                    </ul>
                </div>

                <div key="integration">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Integration</h2>
                    <p className="text-slate-700">vatACARS integrates with VatSys and VATSIM. By using vatACARS, you agree to abide by the terms of use of these platforms.</p>
                </div>

                <div key="support">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Support</h2>
                    <p className="text-slate-700">For support inquiries or dispute resolution, please contact us at support@vatACARS.com.</p>
                </div>

                <div key="updates-maintenance">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Updates and Maintenance</h2>
                    <p className="text-slate-700">As an open-source project, vatACARS is maintained by us and the community. We strive to provide updates and maintain the smooth operation of vatACARS. However, we cannot guarantee uninterrupted or error-free service.</p>
                </div>

                <div key="intellectual-property">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Intellectual Property</h2>
                    <p className="text-slate-700">All intellectual property rights in vatACARS are owned by us or our licensors. You may not use vatACARS in any manner that infringes our intellectual property rights or the rights of others.</p>
                </div>

                <div key="disclaimer-warranties">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Disclaimer of Warranties</h2>
                    <p className="text-slate-700">vatACARS is provided on an "as-is" and "as-available" basis, without any warranties of any kind, express or implied. We do not warrant that vatACARS will be error-free or uninterrupted.</p>
                </div>

                <div key="limitation-liability">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Limitation of Liability</h2>
                    <p className="text-slate-700">To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of vatACARS.</p>
                </div>

                <div key="modifications">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Modifications</h2>
                    <p className="text-slate-700">We reserve the right to modify or revise these Terms at any time. By continuing to use vatACARS after any such changes, you agree to be bound by the modified Terms.</p>
                </div>

                <div key="contact-us">
                    <h2 className="text-slate-800 text-xl font-semibold mb-2">Contact Us</h2>
                    <p className="text-slate-700">If you have any questions about these Terms, please contact us at support@vatACARS.com.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}