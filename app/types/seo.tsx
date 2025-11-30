export interface SEOData1 {
  id: string;
  serviceName: string;
  canonicalTag: string;
  contentInsertURL: string;
  faqSection: { question: string; answer: string }[];
  h1: string;
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  imageAltText: string;
  imageTitle: string;
  keywords: string[];
  metaDescription: string;
  metaTitle: string;
  urlSlug: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  isactive: boolean;
}

export interface BlogPost1 {
  id: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  publishDate: string;
  location: string;
  urlSlug: string;
  h1: string;
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  keywords: string[];
  category: string;
  subCategory: string;
  imageLink: string;
  imageTitle: string;
  imageAltText: string;
  imageAlignment: "left" | "center" | "right";
  uploadedImages: { url: string; name: string; alt: string }[];
  content: string;
  tableData: { headers: string[]; rows: string[][] };
  faqSection: { question: string; answer: string }[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}