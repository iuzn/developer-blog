import * as React from 'react'
import { NextSeo } from 'next-seo'
import { NotionRenderer, BlockMapType } from 'react-notion'
import { config } from '../../config'
import Layout from '../../components/layout/index'
import { getBlogTable, getPageBlocks } from '../../core/blog'
import { dateFormatter } from '../../core/utils'
import { BlogPost } from '../../types/blog'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Footer } from '../../components/sections/footer'
import { toNotionImageUrl } from '../../core/notion'
import Header from '../../components/header/header'
import { useRouter } from 'next/router'
import Loading from '../../components/loading'

interface PostProps {
  blocks: BlockMapType
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

  const blocks = await getPageBlocks(post.id)

  return {
    props: {
      post,
      blocks,
      morePosts
    },
    revalidate: 1
  }
}

const BlogPosts: React.FC<PostProps> = ({ post, blocks }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <>
        <Layout>
          <Header title={'Loading'} />
          <div className={'pt-4 flex justify-center'}>
            <Loading />
          </div>
          <div className={'bottom-0'}>
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
          <div className="sm:text-center text-gray-600">
            <time dateTime={new Date(post.date).toISOString()}>
              {dateFormatter.format(new Date(post.date))}
            </time>
          </div>
        </div>
        <article className="flex-1 my-6 post-container">
          <NotionRenderer blockMap={blocks} mapImageUrl={toNotionImageUrl} />
        </article>
        <Footer />
      </Layout>
    </>
  )
}
export default BlogPosts
