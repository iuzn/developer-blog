import * as React from 'react'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { NotionAPI } from 'notion-client'
import { NotionRenderer, Code, Collection } from 'react-notion-x'
import { Tweet } from 'react-static-tweets'
import { toNotionImageUrl } from '../../core/notion'

import { getBlogTable } from '../../core/blog'
import { dateFormatter } from '../../core/utils'
import * as types from '../../types/othertypes'
import { Project } from '../../types/project'

import { config } from '../../config'
import Layout from '../../components/layout/index'
import { Footer } from '../../components/sections/footer'
import Header from '../../components/header/header'
import Loading from '../../components/loading'

interface PostProps {
  project: Project
  moreProject: Project[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Project>(config.notionProjectTableId)
  return {
    paths: table
      .filter((row) => row.published)
      .map((row) => `/projeler/${row.slug}`),
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
  { projelerSlug: string }
> = async ({ params }) => {
  const slug = params?.projelerSlug

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

  const recordMap = await notion.getPage(project.id)

  return {
    props: {
      project,
      recordMap,
      moreProject
    },
    revalidate: 10
  }
}

const ProjectPosts: React.FC<PostProps & types.PageProps> = ({
  project,
  recordMap
}) => {
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
        <Header title={'Projeler'} />

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
          <div className="sm:text-center text-gray-600">
            {dateFormatter.format(new Date(project.date))}{' '}
          </div>
        </div>
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
export default ProjectPosts
