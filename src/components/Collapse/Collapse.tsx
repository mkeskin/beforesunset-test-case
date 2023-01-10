'use client'
import type { SVGProps } from 'react'
import { useState, useCallback } from 'react'
import cx from 'clsx'

import styles from './Collapse.module.scss'

export type CollapseProps = {
  expanded?: false
  header: JSX.Element
  content: JSX.Element
  className?: string
}

const ChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.51256 6.5L0.881282 11.1313C0.539573 11.473 0.539573 12.027 0.881282 12.3687C1.22299 12.7104 1.77701 12.7104 2.11872 12.3687L7.36872 7.11872C7.71043 6.77701 7.71043 6.22299 7.36872 5.88128L2.11872 0.631282C1.77701 0.289573 1.22299 0.289573 0.881282 0.631282C0.539573 0.972991 0.539573 1.52701 0.881282 1.86872L5.51256 6.5Z"
        fill="#707090"
      />
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="13">
        <path
          d="M5.51256 6.5L0.881282 11.1313C0.539573 11.473 0.539573 12.027 0.881282 12.3687C1.22299 12.7104 1.77701 12.7104 2.11872 12.3687L7.36872 7.11872C7.71043 6.77701 7.71043 6.22299 7.36872 5.88128L2.11872 0.631282C1.77701 0.289573 1.22299 0.289573 0.881282 0.631282C0.539573 0.972991 0.539573 1.52701 0.881282 1.86872L5.51256 6.5Z"
          fill="white"
        />
      </mask>
    </svg>
  )
}

const Collapse = ({
  expanded = false,
  header,
  content,
  className,
}: CollapseProps) => {
  const [collapsed, setCollapsed] = useState(!expanded)

  const toggleHandler = () => setCollapsed((prev) => !prev)

  const Header = useCallback(() => header, [header])
  const Content = useCallback(() => content, [content])

  return (
    <div
      className={cx(
        styles.collapse,
        {
          [styles.collapsed]: collapsed,
        },
        className
      )}
      data-expanded={!collapsed}
    >
      <div className={styles.header} onClick={toggleHandler} role="button">
        <Header />
        <span className={styles.chevron}>
          <ChevronIcon width={8} height={13} />
        </span>
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  )
}

Collapse.displayName = 'Collapsable Item'

export default Collapse
