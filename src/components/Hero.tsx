import { AMAZON_SEARCH_URL, BOOKS, coverSrc, type Book } from '../data/books'

/** One cover per reading stage: Class 1, middle school, teens */
const STACK_ASINS = ['B0H8TDN9DJ', 'B0H9J18QYB', 'B0H9JL2JQ3']

export default function Hero({
  onOpen,
}: {
  onOpen: (book: Book, opener: HTMLElement) => void
}) {
  const stack = STACK_ASINS.map((asin) =>
    BOOKS.find((book) => book.asin === asin),
  ).filter((book) => book !== undefined)

  return (
    <section className="hero">
      <div className="hero-inner">
      <div className="hero-copy">
        <div className="hero-label-slot">
          <div className="hero-label">
            <p className="hero-label-row">
              <span className="hero-label-key">Name</span>
              <span className="hero-label-value">Deekshi Press</span>
            </p>
            <p className="hero-label-row">
              <span className="hero-label-key">Subject</span>
              <span className="hero-label-value">Artificial Intelligence</span>
            </p>
            <p className="hero-label-row">
              <span className="hero-label-key">Class</span>
              <span className="hero-label-value">1 to 9 &amp; teens</span>
            </p>
          </div>
        </div>
        <h1 className="hero-title">AI, explained at every age.</h1>
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
          >
            Amazon.in store ↗
          </a>
        </div>
      </div>
      <div className="hero-stack">
        {stack.map((book) => (
          <button
            key={book.asin}
            type="button"
            className="hero-cover"
            onClick={(event) => onOpen(book, event.currentTarget)}
            aria-label={`Open ${book.displayTitle}`}
          >
            <img
              src={coverSrc(book)}
              alt=""
              width={640}
              height={905}
            />
          </button>
        ))}
      </div>
      </div>
    </section>
  )
}
