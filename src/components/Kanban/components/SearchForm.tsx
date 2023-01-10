'use client'
import type { ChangeEvent, MouseEvent, MouseEventHandler } from 'react'
import { useState } from 'react'

import styles from '../Kanban.module.scss'
import debounce from '@utils/debounce'
import Button from '@components/Button'
import Loading from '@components/Loading'

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
    <div className={styles['search-form']}>
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
    </div>
  )
}

SearchForm.displayName = 'Kanban Search Form'

export default SearchForm
