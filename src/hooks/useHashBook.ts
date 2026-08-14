import { useSyncExternalStore } from 'react'
import { BOOKS, type Book } from '../data/books'

/**
 * The open book lives in the URL hash (#book-<ASIN>), so book
 * details are shareable without a router and the back button
 * closes the dialog. No element carries a book-<ASIN> id, so
 * setting the hash never scroll-jumps.
 */
const HASH_PREFIX = '#book-'

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

export function useHashBook(): Book | null {
  const hash = useSyncExternalStore(subscribe, getHash)
  if (!hash.startsWith(HASH_PREFIX)) return null
  const asin = hash.slice(HASH_PREFIX.length)
  return BOOKS.find((book) => book.asin === asin) ?? null
}

/** Hash assignment pushes one history entry and fires hashchange —
 *  so the browser's back button also closes the dialog. */
export function openBook(book: Book) {
  window.location.hash = `book-${book.asin}`
}

/** Strips the hash in place. Never assigns an empty hash (that
 *  would push an entry and scroll to top), and never calls
 *  history.back() — Chrome drops script-initiated traversals when
 *  the closing gesture (Esc) has consumed the user activation.
 *  replaceState fires no event, so nudge the store by hand. */
export function dismissBook() {
  if (!window.location.hash.startsWith(HASH_PREFIX)) return
  history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search,
  )
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}
