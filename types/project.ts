export type ProjectType = "project";

export interface Project {
  id: string;
  preview: string;
  title: string;
  types: Project[];
  images: {
    name: string;
    url: string;
  }[];
  tags: string[];
  slug: string;
  date: number;
  published: boolean;
}