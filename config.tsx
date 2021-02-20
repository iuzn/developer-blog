export const config = {
  notionBlogTableId: (process.env.NEXT_PUBLIC_BLOG_ID as string),
  notionProjectTableId: (process.env.NEXT_PUBLIC_PROJECT_ID as string),
  notionCustomPageTableId: (process.env.NEXT_PUBLIC_CUSTOM_PAGE_ID as string),
  notionBookmarkTableId: (process.env.NEXT_PUBLIC_BOOKMARK_ID as string),
  avatarUrl: (process.env.NEXT_PUBLIC_AVATAR_URL as string),
  publicName: (process.env.NEXT_PUBLIC_NAME as string),
};
