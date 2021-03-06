import * as Icon from '../components/icons'
import React from 'react'


export default {
  TABLET_SIZE: 850,
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
export const LINK = [

      {
    key: 'instagram',
    href: 'https://www.instagram.com/ibrahimuzuncom',
    icon: <Icon.Instagram/>,
    title: 'Instagram'
  },
      {
    key: 'twitter',
    href: 'https://www.twitter.com/ibrahimuzn',
    icon: <Icon.Twitter/>,
    title: 'Twitter'
  },
      {
    key: 'Linkedin',
    href: 'https://www.linkedin.com/in/ibuzn',
    icon: <Icon.Linkedin/>,
    title: 'Linkedin'
  },
      {
    key: 'github',
    href: 'https://www.github.com/iuzn',
    icon: <Icon.Github/>,
    title: 'Github'
  },
      {
    key: 'figma',
    href: 'https://www.figma.com/@ibrahim',
    icon: <Icon.Figma/>,
    title: 'Figma'
  },
]