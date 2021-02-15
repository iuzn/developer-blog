import React from 'react'
import cn from 'classnames'
import styles from './style.module.css'

function TextTitle({  children }) {
  return <h2 className={cn([styles.title, styles.bold])}>{children}</h2>
}
export default TextTitle
