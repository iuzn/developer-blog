import React, { useState } from 'react'
import styles from './style.module.css'
import ProfileBox from './profil-box'
import { config } from '../../config'

function Profile() {
  const [isShowProfile, isShowProfileset] = useState(false)
  const name = config.publicName
  return (
    <div key={name} className={styles.box}>
      <button
        onClick={() => isShowProfileset(!isShowProfile)}
        className={styles.button}
      >
        <img
          className={styles.tabletImage}
          src={config.avatarUrl.concat(`?s=72`)}
          alt={name}
          width={46}
          height={46}
        />
        <img
          className={styles.desktopImage}
          src={config.avatarUrl.concat(`?s=120`)}
          alt={name}
          width={120}
          height={120}
        />
        <h2 className={styles.title}>{name}</h2>
        <h2 className={styles.hiddentitle}>{name}</h2>
      </button>
      {isShowProfile && <ProfileBox onClick={() => isShowProfileset(false)} />}
    </div>
  )
}
export default Profile
