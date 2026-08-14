import { BOOKS, GRADE_BANDS } from '../data/books'
import BookCard from './BookCard'

export default function Bookshelf() {
  return (
    <div className="bookshelf" id="bookshelf">
      {GRADE_BANDS.map((band) => {
        const books = BOOKS.filter((book) => book.band === band.id)
        if (books.length === 0) return null
        return (
          <section
            key={band.id}
            className="shelf-section"
            data-band={band.id}
            aria-label={`${band.classes} — ${band.title}`}
          >
            <header className="shelf-head">
              <p className="shelf-classes">{band.classes}</p>
              <h2 className="shelf-title">{band.title}</h2>
              <p className="shelf-blurb">{band.blurb}</p>
            </header>
            <div className="shelf-grid">
              {books.map((book) => (
                <BookCard key={book.asin} book={book} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
