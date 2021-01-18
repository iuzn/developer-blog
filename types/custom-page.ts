export type CustomPageType = "page";

export interface CustomPage {
  id: string;
  preview: string;
  title: string;
  types: CustomPageType[];
  slug: string;
  date: number;
  published: boolean;
}
