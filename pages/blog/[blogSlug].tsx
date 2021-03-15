import * as React from 'react'
import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { NotionRenderer, Code, Collection } from 'react-notion-x'
import { NotionAPI } from 'notion-client'
import { Tweet } from 'react-static-tweets'

import { getBlogTable } from '../../core/blog'
import { dateFormatter } from '../../core/utils'

import { BlogPost } from '../../types/blog'
import { config } from '../../config'
import { toNotionImageUrl } from '../../core/notion'
import { Footer } from '../../components/sections/footer'
import Layout from '../../components/layout/index'
import Header from '../../components/header/header'
import Loading from '../../components/loading'
import { ReactUtterances } from '../../components/comments'
import {Blog} from "../../components/sections/blog";

interface PostProps {
  post: BlogPost
  morePosts: BlogPost[]
}
export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<BlogPost>(config.notionBlogTableId)
  return {
    paths: table
      .filter((row) => row.published)
      .map((row) => `/blog/${row.slug}`),
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
  { blogSlug: string }
> = async ({ params }) => {
  const slug = params?.blogSlug

  if (!slug) {
    throw Error('No slug given')
  }

  const table = await getBlogTable<BlogPost>(config.notionBlogTableId)
  const publishedPosts = table.filter((p) => p.published)

  const post = table.find((t) => t.slug === slug)
  const postIndex = publishedPosts.findIndex((t) => t.slug === slug)

  const morePosts = [...publishedPosts, ...publishedPosts].slice(
    postIndex + 1,
    postIndex + 3
  )

  if (!post || (!post.published && process.env.NODE_ENV !== 'development')) {
    throw Error(`Failed to find post for slug: ${slug}`)
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
interface recordMapProps {
  recordMap: any
}


const BlogPosts: React.FC<PostProps & recordMapProps> = ({ post,morePosts, recordMap }) => {

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  useEffect(() => {
    const acc = document.getElementsByClassName('accordion')
    let i
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active')
        const panel = this.nextElementSibling
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px'
        }
      })
    }
  })
  const router = useRouter()
            console.log(router.asPath)
            console.log(post.slug)
let comments: React.ReactNode = null
  if (config.utterancesGitHubRepo) {
      comments = (
          <div className="w-full">
          <button
            onClick={toggle}
            type="button"
            id="yorum"
            className={!modal ? 'accordion' : 'accordion-open'}
          >Yorumlar</button>
          <div className={!modal ? 'panel' : 'panel-active'}>
             <ReactUtterances
          repo={config.utterancesGitHubRepo}
              issueMap="issue-term"
              issueTerm="title"
            />
          </div>
        </div>
      )
    }


            console.log(`${"/blog/" + post.slug}`)
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
          images: post.images?.[0] && [
            {
              url: toNotionImageUrl(post.images[0].url),
              width: 320,
              height: 210
            }
          ],
          article: {
            publishedTime: new Date(post.date).toISOString(),
            tags: post.tags
          }
        }}
        titleTemplate="%s – Blog"
      />
      <Layout>
        <Header title={'Blog'} />
        <div className="my-8 w-full max-w-3xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold sm:text-center mb-2">
            {post.title}
          </h1>
          <div className="sm:text-center">
            <time dateTime={new Date(post.date).toISOString()}>
              {dateFormatter.format(new Date(post.date))}
            </time>
          </div>
        </div>
        <article className="flex-1 my-6 post-container p-4">
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
            pageFooter={comments}
          />
          <br/>
            <Blog suggested blogpost={morePosts}  />
          <Footer />
        </article>
      </Layout>
    </>
  )
}
export default BlogPosts
