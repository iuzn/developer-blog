import { BlogPost } from "../types/blog";
import { Project } from "../types/project";

const EXTERNAL_DATA_URL = 'https://dev.ibrahimuzun.com/';

const generateSitemapBlog = (post: BlogPost,): string => `
<url>
   <loc>${EXTERNAL_DATA_URL+"blog/"+ post.slug}</loc>
</url>
`;
const generateSitemapProject = (project:Project): string => `
<url>
   <loc>${EXTERNAL_DATA_URL+"project/"+ project.slug}</loc>
</url>
`;
export const generateSitemap = (posts: BlogPost[],project:Project[] ): string => `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map(generateSitemapBlog).join("")}
  ${project.map(generateSitemapProject).join("")}
</urlset>`;