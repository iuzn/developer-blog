import React, { useEffect } from 'react'
import cn from 'classnames'
import styles from './col-sidebar.module.css'
import Navigation from '../nav/navigation'
import Profile from '../profile-box/profile'
import FooterBox from '../footer-box/footer-box'
import { MENU } from '../../constants'
import NavigationButton from '../nav/button'
import { useRouter } from 'next/router'

function Sidebar({ flat, mobile }) {
  useEffect(() => {
    let prevScrollpos = window.pageYOffset
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('wrapper').style.bottom = '0'
      } else {
        document.getElementById('wrapper').style.bottom = '-80px'
      }
      if (prevScrollpos === currentScrollPos) {
        document.getElementById('wrapper').style.bottom = '0'
      }
      prevScrollpos = currentScrollPos
    }
  })

  const router = useRouter()

  return (
    <div>
      <div id={'wrapper'} className={styles.wrapper}>
        <nav className={styles.nav}>
          {MENU.map((menu) => {
            const selected = router.asPath === menu.path
            return (
              <NavigationButton
                alt={menu.title}
                key={menu.key}
                selected={selected}
                href={menu.path}
                className={styles.navButton}
              >
                {selected ? menu.iconSelected : menu.icon}
                {menu.title}
                <span className={styles.hiddentext}>{menu.title}</span>
              </NavigationButton>
            )
          })}
        </nav>
      </div>
      <div className={cn(styles.sidebar)}>
        <div className={styles.profile}>
          <Profile flat={flat} mobile={mobile} />
        </div>
        <div className={styles.navigation}>
          <Navigation flat={flat} />
        </div>
        <div className={styles.footer}>
          <FooterBox flat={flat} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
