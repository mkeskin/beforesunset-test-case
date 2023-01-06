import Image from 'next/image'

import styles from './Header.module.scss'

export type HeaderProps = {}

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/brewww-logo.png"
          alt="brewww"
          width={113}
          height={34}
          data-testid="main-logo"
        />
      </div>
    </div>
  )
}

Header.displayName = 'Main Header'

export default Header
