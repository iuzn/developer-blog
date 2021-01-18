import { NextSeo } from 'next-seo'
import { Footer } from '../../components/sections/footer'
import Header from '../../components/header/header'
import React from 'react'
import Layout from '../../components/layout/index.js'
import { Project } from '../../types/project'
import { GetStaticProps } from 'next'
import { getBlogTable } from '../../core/blog'
import { config } from '../../config'
import { Projects } from '../../components/sections/projects'

interface AppProps {
  project: Project[]
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const project = await getBlogTable<Project>(config.notionProjectTableId)

  return {
    props: {
      project: project.filter((post) => post.published)
    },
    revalidate: 10
  }
}

const ProjectsPage = ({ project }: AppProps) => (
  <>
    <NextSeo
      title={'Projects'}
      titleTemplate={'%s'}
      description="My Projects"
    />

    <Layout>
      <Header />
      <Projects project={project} />
      <Footer />
    </Layout>
  </>
)

export default ProjectsPage
