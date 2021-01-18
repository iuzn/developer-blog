import * as Icon from '../components/icons'
import React from 'react'

export default {
  TABLET_SIZE: 960,
  DESKTOP_SIZE: 1280
}
export const MENU = [
  {
    key: 'home',
    path: '/',
    icon: <Icon.Home />,
    iconSelected: <Icon.HomeFilled />,
    title: 'Home'
  },
  {
    key: 'blog',
    path: '/blog',
    icon: <Icon.Blog />,
    iconSelected: <Icon.BlogFilled />,
    title: 'Blog'
  },
  {
    key: 'projects',
    path: '/projects',
    icon: <Icon.Projeler />,
    iconSelected: <Icon.ProjelerFilled />,
    title: 'Projects'
  },
  {
    key: 'about',
    path: '/about',
    icon: <Icon.Kimdir />,
    iconSelected: <Icon.KimdirFilled />,
    title: 'About'
  },
  {
    key: 'contact',
    path: '/contact',
    icon: <Icon.Iletisim />,
    iconSelected: <Icon.IletisimFilled />,
    title: 'Contact'
  }
]

export const IMG = [
  {
    src: process.env.NEXT_PUBLIC_AVATAR_URL,
    name: process.env.NEXT_PUBLIC_NAME,
    alt: process.env.NEXT_PUBLIC_NAME
  }
]
