import wretch from 'wretch'
import qs from 'wretch/addons/queryString'

const w = wretch()
  .resolve((r) => r.json())
  .addon(qs)

export const bookService = w.url(process.env.NEXT_PUBLIC_OPENLIBRARY_BASEURL)
