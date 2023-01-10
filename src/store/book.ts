import create from 'zustand'
// import { persist } from 'zustand/middleware'

import { bookService } from '@utils/fetch'

export type Book = {
  key: string
  title: string
  title_suggest: string
  edition_count: number
  first_publish_year: number
  number_of_pages_median: number
  author_name: string[]
}

export interface BookStore {
  books: Book[]
  book?: Book
  getBook: () => Promise<Book>
  getBooks: (filters: { [key: string]: string | number }) => Promise<Book[]>
}

const useStore = create<BookStore>((set, _) => ({
  books: [],
  book: undefined,
  getBook: () => {
    throw new Error('This method has not yet been implemented.')
  },
  getBooks: async (filters) => {
    const response = (await bookService
      .url(`/search.json`)
      .query({
        mode: 'everything',
        language: 'eng',
        fields: [
          'key',
          'title',
          'title_suggest',
          'edition_count',
          'first_publish_year',
          'number_of_pages_median',
          'author_name',
        ].join(','),
        ...filters,
      })
      .get()) as { docs: Book[] }

    const data = response.docs

    set(() => ({ books: data }))
    return data
  },
}))

export default useStore
