import React, { useState } from 'react'
import styles from './style.module.css'
import ProfileBox from './profil-box'
import { config } from '../../config'
import useWindowSize from '../../Hooks/useWindowSize'
import CONST from '../../constants'

function Profile() {
  const [isShowProfile, isShowProfileset] = useState(false)
  const windowsize = useWindowSize()
  const ismobile = windowsize.width < CONST.TABLET_SIZE
  const istablet = windowsize.width < CONST.DESKTOP_SIZE
  let size
  !istablet ? (size = '120') : !ismobile ? (size = '46') : (size = '36')
  const source = config.avatarUrl.concat(`?s=${size}`)
  const name = config.publicName

  return (
    <div key={name} className={styles.box}>
      <button
        onClick={() => isShowProfileset(!isShowProfile)}
        className={styles.button}
      >
        <img
          className={styles.image}
          src={source}
          alt={name}
          width={size}
          height={size}
        />
        <h2 className={styles.title}>{name}</h2>
        <h2 className={styles.hiddentitle}>{name}</h2>
      </button>
      {isShowProfile && <ProfileBox onClick={() => isShowProfileset(false)} />}
    </div>
  )
}
export default Profile
