import fs from 'fs/promises';
import path from 'path';

export async function getDocContent() {
  const docsPath = path.join(process.cwd(), 'src/docs');

  async function readDirectoryRecursive(
    dirPath: string,
    isRoot: boolean = false
  ): Promise<any> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    const results = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          const subContents = await readDirectoryRecursive(fullPath);
          return {
            title: entry.name.replace(/-/g, ' '),
            type: 'folder',
            contents: subContents,
          };
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          return {
            title: entry.name.replace(/-/g, ' ').replace(/\.mdx$/, ''),
            type: 'file',
            content,
          };
        }
        return null;
      })
    );

    // Filter out null results
    const filteredResults = results.filter(Boolean);

    // If root, sort files above folders
    if (isRoot) {
      filteredResults.sort((a, b) => {
        if (a.type === 'file' && b.type === 'folder') return -1;
        if (a.type === 'folder' && b.type === 'file') return 1;
        return 0;
      });
    }

    return filteredResults;
  }

  const structure = await readDirectoryRecursive(docsPath, true); // Pass true for the root directory
  return structure;
}