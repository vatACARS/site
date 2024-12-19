import fs from 'fs/promises';
import path from 'path';

export async function getDocContent() {
  const docsPath = path.join(process.cwd(), 'src/docs');

  async function readDirectoryRecursive(dirPath: string): Promise<any> {
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
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          return {
            title: entry.name.replace(/-/g, ' ').replace(/\.md$/, ''),
            type: 'file',
            content,
          };
        }
        return null;
      })
    );

    return results.filter(Boolean);
  }

  const structure = await readDirectoryRecursive(docsPath);
  return structure;
}
