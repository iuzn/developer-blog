export type BookmarkType = "bookmark";

export interface Bookmark {
  id: string;
  title: string;
  types: Bookmark[];
  link: string;
  created: number;
  tags: string[];
  images: {
    name: string;
    url: string;
  }[];
  description: string;
  published: boolean;
}
