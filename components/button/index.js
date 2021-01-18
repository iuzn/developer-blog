import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import styles from './style.module.css'

function LinkButton({ href, children, ...props }) {
  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
}
function BaseButton({ children, ...props }) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  )
}

function Button({ children, className, src, alt, ...props }) {
  const Comp = props.href ? LinkButton : BaseButton

  return (
    <Comp className={cn(styles.button, className)} {...props}>
      {children}
    </Comp>
  )
}

export default Button
