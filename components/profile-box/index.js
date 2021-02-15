import React from 'react'
import { IMG } from '../../constants'
import styles from './style.module.css'

function ProfileBox() {
  return (
    <div className={styles.box}>
      {IMG.map((img) => {
        return (
          <div key={img.src} className={styles.photo}>
            <div>
              <img
                className={styles.image}
                src={img.src}
                alt={img.alt}
              />
            </div>

            <div>
              <h2 className={styles.title}>{img.name}</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ProfileBox
