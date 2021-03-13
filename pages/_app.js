import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import StoreContext from '../store'
import '../assets/styles/main.css'
import '../assets/styles/prism.css'
import '../styles/app.css'
function MyApp({ Component, pageProps }) {
  const siteTitle = process.env.NEXT_PUBLIC_BLOG_TITLE
  const [theme, themeSet] = useState(null)
  const [font, fontSet] = useState(null)

  useEffect(() => {
    const theme = localStorage.getItem('THEME') || 'system'
    themeSet(theme)
  }, [])

  useEffect(() => {
    const font = localStorage.getItem('FONT') || 'sansserif'
    fontSet(font)
  }, [])

  const changeFont = (font) => {
    fontSet(font)
    localStorage.setItem('FONT', font)
  }

  const changeTheme = (theme) => {
    themeSet(theme)
    localStorage.setItem('THEME', theme)
  }
  const isSystem = theme === 'system'

  useEffect(() => {
    document.documentElement.lang = 'tr'
    if (!theme) return
    const $html = document.querySelector('html')
    $html.classList.remove('system')
    $html.classList.remove('light')
    $html.classList.remove('dim')
    $html.classList.remove('sepia')
    $html.classList.remove('dark')
    $html.classList.add(theme.toString())
    if (isSystem) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', (e) => {
            if (e.matches) {
              $html.classList.remove('light')
              $html.classList.add('dark')
            } else {
              $html.classList.remove('dark')
              $html.classList.add('light')
            }
          })
        $html.classList.add('dark')
      } else {
        window
          .matchMedia('(prefers-color-scheme: light)')
          .addEventListener('change', (e) => {
            if (e.matches) {
              $html.classList.remove('dark')
              $html.classList.add('light')
            } else {
              $html.classList.remove('light')
              $html.classList.add('dark')
            }
          })
        $html.classList.add('light')
      }
    }
  })


  useEffect(() => {
    if (!font) return
    const $html = document.querySelector('html')
    $html.classList.remove('sansserif')
    $html.classList.remove('serif')
    $html.classList.add(font.toString())
  })


  return (
    <StoreContext.Provider
      value={{ siteTitle, theme, changeTheme, font, changeFont }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_FAVICON_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
      </Head>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}
export default MyApp
