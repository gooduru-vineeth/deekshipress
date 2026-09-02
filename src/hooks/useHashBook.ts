import { useSyncExternalStore } from 'react'
import { BOOKS, type Book } from '../data/books'
import { track } from '../analytics'

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

let lastAsin: string | null = null
let openerSource: 'hero' | 'card' | null = null

export function useHashBook(): Book | null {
  const hash = useSyncExternalStore(subscribe, getHash)
  const book = hash.startsWith(HASH_PREFIX)
    ? (BOOKS.find((item) => item.asin === hash.slice(HASH_PREFIX.length)) ?? null)
    : null

  const nextAsin = book?.asin ?? null
  if (nextAsin !== lastAsin) {
    if (book) {
      const source =
        lastAsin === null && !openerSource ? 'hash' : openerSource ?? 'card'
      track('Opened Book', {
        asin: book.asin,
        book: book.displayTitle,
        band: book.band,
        class_label: book.classLabel,
        source,
      })
      openerSource = null
    } else if (lastAsin) {
      const previous = BOOKS.find((item) => item.asin === lastAsin)
      track('Closed Book', {
        asin: lastAsin,
        book: previous?.displayTitle,
      })
    }
    lastAsin = nextAsin
  }

  return book
}

/** Hash assignment pushes one history entry and fires hashchange —
 *  so the browser's back button also closes the dialog. */
export function openBook(book: Book, source: 'hero' | 'card' = 'card') {
  openerSource = source
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
