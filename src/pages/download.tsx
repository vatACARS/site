import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Release {
    id: number;
    tagName: string;
    name: string;
    body: string;
    createdAt: string;
    publishedAt: string;
    draft: boolean;
    prerelease: boolean;
    url: string;
}

const ReleaseCard: React.FC<{ release: Release }> = ({ release }) => {
    return (
        <div className="border border-zinc-700 rounded-lg p-6 mb-4 shadow-md bg-zinc-800">
            <h2 className="text-xl font-medium flex space-x-2 items-center">
                <span className="flex text-sm px-2 rounded bg-zinc-700 text-zinc-400 items-center">{release.tagName}</span>
                <a
                    href={release.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 link link-animated"
                >
                    Release {release.name}
                </a>
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
                Published: {new Date(release.publishedAt).toLocaleDateString()}
            </p>
            <ReactMarkdown className="text-zinc-300">{release.body}</ReactMarkdown>
        </div>
    );
};

export default () => {
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        fetch('/api/getDownloadDetails')
            .then(response => response.json())
            .then(data => {
                setReleases(data.data.releases);
            });
    }, []);

    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Latest Releases</h1>
            <div className="max-w-2xl mx-auto">
                <p className="text-red-400 uppercase">This service has been disabled.</p>
                {/*releases.map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                ))*/}
            </div>
        </div>
    );
}