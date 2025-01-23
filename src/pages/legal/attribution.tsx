import React, { useEffect, useState } from "react";

// TypeScript interface for a dependency
interface Dependency {
    ignore: boolean;
    name: string;
    version: string;
    authors: string;
    url: string;
    license: string;
    licenseText: string;
}

export default () => {
    const [dependencies, setDependencies] = useState<Dependency[]>([]);

    useEffect(() => {
        // Fetch or import the JSON data
        const fetchDependencies = async () => {
            const response = await fetch('/attribution.json');
            const data = await response.json();
            setDependencies(data);
        };

        fetchDependencies();
    }, []);

    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold">Attributions</h1>
            <p className="text-zinc-500 mb-6">
                We &lt;3 open source software. We couldn't have built this without the help of the following projects.
            </p>
            <div className="grid grid-cols-1 gap-4">
                {dependencies.map((dependency, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-top">
                            <a href={dependency.url} className="text-lg font-bold link link-animated text-blue-400">{dependency.name}</a>
                            <p className="text-sm font-semibold text-zinc-400">v{dependency.version}</p>
                        </div>
                        <p className="text-md text-slate-300"><span className="text-zinc-500">Authors</span> {dependency.authors}</p>
                        <div className="mt-2 flex items-center space-x-2">
                            <span className="text-sm text-zinc-500">Licensed under</span>
                            <p className="text-zinc-200 font-semibold">{dependency.license}</p>
                        </div>
                        <p className="text-xs text-zinc-400/90">{dependency.licenseText}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-zinc-500 text-sm text-center">
                <p>Phew!</p>
            </div>
        </div>
    );
}
