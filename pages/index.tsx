import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import React from 'react'
import Layout from '../components/layout/'
import Header from '../components/header/header'
import { Blog } from '../components/sections/blog'
import { Footer } from '../components/sections/footer'
import { getBlogTable } from '../core/blog'
import { config } from '../config'
import { BlogPost } from '../types/blog'
import { Projects } from '../components/sections/projects'
import { Project } from '../types/project'

interface AppProps {
  blogpost: BlogPost[]
  project: Project[]
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const [blogpost, project] = await Promise.all([
    getBlogTable<BlogPost>(config.notionBlogTableId),
    getBlogTable<Project>(config.notionProjectTableId)
  ])

  return {
    props: {
      blogpost: blogpost.filter((p) => p.published),
      project: project.filter((p) => p.published)
    },
    revalidate: 1
  }
}

const HomePage = ({ blogpost, project }: AppProps) => (
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
      <Footer />
    </Layout>
  </>
)
export default HomePage
