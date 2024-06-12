import { useState, useEffect } from "react";

export default function Stats() {
    const [onlineATSUList, setOnlineATSUList] = useState([]);

    async function getOnlineATSUList() {
        const response = await fetch("https://api.vatacars.com/atsu/online", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json());
        
        setOnlineATSUList(response);
    }

    useEffect(() => {
        getOnlineATSUList();
    }, []);

    return (
        <div className="bg-slate-900 text-slate-50 max-w-4xl py-12">
            <div className="flex flex-row space-x-2 font-semibold">
                <span className="w-36">Authority</span>
                <span>Controlling Sectors</span>
            </div>
            <div className="flex flex-col space-y-12">
                {onlineATSUList.map(atsu => (
                    <div key={atsu.id} className="flex flex-row space-x-2">
                        <div className="flex flex-col space-x-2">
                            <h1 className="w-36">{atsu.station_code} - {atsu.cid}</h1>
                            <p className="mt-2">Online from:</p>
                            <span>{new Date(atsu.opened)}</span>
                        </div>
                        <div className="flex flex-col space-x-2">
                            {JSON.parse(atsu.sectors).map(sector => (
                                <div key={sector.id} className="flex flex-row space-x-2">
                                    <span>{sector.callsign} ({sector.name})</span>
                                    <span>{sector.frequency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}