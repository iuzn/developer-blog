import * as React from 'react'
import { NextSeo } from 'next-seo'
import { NotionRenderer, BlockMapType } from 'react-notion'
import { config } from '../../config'
import Layout from '../../components/layout/index'
import { getBlogTable, getPageBlocks } from '../../core/blog'
import { Project } from '../../types/project'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Footer } from '../../components/sections/footer'
import { toNotionImageUrl } from '../../core/notion'
import Header from '../../components/header/header'
import { useRouter } from 'next/router'
import Loading from '../../components/loading'

interface PostProps {
  blocks: BlockMapType
  project: Project
  moreProject: Project[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Project>(config.notionProjectTableId)
  return {
    paths: table
      .filter((row) => row.published)
      .map((row) => `/projects/${row.slug}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<
  PostProps,
  { projectSlug: string }
> = async ({ params }) => {
  const slug = params?.projectSlug

  if (!slug) {
    throw Error('No slug given')
  }

  const table = await getBlogTable<Project>(config.notionProjectTableId)
  const publishedProject = table.filter((p) => p.published)

  const project = table.find((t) => t.slug === slug)
  const projectIndex = publishedProject.findIndex((t) => t.slug === slug)

  const moreProject = [...publishedProject, ...publishedProject].slice(
    projectIndex + 1,
    projectIndex + 3
  )

  if (
    !project ||
    (!project.published && process.env.NODE_ENV !== 'development')
  ) {
    throw Error(`Failed to find post for slug: ${slug}`)
  }

  const blocks = await getPageBlocks(project.id)

  return {
    props: {
      project,
      blocks,
      moreProject
    },
    revalidate: 1
  }
}

const BlogPosts: React.FC<PostProps> = ({ project, blocks }) => {
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
        title={project.title}
        description={project.preview}
        openGraph={{
          type: 'article',
          images: project.images?.[0] && [
            {
              url: toNotionImageUrl(project.images[0].url),
              width: 320,
              height: 210
            }
          ],
          article: {
            publishedTime: new Date(project.date).toISOString(),
            tags: project.tags
          }
        }}
        titleTemplate="%s"
      />
      <Layout>
        <Header title={'Projects'} />

        <div className="my-8 w-full max-w-3xl mx-auto px-4">
          {project.images && project.images[0] && (
            <img
              className={'mx-auto pb-6'}
              src={toNotionImageUrl(project.images[0].url)}
              alt={project.title}
            />
          )}
          <h1 className="text-2xl md:text-3xl font-bold sm:text-center mb-2">
            {project.title}
          </h1>
          <div className="sm:text-center text-gray-600"></div>
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
