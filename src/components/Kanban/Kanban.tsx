'use client'
import { useMemo } from 'react'

import styles from './Kanban.module.scss'
import { groupBy } from '@utils/array'
import useBookStore from '@store/book'

import SearchForm from './components/SearchForm'
import NoResult from './components/NoResult'
import Columns from './components/Columns'

export type KanbanProps = {}

const Kanban = (props: KanbanProps) => {
  const [books, getBooks] = useBookStore(
    ({ books, getBooks }) => [books, getBooks] as const
  )

  const data = groupBy(books, 'first_publish_year')
  const title = useMemo(() => {
    const authors = books.reduce((values, { author_name }) => {
      for (let author of author_name) {
        values[author] = [values[author]] ? +1 : 1
      }

      return values
    }, {} as { [key: string]: number })

    if (Object.keys(authors).length === 0) return ''

    const [name] = Object.entries(authors).sort(([, a], [, b]) => b - a)[0]
    return name
  }, [books])

  const isHasResult = Object.keys(data).length > 0

  return (
    <div className={styles.kanban}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <SearchForm onFetch={(q: string) => getBooks({ author: q })} />
      </div>
      <div className={styles.content}>
        {isHasResult ? <Columns data={data} /> : <NoResult />}
      </div>
    </div>
  )
}

Kanban.displayName = 'Kanban'

export default Kanban
