import { BlogPost } from "../types/blog";

const generateRssItem = (post: BlogPost): string => `
<item>

<media:content url=${post.images && post.images[0].url} medium="image">
  <guid>https://dev.ibrahimuzun.com/blog/${post.slug}</guid>
  <title>${post.title}</title>
  <link>https://dev.ibrahimuzun.com/blog/${post.slug}</link>
  <description>${post.preview}</description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>
`;

export const generateRss = (posts: BlogPost[]): string => `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Ibrahium Uzun – Blog</title>
  <link>https://dev.ibrahimuzun.com/blog</link>
  <description>En güncel geliştirici içeriklerini bu adresten bulabilirsiniz.</description>
  <language>tr</language>
  <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
  <atom:link href="https://dev.ibrahimuzun.com/api/blog.xml" rel="self" type="application/rss+xml"/>
  ${posts.map(generateRssItem).join("")}
</channel>
</rss>
`;