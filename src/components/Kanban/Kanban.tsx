'use client'
import {
  CSSProperties,
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  SVGProps,
} from 'react'
import { useState, useMemo } from 'react'

import styles from './Kanban.module.scss'
import Button from '@components/Button'
import Label from '@components/Label'
import Collapse from '@components/Collapse'
import Loading from '@components/Loading'
import debounce from '@utils/debounce'
import { groupBy } from '@utils/array'
import { pluralize } from '@utils/string'
import { random as randomColor } from '@utils/color'
import useBookStore from '@store/book'

// https://openlibrary.org/search.json?author=OL26320A&language=eng&fields=key,title,title_suggest,edition_count,first_publish_year,number_of_pages_median,author_name&mode=everything

export type KanbanProps = {}

type KanbanColumnProps = {
  className?: string
  children: ReactNode
  style?: CSSProperties & {
    '--color': string
  }
}

const StackIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.07524 0.82678C8.8705 0.724407 8.6295 0.724407 8.42476 0.82678L1.15218 4.46314C0.616153 4.73116 0.616153 5.49611 1.15218 5.76413L8.42476 9.40049C8.6295 9.50287 8.8705 9.50287 9.07524 9.40049L16.3478 5.76413C16.8838 5.49611 16.8838 4.73116 16.3478 4.46314L9.07524 0.82678ZM3.10362 5.11364L8.75 2.29039L14.3964 5.11364L8.75 7.93688L3.10362 5.11364ZM1.80266 11.7359C1.44341 11.5562 1.00656 11.7019 0.826938 12.0611C0.647313 12.4204 0.792928 12.8572 1.15218 13.0369L8.42476 16.6732C8.6295 16.7756 8.8705 16.7756 9.07524 16.6732L16.3478 13.0369C16.7071 12.8572 16.8527 12.4204 16.6731 12.0611C16.4934 11.7019 16.0566 11.5562 15.6973 11.7359L8.75 15.2096L1.80266 11.7359ZM0.826938 8.42475C1.00656 8.0655 1.44341 7.91988 1.80266 8.09951L8.75 11.5732L15.6973 8.09951C16.0566 7.91988 16.4934 8.0655 16.6731 8.42475C16.8527 8.78401 16.7071 9.22086 16.3478 9.40049L9.07524 13.0369C8.8705 13.1392 8.6295 13.1392 8.42476 13.0369L1.15218 9.40049C0.792928 9.22086 0.647313 8.78401 0.826938 8.42475Z"
        fill="#aaaaaa"
      />
    </svg>
  )
}

const ReadingIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0038 9.5839V8.00406C16.0038 7.729 15.7808 7.506 15.5058 7.506C14.4769 7.506 13.5177 7.59283 12.6114 7.77014C12.0831 7.25996 11.4391 6.88981 10.7416 6.6875C11.5021 6.04743 11.9863 5.08906 11.9863 4.0196C11.9863 2.07887 10.4223 0.5 8.49995 0.5C6.57759 0.5 5.01363 2.07887 5.01363 4.0196C5.01363 5.08906 5.4978 6.04743 6.25831 6.68746C5.56088 6.88981 4.91684 7.25996 4.38855 7.77011C3.48227 7.59283 2.52303 7.50597 1.49414 7.50597C1.21908 7.50597 0.996092 7.72897 0.996092 8.00403V9.58386C0.4164 9.78946 0 10.3431 0 10.9924V11.9885C0 12.6378 0.4164 13.1914 0.996092 13.397V14.9768C0.996092 15.2519 1.21908 15.4749 1.49414 15.4749C4.09822 15.4749 6.2366 16.0919 8.22373 17.4167C8.39025 17.5276 8.60959 17.5279 8.77627 17.4167C10.7634 16.0919 12.9017 15.4749 15.5059 15.4749C15.7809 15.4749 16.0039 15.2519 16.0039 14.9768V13.397C16.5836 13.1914 17 12.6378 17 11.9885V10.9924C16.9999 10.3431 16.5835 9.78949 16.0038 9.5839ZM6.00977 4.01958C6.00977 2.62811 7.12688 1.49609 8.5 1.49609C9.87311 1.49609 10.9902 2.62811 10.9902 4.01958C10.9902 5.39273 9.87311 6.50987 8.5 6.50987C7.12688 6.50987 6.00977 5.39273 6.00977 4.01958ZM0.996094 11.9885C0.996094 12.2631 1.21952 12.4866 1.49414 12.4866C1.76876 12.4866 1.99219 12.2631 1.99219 11.9885V10.9924C1.99219 10.7178 1.76876 10.4943 1.49414 10.4943C1.21952 10.4943 0.996094 10.7178 0.996094 10.9924V11.9885ZM8.00194 16.1086C6.19394 15.0746 4.25378 14.552 1.99219 14.486V13.397C2.57188 13.1914 2.98828 12.6378 2.98828 11.9885V10.9924C2.98828 10.3431 2.57188 9.78949 1.99219 9.58389V8.50915C4.33237 8.57632 6.21343 9.12741 8.00194 10.2662V16.1086ZM5.60251 8.07118C6.62397 8.38154 7.58081 8.82318 8.50007 9.40322C9.4193 8.82318 10.3762 8.38154 11.3976 8.07118C10.8364 7.70641 10.1757 7.50599 9.49617 7.50599H7.50398C6.82448 7.50599 6.16377 7.70641 5.60251 8.07118ZM15.0078 14.486C12.7462 14.552 10.806 15.0747 8.99805 16.1087V10.2666C10.7866 9.12771 12.6675 8.57629 15.0078 8.50915V9.58389C14.4281 9.78949 14.0117 10.3431 14.0117 10.9924V11.9885C14.0117 12.6378 14.4281 13.1914 15.0078 13.397V14.486ZM15.5059 12.4866C15.7805 12.4866 16.0039 12.2631 16.0039 11.9885V10.9924C16.0039 10.7178 15.7805 10.4943 15.5059 10.4943C15.2312 10.4943 15.0078 10.7178 15.0078 10.9924V11.9885C15.0078 12.2631 15.2312 12.4866 15.5059 12.4866Z"
        fill="#aaaaaa"
      />
    </svg>
  )
}

