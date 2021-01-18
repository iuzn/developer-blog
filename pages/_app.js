import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import StoreContext from '../store'
import '../assets/styles/main.css'
import '../assets/styles/prism.css'
import '../styles/app.css'

export default function MyApp({ Component, pageProps }) {
  const siteTitle = process.env.NEXT_PUBLIC_BLOG_TITLE
  const [theme, themeSet] = useState(null)

  useEffect(() => {
    const theme = localStorage.getItem('THEME') || 'light'
    themeSet(theme)
  }, [])

  const changeTheme = (theme) => {
    themeSet(theme)
    localStorage.setItem('THEME', theme)
  }

  useEffect(() => {
    if (!theme) return
    const $html = document.querySelector('html')
    $html.classList.remove('light')
    $html.classList.remove('dim')
    $html.classList.remove('dark')
    $html.classList.remove('sepia')
    $html.classList.add(theme.toString())
  }, [theme])

  return (
    <StoreContext.Provider value={{ siteTitle, theme, changeTheme }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;800&family=Source+Serif+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_FAVICON_URL} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,
     user-scalable=0"
        />
        <title>{siteTitle}</title>
      </Head>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}
