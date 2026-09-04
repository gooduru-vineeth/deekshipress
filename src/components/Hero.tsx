import { AMAZON_SEARCH_URL, stageBooks, type Book } from '../data/books'
import CoverImage from './CoverImage'

export default function Hero({
  onOpen,
}: {
  onOpen: (book: Book, opener: HTMLElement) => void
}) {
  const stack = stageBooks()

  return (
    <section className="hero">
      <div className="hero-inner">
      <div className="hero-copy">
        <h1 className="hero-title">AI, explained for every age.</h1>
        <p className="hero-lede">
          From a Class 1 AI book to a field guide for teens, Deekshi Press
          books show Indian kids how the smart machines around them work —
          and how AI really works — one class at a time.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#syllabus">
            Find your class
          </a>
          <a
            className="link-out"
            href={AMAZON_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-amp-track-destination="store"
            data-amp-track-source="hero"
          >
            Amazon.in store ↗
          </a>
        </div>
        <p className="hero-ku">
          <a
            className="link-out"
            href={AMAZON_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-amp-track-destination="store"
            data-amp-track-source="hero"
          >
            Every book free to read on Kindle Unlimited{'\u00a0'}↗
          </a>
        </p>
      </div>
      <div className="hero-stack">
        {stack.map((book) => (
          <button
            key={book.asin}
            type="button"
            className="hero-cover"
            data-amp-track-book={book.displayTitle}
            data-amp-track-asin={book.asin}
            data-amp-track-source="hero"
            onClick={(event) => onOpen(book, event.currentTarget)}
            aria-label={`Open ${book.displayTitle}`}
          >
            <CoverImage book={book} />
          </button>
        ))}
      </div>
      </div>
    </section>
  )
}
