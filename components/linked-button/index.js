import React from 'react'
import cn from 'classnames'
import Button from '../button'
import styles from './style.module.css'
import TextTitle from '../title'

function LinkedButton({ href, selected, children, className, ...props }) {
  return (
    <Button className={cn(styles.navButton, className)} href={href} {...props}>
      <TextTitle>{children}</TextTitle>
    </Button>
  )
}
export default LinkedButton
