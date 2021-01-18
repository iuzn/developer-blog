import React, { useEffect } from 'react'
import cn from 'classnames'
import styles from './col-sidebar.module.css'
import Navigation from '../nav/navigation'
import ProfileBox from '../profile-box/'
import FooterBox from '../footer-box/footer-box'
import { MENU } from '../../constants'
import NavigationButton from '../nav/button'
import { useRouter } from 'next/router'

function Sidebar({ flat }) {
  useEffect(() => {
    let prevScrollpos = window.pageYOffset
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('wrapper').style.bottom = '0'
      } else {
        document.getElementById('wrapper').style.bottom = '-50px'
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
            const selected = router.pathname === menu.path
            return (
              <NavigationButton
                key={menu.key}
                selected={selected}
                href={menu.path}
                className={styles.navButton}
              >
                {selected ? menu.iconSelected : menu.icon}
              </NavigationButton>
            )
          })}
        </nav>
      </div>
      <div className={cn(styles.sidebar)}>
        <div className={styles.profile}>
          <ProfileBox flat={flat} />
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
