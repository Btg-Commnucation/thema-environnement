export type PageType<T> = {
  title: string;
  id: number;
  slug: string;
  permalink: string;
  date: string;
  content: string;
  author: string;
  author_id: number;
  acf: T;
  yoast: {
    yoast_wpseo_metadesc: string;
    yoast_wpseo_title: string;
  };
  media:
    | {
        large: string;
        medium: string;
        small: string;
      }
    | boolean;
};
