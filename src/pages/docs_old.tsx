import { useState, useEffect } from 'react';
import { ChevronRight, Search, Menu } from 'lucide-react';
import { Button } from '@comp/ui/button';
import { Header, Footer } from '@comp/layout/header-footer';
import ReactMarkdown from 'react-markdown';
import { GetStaticProps } from 'next';
import { getDocContent } from '@lib/docs';
import { useRouter } from 'next/router';

interface Section {
  title: string;
  content: string;
}

interface SubCategory {
  title: string;
  sections: Section[];
}

interface Category {
  title: string;
  subCategories: SubCategory[];
}

interface DocsPageProps {
  categories: Category[];
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getDocContent();
  return { props: { categories } };
};

export default function DocsPage({ categories = [] }: DocsPageProps) {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentSubCategory, setCurrentSubCategory] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const selectedContent = 
    categories[currentCategory]?.subCategories[currentSubCategory]?.sections[currentSection]?.content || '';

  useEffect(() => {
    const { cat, sub, sec } = router.query;
    
    if (cat && sub && sec) {
      const categoryIndex = categories.findIndex(c => 
        c.title.toLowerCase().replace(/\s+/g, '-') === cat
      );
      if (categoryIndex === -1) return;

      const subCategoryIndex = categories[categoryIndex].subCategories.findIndex(s => 
        s.title.toLowerCase().replace(/\s+/g, '-') === sub
      );
      if (subCategoryIndex === -1) return;

      const sectionIndex = categories[categoryIndex].subCategories[subCategoryIndex].sections.findIndex(s => 
        s.title.toLowerCase().replace(/\s+/g, '-') === sec
      );
      if (sectionIndex === -1) return;

      setCurrentCategory(categoryIndex);
      setCurrentSubCategory(subCategoryIndex);
      setCurrentSection(sectionIndex);
    }
  }, [router.query, categories]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = [];
    categories.forEach((category, catIndex) => {
      category.subCategories.forEach((subCategory, subIndex) => {
        subCategory.sections.forEach((section, secIndex) => {
          if (
            section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.content.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push({
              category: catIndex,
              subCategory: subIndex,
              section: secIndex,
              title: section.title,
              categoryTitle: category.title,
              subCategoryTitle: subCategory.title,
              preview: section.content.substring(0, 100)
            });
          }
        });
      });
    });
    setSearchResults(results);
  }, [searchQuery, categories]);

  const updateURL = (catIndex: number, subIndex: number, secIndex: number) => {
    const category = categories[catIndex].title.toLowerCase().replace(/\s+/g, '-');
    const subCategory = categories[catIndex].subCategories[subIndex].title.toLowerCase().replace(/\s+/g, '-');
    const section = categories[catIndex].subCategories[subIndex].sections[secIndex].title.toLowerCase().replace(/\s+/g, '-');

    router.push({
      pathname: '/docs',
      query: { cat: category, sub: subCategory, sec: section }
    }, undefined, { shallow: true });
  };

  const handleNavigation = (catIndex: number, subIndex: number, secIndex: number) => {
    setCurrentCategory(catIndex);
    setCurrentSubCategory(subIndex);
    setCurrentSection(secIndex);
    updateURL(catIndex, subIndex, secIndex);
    setIsNavOpen(false);
  };

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <div className="pt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center text-zinc-400">
          No documentation available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <div className="pt-16 flex min-h-[calc(100vh-4rem)]">
        <div className={`fixed md:relative inset-y-0 left-0 transform ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } w-72 bg-zinc-900 border-r border-zinc-800/50 transition-transform duration-200 ease-in-out overflow-y-auto z-30`}>
          <div className="p-6">
            <div className="relative mb-6 group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-blue-400" />
              <input
                type="text"
                placeholder="Search documentation"
                className="w-full bg-zinc-800 border-none rounded-md pl-9 pr-12 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchResults.length > 0 ? (
              <div className="mb-6 space-y-4">
                <h3 className="text-sm font-medium text-zinc-400 px-2">Search Results</h3>
                {searchResults.map((result, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left pl-4 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    onClick={() => handleNavigation(result.category, result.subCategory, result.section)}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-400">{result.title}</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {result.categoryTitle} / {result.subCategoryTitle}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="mb-6 space-y-4">
                <h3 className="text-sm font-medium text-zinc-400 px-2">No results found</h3>
              </div>
            ) : (
              <nav className="space-y-8">
                {categories.map((category, catIndex) => (
                  <div key={category.title}>
                    <h3 className="text-sm font-bold text-zinc-200 mb-2 px-2">
                      {category.title}
                    </h3>
                    <div className="space-y-4 pl-2">
                      {category.subCategories.map((subCategory, subIndex) => (
                        <div key={subCategory.title}>
                          <h4 className="text-sm font-medium text-zinc-400 mb-1 px-2">
                            {subCategory.title}
                          </h4>
                          <div className="space-y-1">
                            {subCategory.sections.map((section, secIndex) => (
                              <Button
                                key={section.title}
                                variant="ghost"
                                className={`w-full justify-start text-left pl-4 ${
                                  currentCategory === catIndex &&
                                  currentSubCategory === subIndex &&
                                  currentSection === secIndex
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                }`}
                                onClick={() => handleNavigation(catIndex, subIndex, secIndex)}
                              >
                                <ChevronRight className="mr-2 h-4 w-4" />
                                {section.title}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            )}
          </div>
        </div>

        <div className="flex-1">
          <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
            <div className="flex items-center h-16 px-6">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 text-zinc-400 hover:text-white"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 text-zinc-400 overflow-hidden">
                <span className="truncate">{categories[currentCategory]?.title}</span>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{categories[currentCategory]?.subCategories[currentSubCategory]?.title}</span>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-white truncate">
                  {categories[currentCategory]?.subCategories[currentSubCategory]?.sections[currentSection]?.title}
                </span>
              </div>
            </div>
          </header>

          <main className="px-6 py-10">
            <article className="max-w-4xl mx-auto prose prose-invert prose-headings:text-white prose-p:text-zinc-400 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800/50 prose-hr:border-zinc-800/50">
              <ReactMarkdown>{selectedContent}</ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}