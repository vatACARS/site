import nextMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

/** @type {import('rehype-pretty-code').Options} */
const options = {
    keepBackground: false
};

const plugins = [];

/** @type {import('next').NextConfig} */
const nextConfig = {
    cleanDistDir: true,
    reactStrictMode: true,
    poweredByHeader: false,
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
    env: {
        NEXT_TELEMETRY_DISABLED: '1',
    },
};

plugins.push(
    nextMDX({
        extension: /\.(md|mdx)$/,
        options: {
            remarkPlugins: [],
            rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
        },
    }),
);

export default () => plugins.reduce((_, plugin) => plugin(_), nextConfig);