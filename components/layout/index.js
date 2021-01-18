import React from 'react'
import cn from 'classnames'

import useWindowSize from '../../Hooks/useWindowSize'
import styles from './style.module.css'

import Sidebar from '../col/col-sidebar'
import CONST from '../../constants'
import Main from '../col/col-main'
import ScrollToTop from '../scroll-top'

function Layout({ children }) {
  const size = useWindowSize()
  return (
    <div className={cn(styles.layout)}>
      <Sidebar flat={size.width < CONST.DESKTOP_SIZE}>sidebar</Sidebar>

      <Main>
        {children}

        <ScrollToTop />
      </Main>
    </div>
  )
}
export default Layout
