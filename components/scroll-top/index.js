import React, { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

import styles from './style.module.css'
import { ArrowToTop } from '../icons'
import NavigationButton from '../nav/button'

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll()
  const [visible, setVisiblity] = useState(false)

  useEffect(() => {
    if (pageYOffset > 800) {
      setVisiblity(true)
    } else {
      setVisiblity(false)
    }
  }, [pageYOffset])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) {
    return false
  }

  return (
    <div onClick={scrollToTop}>
      <NavigationButton className={styles.icon}>
        <ArrowToTop />
      </NavigationButton>
    </div>
  )
}

export default ScrollToTop
