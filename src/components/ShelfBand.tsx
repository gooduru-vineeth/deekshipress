import type { Book, ShelfGroup } from '../data/books'
import { useReveal } from '../hooks/useReveal'
import BookCard from './BookCard'

export interface OpenBook {
  (book: Book, opener: HTMLElement): void
}

export default function ShelfBand({
  band,
  books,
  onOpen,
  id,
}: {
  band: ShelfGroup
  books: Book[]
  onOpen: OpenBook
  /** Defaults to `shelf-${band.id}` */
  id?: string
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id={id ?? `shelf-${band.id}`}
      className="shelf-section"
      data-band={band.id}
      aria-label={`${band.classes} — ${band.title}`}
    >
      <span className="shelf-tab">{band.classes}</span>
      <div className="shelf-body">
        <header className="shelf-head">
          <h3 className="shelf-title">{band.title}</h3>
          <p className="shelf-blurb">{band.blurb}</p>
        </header>
        <div className="shelf-grid">
          {books.map((book, index) => (
            <BookCard
              key={book.asin}
              book={book}
              index={index}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
