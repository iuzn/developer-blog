import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import { Blog } from '../../components/sections/blog'
import { Footer } from '../../components/sections/footer'
import { getBlogTable } from '../../core/blog'
import { config } from '../../config'
import Header from '../../components/header/header'
import React from 'react'
import Layout from '../../components/layout/index.js'
import { BlogPost } from '../../types/blog'

interface AppProps {
  blogpost: BlogPost[]
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const blogpost = await getBlogTable<BlogPost>(config.notionBlogTableId)

  return {
    props: {
      blogpost: blogpost.filter((post) => post.published)
    },
    revalidate: 10
  }
}

const BlogPage = ({ blogpost }: AppProps) => (
  <>
    <NextSeo title={'Blog'} titleTemplate={'%s'} description="My Blog" />

    <Layout>
      <Header />
      <Blog blogpost={blogpost} />
      <Footer />
    </Layout>
  </>
)

export default BlogPage
