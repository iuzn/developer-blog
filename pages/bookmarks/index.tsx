import { NextSeo } from 'next-seo'
import { Footer } from '../../components/sections/footer'
import Header from '../../components/header/header'
import React from 'react'
import Layout from '../../components/layout/index.js'
import { Bookmark } from '../../types/bookmark'
import { GetStaticProps } from 'next'
import { getBlogTable } from '../../core/blog'
import { config } from '../../config'
import { Bookmarks } from '../../components/sections/bookmarks'

interface AppProps {
  bookmark: Bookmark[]
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const bookmark = await getBlogTable<Bookmark>(config.notionBookmarkTableId)

  return {
    props: {
      bookmark: bookmark.filter((post) => post.published)
    },
    revalidate: 10
  }
}

const BookmarksPage = ({ bookmark }: AppProps) => (
  <>
    <NextSeo
      title={'Yer İmleri'}
      titleTemplate={'%s'}
      description="My Bookmarks"
    />

    <Layout>
      <Header />
      <Bookmarks bookmark={bookmark} />
      <Footer />
    </Layout>
  </>
)

export default BookmarksPage
