import Image from "next/image";

import { FaLink, FaDiscord } from "react-icons/fa6";

export default function ProfileMyDetails({ user }) {
    return (
        <>
            <h4 className="font-light text-3xl">My Details</h4>
            <div className="mt-4 space-y-4">
                <div className="flex flex-row items-center space-x-8">
                    <div className="flex items-center space-x-3">
                        <div className={`shrink-0 w-14 h-14 rounded-full text-white justify-center text-2xl flex items-center transition-all duration-300 ${!user ? "bg-dark animate-pulse" : "bg-blue-500"}`}>{user?.data?.authorised! ? `${user?.data?.name_first!.substring(0, 1)}${user?.data?.name_last!.substring(0, 1)}` : ""}</div>
                        <div className="text-lg flex flex-col space-y-1">
                            <span className="font-semibold">{!user ? <div className="h-6 w-36 bg-dark animate-pulse rounded-md" /> : user?.data?.authorised! ? `${user?.data?.name_first!} ${user?.data?.name_last!}` : ""}</span>
                        </div>
                    </div>
                    <FaLink className={`text-4xl shrink-0 ${!user ? "animate-pulse" : ""}`} />
                    <div className="flex items-center space-x-3">
                        <div className={`shrink-0 w-14 h-14 relative rounded-full text-white justify-center text-2xl flex items-center transition-all duration-300 ${!user ? "bg-dark animate-pulse" : "bg-blue-500"}`}>
                            <div className="absolute flex items-center justify-center w-6 h-6 bg-[#5865F2] rounded-full -bottom-1 -right-1">
                                {user && user?.data?.authorised! ? <img className="w-full h-full" src={`https://cdn.discordapp.com/avatars/${user?.data?.discord?.id!}/${user?.data?.discord?.avatar!}.webp?size=256`} /> : <div />}
                                <FaDiscord className="text-sm" />
                            </div>
                        </div>
                        <div className="text-lg flex flex-col space-y-1">
                            <span className="font-semibold">{!user ? <div className="h-6 w-36 bg-dark animate-pulse rounded-md" /> : `${user?.data?.discord?.username!}${user?.data?.discord?.discriminator! != "0" ? `#${user?.data?.discord?.discriminator!}` : ""}`}</span>
                            <span className="flex flex-row items-center text-notsodark text-sm">{!user ? <div className="h-5 w-28 bg-dark animate-pulse rounded-md" /> : user?.data?.discord?.id!}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center pt-6 pb-2 space-x-3">
                        <img className="w-32" src="/img/VATSIM_Logo_No_Tagline_2000px.png" />
                        <span className="text-notsodark text-3xl">Information</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="flex flex-row items-center text-notsodark text-sm">CID: {!user ? <div className="ml-2 h-5 w-24 bg-dark animate-pulse rounded-md" /> : user?.data?.authorised! ? user?.data?.cid! : ""}</span>
                        <span className="flex flex-row items-center text-notsodark text-sm">Controller Rating: {!user ? <div className="ml-2 h-5 w-24 bg-dark animate-pulse rounded-md" /> : user?.data?.authorised! ? `${user?.data?.rating?.long!} (${user?.data?.rating?.short!})` : ""}</span>
                        <span className="flex flex-row items-center text-notsodark text-sm pt-2">Region: {!user ? <div className="ml-2 h-5 w-24 bg-dark animate-pulse rounded-md" /> : user?.data?.authorised! ? `${user?.data?.region?.name!} (${user?.data?.region?.id!})` : ""}</span>
                        <span className="flex flex-row items-center text-notsodark text-sm">Division: {!user ? <div className="ml-2 h-5 w-24 bg-dark animate-pulse rounded-md" /> : user?.data?.authorised! ? `${user?.data?.division?.name!} (${user?.data?.division?.id!})` : ""}</span>
                        <span className="flex flex-row items-center text-notsodark text-sm">Subdivision: {!user ? <div className="ml-2 h-5 w-24 bg-dark animate-pulse rounded-md" /> : user?.data?.authorised! ? `${user?.data?.subdivision?.id! != null ? `${user?.data?.subdivision?.name!} (${user?.data?.subdivision?.id!})` : "None"}` : ""}</span>
                    </div>
                </div>
            </div>
        </>
    )
}