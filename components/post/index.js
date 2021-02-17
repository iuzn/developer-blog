import React from 'react'
import styles from './style.module.css'

function Blogpost({ video }) {
  return (
    <article className={styles.post}>
      <div className={styles.video}>
        <iframe
          src="https://www.youtube.com/embed/qOrA83g3Sj0"
          frameBorder="0"
          allowFullScreen
        >
          {video}
        </iframe>
      </div>
      <div className={styles.article}>
        <h1 className={styles.title}>Başlık</h1>
        <div className={styles.text}>
        </div>
        <a className={styles.footer}>Devam et</a>
      </div>
    </article>
  )
}

export default Blogpost
