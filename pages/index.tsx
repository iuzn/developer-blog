import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import React from 'react'
import Layout from '../components/layout/'

import { getBlogTable } from '../core/blog'
import Header from '../components/header/header'
import { Blog } from '../components/sections/blog'
import { Footer } from '../components/sections/footer'
import Newsletter from "../components/newsletter"
import { config } from '../config'
import { BlogPost } from '../types/blog'
import { Projects } from '../components/sections/projects'
import { Project } from '../types/project'
import { Bookmarks } from '../components/sections/bookmarks'
import { Bookmark } from '../types/bookmark'

interface AppProps {
  blogpost: BlogPost[]
  project: Project[]
  bookmark: Bookmark[]
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const [blogpost, project, bookmark] = await Promise.all([
    getBlogTable<BlogPost>(config.notionBlogTableId),
    getBlogTable<Project>(config.notionProjectTableId),
    getBlogTable<Bookmark>(config.notionBookmarkTableId)
  ])

  return {
    props: {
      blogpost: blogpost.filter((p) => p.published),
      project: project.filter((p) => p.published),
      bookmark: bookmark.filter((p) => p.published)
    },
    revalidate: 10
  }
}

const HomePage = ({ blogpost, project, bookmark }: AppProps) => (
  <>
    <NextSeo
      title={process.env.NEXT_PUBLIC_BLOG_TITLE}
      titleTemplate={'%s'}
      description={process.env.NEXT_PUBLIC_BLOG_DESCRIPTION}
    />

    <Layout>
      <Header />
      <Blog blogpost={blogpost} preview />
      <Projects project={project} preview />
      <Bookmarks bookmark={bookmark} preview />
      <Newsletter/>
      <Footer />
    </Layout>
  </>
)
export default HomePage
