type CookieConsentStatus = 'accepted' | 'declined' | undefined

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