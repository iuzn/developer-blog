import * as React from 'react'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { NotionAPI } from 'notion-client'
import { NotionRenderer, Code, Collection } from 'react-notion-x'
import { Tweet } from 'react-static-tweets'

import { getBlogTable } from '../core/blog'
import * as types from '../types/othertypes'
import { CustomPage } from '../types/custom-page'

import { config } from '../config'
import Layout from '../components/layout/index'
import { Footer } from '../components/sections/footer'
import Header from '../components/header/header'
import Loading from '../components/loading'

interface PostProps {
  post: CustomPage
  morePosts: CustomPage[]
  recordMap: any
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<CustomPage>(config.notionCustomPageTableId)
  return {
    paths: table.filter((row) => row.published).map((row) => `/${row.slug}`),
    fallback: true
  }
}

const notion = new NotionAPI()

const Pdf = dynamic(() => import('react-notion-x').then((notion) => notion.Pdf))

const Equation = dynamic(() =>
  import('react-notion-x').then((notion) => notion.Equation)
)

const Modal = dynamic(
  () => import('react-notion-x').then((notion) => notion.Modal),
  { ssr: false }
)

export const getStaticProps: GetStaticProps<
  PostProps,
  { pageSlug: string }
> = async ({ params }) => {
  const slug = params?.pageSlug

  if (!slug) {
    throw Error('No slug given')
  }

  const table = await getBlogTable<CustomPage>(config.notionCustomPageTableId)
  const publishedPosts = table.filter((p) => p.published)

  const post = table.find((t) => t.slug === slug)
  const postIndex = publishedPosts.findIndex((t) => t.slug === slug)

  const morePosts = [...publishedPosts, ...publishedPosts].slice(
    postIndex + 1,
    postIndex + 3
  )

  if (!post || (!post.published && process.env.NODE_ENV !== 'development')) {
    throw Error(`Bu adres için gönderi bulunamadı: ${slug}`)
  }
  const recordMap = await notion.getPage(post.id)
  return {
    props: {
      post,
      recordMap,
      morePosts
    },
    revalidate: 10
  }
}

const Post: React.FC<PostProps & types.PageProps> = ({ post, recordMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <>
        <Layout>
          <Header title={'Yükleniyor...'} />
          <div className="m-40 flex content-center justify-center">
            <Loading size={50} />
          </div>
          <div className="bottom-0 fixed self-center">
            <Footer />
          </div>
        </Layout>
      </>
    )
  }
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.preview}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: new Date(post.date).toISOString()
          }
        }}
      />
      <Layout>
        <Header title={post.title} />
        <article className="flex-1 my-6 post-container">
          <NotionRenderer
            components={{
              code: Code,
              collection: Collection,
              tweet: Tweet,
              modal: Modal,
              pdf: Pdf,
              equation: Equation
            }}
            recordMap={recordMap}
          />
        </article>
        <Footer />
      </Layout>
    </>
  )
}
export default Post
