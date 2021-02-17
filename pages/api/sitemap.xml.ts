import { NextApiRequest, NextApiResponse } from "next";
import { generateSitemap } from "../../core/sitemap";
import { getBlogTable } from "../../core/blog";
import { BlogPost } from "../../types/blog";
import { Project } from "../../types/project";
import { config } from "../../config";

export default  async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getBlogTable<BlogPost>(config.notionBlogTableId);
  const projects = await getBlogTable<Project>(config.notionProjectTableId);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.send(generateSitemap(posts,projects));
};