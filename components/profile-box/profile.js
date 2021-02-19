import React, { useState } from 'react'
import { IMG } from '../../constants'
import styles from './style.module.css'
import ProfileBox from './profil-box'

function Profile({flat,mobile}) {
  const [isShowProfile, isShowProfileset] = useState(false)

  return (
    <div className={styles.box}>
      {IMG.map((img) => {
        return (
          <div key={img.src}>
            <div>
              <button
                onClick={() => isShowProfileset(!isShowProfile)}
                className={styles.button}
              >
                <img
                  className={styles.image}
                  src={img.src.concat(!flat && '?s=120'|| !mobile && '?s=46' || '?s=36') }
                  alt={img.alt}
                  width={!flat && '120'|| !mobile && '46' || '36'}
                  height={!flat && '120'|| !mobile && '46' || '36'}
                />
              </button>

              {isShowProfile && (
                <ProfileBox mobile={mobile} onClick={() => isShowProfileset(false)} />
              )}
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
export default Profile