/**
 * Formats a word usign with number as a plural string.
 *
 * @param {string} word - The word to pluralize
 * @param {number} total - The total number of items
 * @return {string} The formatted string
 */
const plural = (word: string, total: number): string =>
  total < 2 ? `${total} ${word}` : `${total} ${pluralize(word)}`

const SearchForm = ({ onFetch }) => {
  const [processing, setProcessing] = useState(false)
  const [query, setQuery] = useState('')

  const onChangeInput = debounce(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = target.value.trim()
      setQuery(value)
    }
  )

  const onSubmitButton: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setProcessing(true)

    new Promise((resolve, reject) => {
      onFetch(query).then(() => {
        resolve({})
      })
    }).then(() => {
      setProcessing(false)
    })
  }

  return (
    <>
      <span>books of</span>
      <input className={styles.input} onChange={onChangeInput} />
      <Button
        onClick={onSubmitButton}
        disabled={processing}
        style={{
          cursor: processing ? 'progress' : 'cursor',
        }}
      >
        submit
      </Button>
      <Loading show={processing} />
    </>
  )
}

const KanbanColumn = ({ children, ...rest }: KanbanColumnProps) => {
  return <div {...rest}>{children}</div>
}

KanbanColumn.displayName = 'Kanban Column'

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

  return (
    <div className={styles.kanban}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles['search-form']}>
          <SearchForm onFetch={(q: string) => getBooks({ author: q })} />
        </div>
      </div>
      <div className={styles.columns}>
        {Object.entries(data).map(([year, items]) => (
          <KanbanColumn
            className={styles.column}
            style={{ '--color': randomColor() }}
            key={year}
          >
            <div className={styles.cards}>
              <span className={styles.title}>{year}</span>
              {items.map(
                ({
                  key,
                  title_suggest,
                  edition_count,
                  first_publish_year,
                  number_of_pages_median,
                }) => (
                  <div className={styles.card} key={key}>
                    <Collapse
                      className={styles.collapse}
                      header={
                        <div className={styles.heading}>{title_suggest}</div>
                      }
                      content={
                        <div
                          style={{
                            padding: '15px 10px',
                          }}
                        >
                          <div className={styles['info-publishing']}>
                            <Label>{plural('Edition', edition_count)}</Label>
                            <span>First Published: {first_publish_year}</span>
                          </div>
                          <div className={styles['info-counts']}>
                            <span>
                              <StackIcon width={17} height={17} />{' '}
                              {plural('page', number_of_pages_median)}
                            </span>
                            <span>
                              <ReadingIcon width={17} height={17} /> 32 hours
                              read time
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </div>
                )
              )}
            </div>
          </KanbanColumn>
        ))}
      </div>
    </div>
  )
}

Kanban.displayName = 'Kanban'

export default Kanban
