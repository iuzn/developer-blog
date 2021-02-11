import * as Icon from '../components/icons'
import React from 'react'


export default {
  TABLET_SIZE: 960,
  DESKTOP_SIZE: 1280
}

export const MENU= [
  {
    key: 'giris',
    path: '/',
    icon: <Icon.Home />,
    iconSelected: <Icon.HomeFilled />,
    title: 'Ana Sayfa'
  },
  {
    key: 'blog',
    path: '/blog',
    icon: <Icon.Blog />,
    iconSelected: <Icon.BlogFilled />,
    title: 'Blog'
  },
  {
    key: 'projeler',
    path: '/projeler',
    icon: <Icon.Projeler />,
    iconSelected: <Icon.ProjelerFilled />,
    title: 'Projeler'
  },
  {
    key: 'hakkimda',
    path: '/hakkimda',
    icon: <Icon.Kimdir />,
    iconSelected: <Icon.KimdirFilled />,
    title: 'Hakkımda'
  },
  {
    key: 'iletisim',
    path: '/iletisim',
    icon: <Icon.Iletisim />,
    iconSelected: <Icon.IletisimFilled />,
    title: 'İletişim'
  },
  {
    key: 'yer-imleri',
    path: '/yer-imleri',
    icon: <Icon.Tezgah />,
    iconSelected: <Icon.TezgahFilled />,
    title: 'Yer imleri'
  }
]




export const IMG = [
  {
    src: process.env.NEXT_PUBLIC_AVATAR_URL,
    name: process.env.NEXT_PUBLIC_NAME,
    alt: process.env.NEXT_PUBLIC_NAME
  }
]
