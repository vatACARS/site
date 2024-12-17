export default () => {
    return (
        <div id="scrollspy-scrollable-parent" className="vertical-scrollbar max-w-6xl py-8 mb-12 max-h-[85vh]">
            <div className="grid grid-cols-7">
                <div className="col-span-2 mr-6">
                    <ul className="fixed top-32 w-[310px] vertical-scrollbar w-full h-[80vh] overflow-y-scroll top-0 text-sm leading-6" data-scrollspy="#scrollspy" data-scrollspy-scrollable-parent="#scrollspy-scrollable-parent">
                        <li className="text-base-content/90 text-xl font-medium">Terms of Use</li>
                        <li data-scrollspy-group>
                            <a href="#introduction" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                1. Introduction
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#acceptance" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        1.1 Acceptance of Terms
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#modificationsterms" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        1.2 Modifications to Terms
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#license" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                2. License
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#grant-of-license" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        2.1 Grant of License
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#account" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                3. User Account
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#account-creation" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        3.1 Account Creation
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#account-security" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        3.2 Responsibility for Account Security
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#account-activities" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        3.3 Account Activities
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#user-activities" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                4. User Activities
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#intended-use" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        4.1 Compliance with Intended Use
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#prohibited-activities" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        4.2 Prohibited Activities
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#integrations" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                5. Integrations
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#vatsys-integration" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        5.1 VatSys and VATSIM Integration
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#third-party-terms" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        5.2 Responsibility for Third-Party Terms
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#support" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                6. Support
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#support-services" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        6.1 Support Services
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#dispute-resolution" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        6.2 Dispute Resolution
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#updatesmaintenance" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                7. Updates and Maintenance
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#contributions" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        7.1 Open-Source Contributions
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#updates" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        7.2 Updates
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#interruptions" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        7.3 Service Interruptions
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#ip" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                8. Intellectual Property
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#ownership" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        8.1 Ownership of Rights
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#restrictions" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        8.2 Restrictions on Use
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#infringement" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        8.3 Infringement
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#warranty" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                9. Disclaimer of Warranties
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#nowarranty" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        9.1 No Warranty
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#noguarantee" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        9.2 No Guarantee
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#liability" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                10. Limitation of Liability
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#exclusion" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        10.1 Exclusion of Damages
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#maxliability" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        10.2 Maximum Liability
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#modifications" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                11. Modifications to Terms
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#righttomodify" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        11.1 Right to Modify
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#continueduse" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        11.2 Continued Use
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#notifications" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        11.3 Notification of Changes
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li data-scrollspy-group>
                            <a href="#contact" className="text-slate-200 hover:text-slate-100 scrollspy-active:text-blue-500 active block py-0.5 font-medium">
                                12. Contact Us
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#inquiries" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        12.1 General Inquiries
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#address" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-blue-500 flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        12.2 Address
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div
                    id="scrollspy"
                    data-scrollspy-scrollable-parent="scrollspy-scrollable-parent"
                    className="col-span-5 mx-auto flex flex-col mr-8 space-y-12 max-h-screen"
                >
                    <div key="title" className="text-center py-6">
                        <h1 id="introduction" className="font-bold text-6xl text-slate-200 mb-4">Terms of Use</h1>
                        <span id="updated" className="text-lg text-slate-500">
                            Last updated on 17<sup>th</sup> Dec, 2024.
                        </span>
                    </div>

                    <div id="overview" key="introduction">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">1. Introduction</h2>
                        <div className="flex-col space-y-1">
                            <p className="text-slate-200">
                                <span id="acceptance" className="font-bold mr-2">1.1</span>
                                By accessing or using the vatACARS software, including any associated tools, plugins, and services (collectively referred to as “vatACARS”), you acknowledge and agree to comply with these Terms. If you do not agree to these Terms, you must refrain from using vatACARS.
                            </p>
                            <p className="text-slate-200 mt-2">
                                <span id="modificationsterms" className="font-bold mr-2">1.2</span>
                                We reserve the right to modify or amend these Terms at our sole discretion. Any modifications will be effective immediately upon posting of the revised Terms. Your continued use of vatACARS after such modifications constitutes your acceptance of the updated Terms.
                            </p>
                        </div>
                    </div>

                    <div id="license" key="license">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">2. License</h2>
                        <p className="text-slate-200">
                            <span id="grant-of-license" className="font-bold mr-2">2.1</span>
                            Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to install and use the vatACARS plugin, pilot client, and installer (collectively referred to as the "Software") solely for your personal use or for internal business purposes.
                        </p>
                    </div>

                    <div id="account" key="user-account">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">3. User Account</h2>
                        <div className="flex-col space-y-1">
                            <p className="text-slate-200">
                            <span id="account-creation" className="font-bold mr-2">3.1</span>
                                To access certain features of vatACARS, you may be required to create a user account.
                            </p>
                            <p className="text-slate-200 mt-2">
                                <span id="account-security" className="font-bold mr-2">3.2</span>
                                You are solely responsible for maintaining the confidentiality of your account credentials, including your email and password. You agree to notify us immediately of any unauthorized use or breach of your account.
                            </p>
                            <p className="text-slate-200 mt-2">
                                <span id="account-activities" className="font-bold mr-2">3.3</span>
                                You are responsible for all activities that occur under your account, including those made by others using your account with or without your permission.
                            </p>
                        </div>
                    </div>

                    <div id="user-activities" key="user-responsibilities">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">4. User Responsibilities</h2>
                        <p className="text-slate-200">
                            <span id="intended-use" className="font-bold mr-2">4.1</span>
                            vatACARS is built for virtual pilots and air traffic controllers who use online flight simulation networks.  You can only use vatACARS for legitimate flight simming purposes, and you have to follow all the rules and laws that apply.  Basically, don't do anything illegal with it, and keep it related to flight simulation.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="prohibited-activities" className="font-bold mr-2">4.2</span>
                            You are expressly prohibited from using vatACARS for any of the following activities:
                        </p>
                        <ul className="text-slate-200 list-disc list-inside mt-2 space-y-2">
                            <li><span className="font-semibold">Real-world aviation:</span> vatACARS is not certified for real-world aviation use. Any attempt to use it in real-world operations is strictly prohibited and may have serious consequences.</li>
                            <li><span className="font-semibold">Malicious activities:</span> You may not use vatACARS to transmit malicious code, launch denial-of-service attacks, or engage in any other activity that could harm the vatACARS service, its users, or any third party.</li>
                            <li><span className="font-semibold">Data scraping:</span> You may not scrape, collect, or harvest any data from vatACARS without express written permission from the vatACARS administrators.</li>
                            <li><span className="font-semibold">Impersonation:</span> You may not impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                            <li><span className="font-semibold">Reverse engineering:</span> You may not reverse engineer, decompile, or disassemble any portion of the vatACARS software or service</li>
                        </ul>
                        <p className="mt-2 text-slate-200">Any violation of this section may result in the suspension or termination of your vatACARS account and/or legal action.</p>
                    </div>

                    <div id="integrations" key="integration">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">5. integrations</h2>
                        <p id="vatsys-integration" className="text-slate-200">
                            <span id="third-party-terms" className="font-bold mr-2">5.1, 5.2</span>
                            vatACARS integrates with VatSys and VATSIM. By using vatACARS, you agree to abide by the terms of use of these platforms.
                        </p>
                    </div>

                    <div id="support" key="support">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">6. Support</h2>
                        <p className="text-slate-200">
                            <span id="support-services" className="font-bold mr-2">6.1</span>
                            vatACARS strives to provide comprehensive support to its users. We offer support through various channels, including:
                        </p>
                        <ul className="text-slate-200 list-disc list-inside mt-2 space-y-2">
                            <li><span className="font-semibold">Online documentation:</span> Detailed documentation and FAQs are available on the vatACARS website to help you understand and use the service effectively.</li>
                            <li><span className="font-semibold">Discord forums:</span> Our community forums provide a platform for users to connect with each other, share knowledge, and seek assistance from fellow users.</li>
                            <li><span className="font-semibold">Email:</span> You can reach out to the developers directly via our support email: <a href="mailto:support@vatacars.com" target="_blank" className="link link-animated text-blue-500 font-medium">support@vatacars.com</a></li>
                        </ul>
                        <p className="text-slate-200 mt-2">
                            <span id="dispute-resolution" className="font-bold mr-2">6.2</span>
                            We encourage users to resolve any disputes amicably through direct communication. If you have a dispute with another user, we recommend that you first attempt to resolve the issue directly with that user. If you are unable to reach a resolution, you may contact the vatACARS support team for assistance.
                        </p>
                    </div>

                    <div id="updatesmaintenance" key="updates-maintenance">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">7. Updates and Maintenance</h2>
                        <p className="text-slate-200">
                            <span id="contributions" className="font-bold mr-2">7.1</span>
                            vatACARS welcomes contributions from the open-source community. If you are interested in contributing to the development of vatACARS, please contact us through the channels provided on our website.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="updates" className="font-bold mr-2">7.2</span>
                            vatACARS is constantly evolving to improve functionality and address user needs. We may release updates to the service from time to time. These updates may include bug fixes, new features, or performance enhancements.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="interruptions" className="font-bold mr-2">7.3</span>
                            While we strive to maintain continuous service availability, there may be occasions when vatACARS experiences service interruptions due to maintenance, upgrades, or unforeseen circumstances. We will make reasonable efforts to minimize such interruptions and provide advance notice whenever possible.
                        </p>
                    </div>

                    <div id="ip" key="intellectual-property">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">8. Intellectual Property</h2>
                        <p className="text-slate-200">
                            <span id="ownership" className="font-bold mr-2">8.1</span>
                            All intellectual property rights in vatACARS, including but not limited to copyrights, trademarks, and trade secrets, are owned by or licensed to vatACARS. You acknowledge that you do not acquire any ownership rights by using the service.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="restrictions" className="font-bold mr-2">8.2</span>
                            You may not use vatACARS in any manner that infringes upon the intellectual property rights of vatACARS or any third party, unless allowed by the licenses the work is under.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="infringement" className="font-bold mr-2">8.2</span>
                            If you believe that your intellectual property rights have been infringed upon by a user of vatACARS, please contact us with a detailed description of the alleged infringement.
                        </p>
                    </div>

                    <div id="warranty" key="disclaimer-warranties">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">9. Disclaimer of Warranties</h2>
                        <p className="text-slate-200">
                            <span id="nowarranty" className="font-bold mr-2">9.1</span>
                            vatACARS is provided "as is" without warranty of any kind, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="noguarantee" className="font-bold mr-2">9.2</span>
                            vatACARS does not guarantee that the service will be uninterrupted, error-free, or secure. We make no guarantees regarding the accuracy, completeness, or reliability of the information provided through the service.
                        </p>
                    </div>

                    <div id="liability" key="limitation-liability">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">10. Limitation of Liability</h2>
                        <p className="text-slate-200">
                            <span id="exclusion" className="font-bold mr-2">10.1</span>
                            To the fullest extent permitted by law, vatACARS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="maxliability" className="font-bold mr-2">10.2</span>
                            In no event shall the total liability of vatACARS to you for all damages, losses, and causes of action exceed the amount paid by you, if any, for accessing the service.
                        </p>
                    </div>

                    <div id="modifications" key="modifications">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">11. Modifications</h2>
                        <p className="text-slate-200">
                            <span id="righttomodify" className="font-bold mr-2">11.1</span>
                            vatACARS reserves the right to modify these Terms of Service at any time in its sole discretion.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="continueduse" className="font-bold mr-2">11.2</span>
                            Your continued use of vatACARS following the posting of any changes to these Terms of Service constitutes your acceptance of such changes.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="notifications" className="font-bold mr-2">11.3</span>
                            We will make reasonable efforts to notify you of any material changes to these Terms of Service through the vatACARS website or other communication channels.
                        </p>
                    </div>

                    <div id="contact" key="contact-us">
                        <h2 className="text-slate-100 text-xl font-semibold mb-2">12. Contact Us</h2>
                        <p className="text-slate-200">
                            <span id="inquiries" className="font-bold mr-2">12.1</span>
                            For general inquiries, please contact us through the contact form on the vatACARS website or via our support email, at <a className="link link-animated font-medium text-blue-500" href="mailto://contact@vatacars.com">contact@vatacars.com</a>.
                        </p>
                        <p className="text-slate-200 mt-2">
                            <span id="address" className="font-bold mr-2">12.2</span>
                            An office address for vatACARS is at this time unavailable.
                        </p>
                    </div>
                </div>
                <div className="col-span-2" />
            </div>
        </div>
    )
}