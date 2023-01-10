import type { HTMLAttributes } from 'react'
import cx from 'clsx'

import styles from './Label.module.scss'

export type LabelProps = HTMLAttributes<HTMLSpanElement> & {}

const Label = ({ children, className, ...rest }: LabelProps) => {
  return (
    <span className={cx(styles.label, className)} {...rest}>
      {children}
    </span>
  )
}

Label.displayName = 'Label'

export default Label
