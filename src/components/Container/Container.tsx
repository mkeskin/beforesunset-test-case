import styles from './Container.module.scss'

export type ContainerProps = {
  children?: JSX.Element
}

const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>
}

Container.displayName = 'Container'

export default Container
