import { BlogPost } from "../types/blog";
import { Project } from "../types/project";

const EXTERNAL_DATA_URL = 'https://dev.ibrahimuzun.com/';

const generateSitemapBlog = (post: BlogPost,): string => `
<url>
   <loc>${EXTERNAL_DATA_URL+"blog/"+post.slug}</loc>
   <lastmod>${post.date}</lastmod>
</url>
`;
const generateSitemapProject = (project:Project): string => `
<url>
   <loc>${EXTERNAL_DATA_URL+"project/"+project.slug}</loc>
   <lastmod>${project.date}</lastmod>
</url>
`;
export const generateSitemap = (posts: BlogPost[],project:Project[] ): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map(generateSitemapBlog).join("")}
  ${project.map(generateSitemapProject).join("")}
</urlset>`;