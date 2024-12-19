import { useEffect, useState, createElement, Fragment } from 'react';
import { GetStaticProps } from 'next';
import { getDocContent } from '@lib/docs';

import { FaBook, FaChevronRight, FaMagnifyingGlass, FaMap, FaMinus, FaPlus } from 'react-icons/fa6';
import ReactMarkdown from 'react-markdown';

interface ContentNode {
    title: string;
    type: 'folder' | 'file';
    content?: string; // files
    contents?: ContentNode[]; // folders
}

interface DocsExplorerProps {
    structure: ContentNode[];
}

export const getStaticProps: GetStaticProps = async () => {
    const structure = await getDocContent();
    return { props: { structure } };
};

export default ({ structure }: DocsExplorerProps) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<ContentNode[]>([]);
    const [selectedFile, setSelectedFile] = useState<ContentNode | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    useEffect(() => {
        if (!searchQuery) {
            setResults([]);
            return;
        }

        const search = (node: ContentNode, query: string) => {
            if (node.type === 'file') {
                return node.title.toLowerCase().includes(query.toLowerCase());
            }

            if (node.type === 'folder') {
                if (node.contents) {
                    return node.contents.some((child) => search(child, query));
                }
            }

            return false;
        };

        const filteredResults = structure.filter((node) => search(node, searchQuery));
        setResults(filteredResults);
    }, [searchQuery, structure]);

    const toggleFolder = (folderTitle: string) => {
        setExpandedFolders((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(folderTitle)) {
                newSet.delete(folderTitle);
            } else {
                newSet.add(folderTitle);
            }
            return newSet;
        });
    };

    const selectFile = (file: ContentNode, path: string[]) => {
        setSelectedFile(file);
        setBreadcrumbs(path);
    };

    const renderNode = (node: ContentNode, path: string[] = [], level = 0) => {
        const isFolderExpanded = expandedFolders.has(node.title);

        if (node.type === 'folder') {
            return (
                <li key={node.title} className="mb-2">
                    <div
                        onClick={() => toggleFolder(node.title)}
                        className="flex items-center cursor-pointer gap-x-2 text-zinc-200 font-medium py-0.5"
                        style={{ paddingLeft: `${level * 2}px` }}
                    >
                        {isFolderExpanded ? <FaMinus /> : <FaPlus />}
                        <span>{node.title}</span>
                    </div>
                    {isFolderExpanded && node.contents && (
                        <ul className="ml-4">
                            {node.contents.map((child) => renderNode(child, [...path, node.title], level + 1))}
                        </ul>
                    )}
                </li>
            );
        }

        if (node.type === 'file') {
            return (
                <li
                    key={node.title}
                    className="cursor-pointer text-zinc-400 hover:text-zinc-200 flex items-center gap-x-2 py-0.5 transition-colors duration-200"
                    style={{ paddingLeft: `${level * 2}px` }}
                    onClick={() => selectFile(node, [...path, node.title])}
                >
                    <FaBook />
                    <span>{node.title}</span>
                </li>
            );
        }

        return null;
    };

    function renderContent(content: string) {
        return (
            <div>
                <h1 className="text-2xl text-zinc-200 font-bold">{selectedFile.title}</h1>
                <p className="mt-2 text-zinc-400"><ReactMarkdown>{content}</ReactMarkdown></p>
            </div>
        )
    }

    return (
        <div className="pt-8 flex">
            <div className="grid grid-cols-7 gap-4 w-full">
                <div className="col-span-2">
                    <nav className="space-y-8">
                        <ul className="vertical-scrollbar w-full h-[80vh] overflow-y-scroll top-0 text-sm leading-6">
                            <div className="mx-4 my-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full py-1 px-2 text-sm text-zinc-400 bg-zinc-800 rounded"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {results.length > 0 ? (
                                <>
                                    <li className="mb-2 text-base-content/90 text-lg font-medium flex space-x-2 items-center">
                                        <FaMagnifyingGlass />
                                        <span>Search Results</span>
                                    </li>
                                    {results.map((node) => renderNode(node))}
                                </>
                            ) : searchQuery.length >= 2 ? (
                                <li className="text-base-content/90 text-lg font-medium flex space-x-2 items-center">
                                    <FaMap />
                                    <span>No results found</span>
                                </li>
                            ) : (
                                <>
                                    <li className="mb-2 text-base-content/90 text-xl font-medium flex space-x-2 items-center">
                                        <FaBook />
                                        <span>Documentation</span>
                                    </li>
                                    {structure.map((node) => renderNode(node))}
                                </>
                            )}
                        </ul>
                    </nav>
                </div>

                <div className="col-span-5 p-4">
                    <div className="text-sm mb-4 text-zinc-400">
                        <nav className="text-sm text-zinc-400 flex space-x-2">
                            {breadcrumbs.map((crumb, index) => (
                                <span className="flex space-x-2 items-center" key={index}>
                                    {index > 0 && <FaChevronRight />}
                                    <span>{crumb}</span>
                                </span>
                            ))}
                        </nav>
                    </div>
                    <div className="content-area">
                        {selectedFile ? renderContent(selectedFile.content) : (
                            <p className="text-zinc-400">Select a file to view its content.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
