export interface INewsCreate {
  title: string;
  text: string;
  picture?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export interface INews {
  id: string;
  title: string;
  text: string;
  picture?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
