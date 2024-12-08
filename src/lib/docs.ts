import fs from 'fs/promises';
import path from 'path';

export async function getDocContent() {
  const docsPath = path.join(process.cwd(), 'src/pages/docs');
  const categories = await fs.readdir(docsPath);
  
  const structure = await Promise.all(
    categories
      .filter(async cat => (await fs.stat(path.join(docsPath, cat))).isDirectory())
      .map(async category => {
        const categoryPath = path.join(docsPath, category);
        const subDirs = await fs.readdir(categoryPath);
        
        const subCategories = await Promise.all(
          subDirs
            .filter(async dir => (await fs.stat(path.join(categoryPath, dir))).isDirectory())
            .map(async subDir => {
              const subPath = path.join(categoryPath, subDir);
              const files = await fs.readdir(subPath);
              
              const sections = await Promise.all(
                files
                  .filter(file => file.endsWith('.md'))
                  .map(async file => {
                    const content = await fs.readFile(path.join(subPath, file), 'utf-8');
                    return {
                      title: path.basename(file, '.md').replace(/-/g, ' '),
                      content
                    };
                  })
              );

              return {
                title: subDir.replace(/-/g, ' '),
                sections
              };
            })
        );

        return {
          title: category,
          subCategories
        };
      })
  );

  return structure;
}