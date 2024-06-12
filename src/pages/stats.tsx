import { useState, useEffect } from "react";

export default function Stats() {
    const [onlineATSUList, setOnlineATSUList] = useState([]);

    async function getOnlineATSUList() {
        const response = await fetch("/api/misc/getStats", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json());

        const processedData = response.map(item => {
            // Parse the nested JSON strings
            item.sectors = JSON.parse(item.sectors);
            item.approxLoc = JSON.parse(item.approxLoc);

            // Format the date
            item.opened = new Date(item.opened).toLocaleString();

            return item;
        });

        setOnlineATSUList(processedData);
    }

    useEffect(() => {
        getOnlineATSUList();
    }, []);

    return (
        <div className="min-h-screen w-full bg-slate-900 text-slate-50 py-12">
            <div className="px-12 mx-auto">
                <div className="flex flex-row font-semibold">
                    <span className="w-48">Authority</span>
                    <span className="w-48">Controlling Sectors</span>
                    <span>Frequency</span>
                </div>
                <div className="mt-8 flex flex-col space-y-12">
                    {onlineATSUList.map(atsu => (
                        <div key={atsu.id} className="flex flex-row">
                            <div className="flex flex-col space-y-2">
                                <h1 className="w-48">{atsu.station_code} - {atsu.cid}</h1>
                                <div className="flex flex-col">
                                    <p className="mt-2">Online from:</p>
                                    <span>{atsu.opened}</span>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                {atsu.sectors.map(sector => (
                                    <div key={sector.id} className="flex flex-row space-x-2">
                                        <span className="w-48">{sector.callsign} ({sector.name})</span>
                                        <span>{(sector.frequency / 1000000).toFixed(3).replace(/\.?0+$/, '')}{(sector.frequency / 1000000).toFixed(3).replace(/\.?0+$/, '').indexOf(".") == -1 && ".0"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}