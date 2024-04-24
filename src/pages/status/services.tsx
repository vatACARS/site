import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../../comp/ui/Navbar";
import Footer from "../../comp/ui/Footer";
import SEO from "../../comp/meta/SEO";

import BarLoader from "react-spinners/BarLoader";
import { AiOutlineCheck, AiOutlineWarning } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";

const groups = [{
    name: "Website and Network",
    children: [{
        id: "web-site",
        name: "Website",
        status: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        uptime: 100
    }, {
        id: "web-cdn",
        name: "Content Delivery Network (Combined)",
        status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uptime: 100
    }, {
        id: "web-api",
        name: "Internal API",
        status: [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        uptime: 100
    }, {
        id: "web-extapi",
        name: "Public API",
        status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uptime: 100
    }]
}, {
    name: "Third-Party Services",
    children: [{
        id: "tp-atlas",
        name: "MongoDB Atlas Database",
        status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uptime: 100
    }, {
        id: "tp-hoppies",
        name: "Hoppies ACARS Server",
        status: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uptime: 100
    }]
}];

const offline = <div className="w-1 h-2 bg-red-500"></div>;
const degraded = <div className="w-1 h-2 bg-yellow-500"></div>;
const online = <div className="w-1 h-2 bg-green-500"></div>;

export default function StatusServices() {
    const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 3000);
	}, []);

    return (
        <>
            <SEO />
            <Navbar />

            <div className="mx-auto max-w-4xl px-12 py-6 flex flex-col space-y-12">
                <div key="title" className="text-center py-6">
                    <h1 className="font-bold text-6xl text-slate-700 mb-4">Service Status</h1>
                    <span className="text-lg text-slate-500">Live and historical data and alerts for vatACARS services.</span>
                </div>
            </div>

            <div className="mx-auto max-w-6xl">
                {groups.map(group => (<>
                    <div className="container p-2 mb-8 mx-auto sm:p-4" data-aos="fade-right" data-aos-once={true} data-aos-duration="200">
                        <h2 className="ml-2 text-2xl font-semibold leading-tight text-slate-700">{group.name}</h2>
                        <span className="ml-2 mb-4 uppercase text-sm text-slate-500">Past 12 Hours</span>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center w-full h-24 bg-gray-100 shadow-md rounded-md">
                                <div className="relative w-32 h-16 animate-pulse">
                                    <Image src="/img/vatacars-logo.png" layout="fill" objectFit="contain" />
                                </div>
                                <div className="mb-3 flex">
                                    <BarLoader loading={true} color="#3b82f6" height={5} width={200} speedMultiplier={0.7} />
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full p-6 text-xs text-left whitespace-nowrap bg-gray-100 rounded-md shadow-md my-2">
                                    <tbody>
                                        {group.children.map(service => (
                                            <tr>
                                                <td className="w-12 py-3">
                                                    <span className="flex justify-center items-center">
                                                        {service.status[11] === 0 ? (
                                                            <AiOutlineCheck className="text-green-500 shrink-0 text-lg" />
                                                        ) : (
                                                            <AiOutlineWarning className={`${service.status[11] == 1 ? "text-yellow-500" : "text-red-500"} shrink-0 text-lg`} />
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="flex flex-row justify-between items-center py-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-800">{service.name}</span>
                                                        {service.status[11] === 0 && <span className="text-green-500">OPERATIONAL</span>}
                                                        {service.status[11] === 1 && <span className="text-yellow-500">DEGRADED</span>}
                                                        {service.status[11] === 2 && <span className="text-red-500">OFFLINE</span>}
                                                    </div>
                                                    <div className="flex flex-col justify-center items-center mr-24 md:mr-48">
                                                        <span className="flex flex-row space-x-1">
                                                            {service.status.map(status => (<>
                                                                {status === 0 && online}
                                                                {status === 1 && degraded}
                                                                {status === 2 && offline}
                                                            </>))}
                                                        </span>
                                                        <p className={`uppercase font-semibold  ${service.uptime > 90 ? "text-green-500" : service.uptime > 50 ? "text-yellow-500" : "text-red-500"}`}>{service.uptime}% Uptime</p>
                                                    </div>
                                                </td>
                                                <td className="w-16 py-2">
                                                    <Link href={`/services/${service.id}`}>
                                                        <span className="flex justify-center items-center">
                                                            <IoMdOpen className="text-slate-600 shrink-0 text-lg hover:pointer-cursor" />
                                                        </span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>))}
            </div>

            <Footer />
        </>
    );
}