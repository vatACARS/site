import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Doc = defineDocumentType(() => ({
    name: "Doc",
    filePathPattern: "**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        }
    }
}));

export default makeSource({
    contentDirPath: "src/docs",
    documentTypes: [Doc],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: "dark-plus",
                    onVisitLine(node) {
                        if(node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }]
                        }
                    }
                }
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section"
                    }
                }
            ]
        ],
    },
});