import React, {useState} from 'react';
import { IMG } from '../../constants'
import styles from './style.module.css'
import ProfileBox from './profil-box';

function Profile() {
    const [isShowProfile, isShowProfileset] = useState(false)

  return (
    <div className={styles.box}>
      {IMG.map((img) => {
        return (
          <div key={img.src}>
            <div>
              <button onClick={() => isShowProfileset(!isShowProfile)} className={styles.button}><img
className={styles.image}
                src={img.src}
                alt={img.alt}
              /></button>

        {isShowProfile && <ProfileBox onClick={() => isShowProfileset(false)} />}

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
