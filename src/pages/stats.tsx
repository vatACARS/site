import { useEffect, useState } from "react";
import useSWR from "swr";

import Map from "@comp/ui/map";

import {
    ReactFlow,
    Background,
} from '@xyflow/react';

import CustomNode from "@comp/ui/customNode";
 
const nodeTypes = {
  custom: CustomNode,
};

import '@xyflow/react/dist/style.css';

const fetcher = (url) => fetch(url, {headers: { "Content-Type": "application/json" }}).then((res) => res.json());

const initialNodes = [
    {
        id: 'connected',
        type: 'custom',
        position: { x: 10, y: 100 },
        data: {
            title: 'Clients',
            value: '0',
            valueType: 'info',
            sourceHandle: true,
        },
    },
    {
        id: 'gateway',
        type: 'custom',
        position: { x: 170, y: 100 },
        data: {
            title: 'vatACARS',
            value: 'Online',
            valueType: 'success',
            targetHandle: true,
            sourceHandle: true,
        },
    },
    {
        id: 'stationGateway',
        type: 'custom',
        position: { x: 350, y: 70 },
        data: {
            title: 'Stations',
            value: '0 Registered',
            valueType: 'info',
            targetHandle: true,
            sourceHandle: true,
        },
    },
    {
        id: 'messageGateway',
        type: 'custom',
        position: { x: 350, y: 130 },
        data: {
            title: 'Messages',
            value: '0 Transactions',
            valueType: 'info',
            targetHandle: true,
            sourceHandle: true,
        },
    }
];
const initialEdges = [
    {
        id: 'connected-gateway',
        source: 'connected',
        target: 'gateway',
        animated: true,
    }, {
        id: 'gateway-stationGateway',
        source: 'gateway',
        target: 'stationGateway',
        animated: true,
    }, {
        id: 'gateway-messageGateway',
        source: 'gateway',
        target: 'messageGateway',
        animated: true,
    }
];

export default () => {
    const { data: statisticsResponse } = useSWR('/api/statistics', fetcher, { refreshInterval: 10000 });
    const [statistics, setStatistics] = useState(null);
    const [nodes, setNodes]: [any, any] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    function updateNodeById(id, value) {
        setNodes((prevNodes) => {
            const newNodes = prevNodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            value,
                        },
                    };
                }

                return node;
            });

            return newNodes;
        });
    }

    useEffect(() => {
        if(statistics) {
            updateNodeById('connected', `${statistics.connected} Connected`);
            updateNodeById('stationGateway', `${statistics.stations.length} Registered`);
            updateNodeById('messageGateway', `${statistics.messages.length} Transactions`);
        }
    }, [statistics]);

    useEffect(() => {
        if(statisticsResponse) setStatistics(statisticsResponse);
    }, [statisticsResponse]);

    return (
        <div>
            <h1>Statistics</h1>
            {statistics ? (
                <div className="flex-col gap-4">
                    <div className="flex-col gap-4">
                        <ul>
                            <li>Stations: {statistics.stations.length}</li>
                            <li>Messages: {statistics.messages.length}</li>
                        </ul>
                        <pre>{JSON.stringify(statistics, null, 2)}</pre>
                    </div>

                    <div className="w-full h-64 border-2 border-zinc-700 bg-zinc-800">
                        <ReactFlow
                            nodeTypes={nodeTypes}
                            nodes={nodes}
                            edges={edges}
                            nodesConnectable={false}
                            nodesDraggable={false}
                            elementsSelectable={false}
                        >
                            <Background color="#999" gap={16} />
                        </ReactFlow>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="mt-4 relative border-2 border-zinc-700 bg-zinc-800">
                <Map className="h-[calc(50vh)] w-[100%]" />

                <div className="h-[24px]">
                    <div className="flex h-full px-4 text-zinc-400/60 font-medium text-xs items-center justify-end">
                        <div className="flex space-x-4">
                            <p className="after:content-['|'] after:ml-4">FIR Boundaries &copy; <a href="https://github.com/vatsimnetwork/vatspy-data-project" className="text-blue-400/60 link link-animated">VATSIM</a></p>
                            <p className="after:content-['|'] after:ml-4">Map Imagery &copy; <a href="https://cartodb.com/attribution" className="text-blue-400/60 link link-animated">CartoDB</a></p>
                            <p className="after:content-['|'] after:ml-4">Aircraft Icons &copy; <a href="https://www.patreon.com/vatsimradar24" className="text-blue-400/60 link link-animated">VATSIM Radar</a></p>
                            <p className="text-[#565656] font-semibold">&copy; vatACARS Team {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}