import React from 'react'
import { useRouter } from 'next/router'

import { MENU } from '../../constants'
import styles from './navigation.module.css'

import NavigationButton from '../nav/button.js'
import TextTitle from '../title'

function Navigation({ flat }) {
  const router = useRouter()
  return (
    <nav className={styles.nav}>
      {MENU.map((menu) => {
        const showTitle = !flat && menu.title.length > 0
        const selected = router.pathname === menu.path
        return (
          <NavigationButton
            key={menu.key}
            selected={selected}
            href={menu.path}
            className={styles.navButton}
          >
            {selected ? menu.iconSelected : menu.icon}
            {showTitle && <TextTitle>{menu.title}</TextTitle>}
          </NavigationButton>
        )
      })}
    </nav>
  )
}
export default Navigation
