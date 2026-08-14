import { BOOKS, GRADE_BANDS, type Book, type GradeBand } from '../data/books'
import { useReveal } from '../hooks/useReveal'
import BookCard from './BookCard'

interface OpenBook {
  (book: Book, opener: HTMLElement): void
}

function ShelfBand({
  band,
  books,
  onOpen,
}: {
  band: GradeBand
  books: Book[]
  onOpen: OpenBook
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id={`shelf-${band.id}`}
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

export default function Bookshelf({ onOpen }: { onOpen: OpenBook }) {
  const headRef = useReveal<HTMLElement>()
  return (
    <div className="bookshelf chapter" id="bookshelf">
      <header ref={headRef} className="chapter-head reveal">
        <p className="chapter-eyebrow">Ch. 3 · The bookshelf</p>
        <h2 className="chapter-title">Eleven books, class by class</h2>
        <p className="chapter-lede">
          Pick your kid’s class and start there — every book stands alone;
          together they make one syllabus.
        </p>
      </header>
      {GRADE_BANDS.map((band) => {
        const books = BOOKS.filter((book) => book.band === band.id)
        if (books.length === 0) return null
        return (
          <ShelfBand
            key={band.id}
            band={band}
            books={books}
            onOpen={onOpen}
          />
        )
      })}
    </div>
  )
}
