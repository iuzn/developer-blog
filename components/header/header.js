import React, { useState } from 'react'
import cn from 'classnames'

import styles from './header.module.css'
import ModSelect from '../mod-select'
import HeaderText from './header-text'
import { MENU } from '../../constants'
import { useRouter } from 'next/router'
import Button from '../button'
import { ModFilled } from '../icons'
import Profile from '../profile-box/profile';
import { config } from '../../config'

function Header(props) {
  const router = useRouter()
  const [isShowMod, isShowModset] = useState(false)
  return (
    <div className={cn(styles.header)}>
      <div className={styles.profile}>
        <Profile/>
      </div>
      <div className={styles.headertext}>
        {MENU.map((menu) => {
          const selected = router.pathname === menu.path
          return (
            <HeaderText key={menu.title} selected={false}>
              {selected && menu.title}
            </HeaderText>
          )
        })}
        <HeaderText>{props.title}</HeaderText>
      </div>
      <div className={styles.modselect}>
        <Button
            alt="Temayı değiştir."
          className={styles.buton}
          onClick={() => isShowModset(!isShowMod)}
        >Temayı Değiştir<span  className={styles.hiddentext}>
          Temayı Değiştir
        </span>
          <ModFilled />
        </Button>
        {isShowMod && <ModSelect onClick={() => isShowModset(false)} />}
      </div>
    </div>
  )
}
export default Header
