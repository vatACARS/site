import { useEffect, useState } from "react";

export default () => {
    const [statistics, setStatistics] = useState({ stations: [], messages: [] });

    useEffect(() => {
        fetch('/api/statistics')
            .then(res => res.json())
            .then(data => setStatistics(data));
    }, []);
    
    return (
        <div>
            <h1>Statistics</h1>
            <ul>
                <li>Stations: {statistics.stations.length}</li>
                <li>Messages: {statistics.messages.length}</li>
            </ul>
            <pre>{JSON.stringify(statistics, null, 2)}</pre>
        </div>
    )
}