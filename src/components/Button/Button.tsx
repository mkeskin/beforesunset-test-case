import type { ButtonHTMLAttributes } from 'react'
import cx from 'clsx'

import styles from './Button.module.scss'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'black'
}

const Button = ({
  color = 'black',
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cx(className, styles.button, {
        [styles.black]: color === 'black',
      })}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
