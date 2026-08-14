import { AMAZON_SEARCH_URL, AUTHORS, BOOKS, coverSrc } from '../data/books'

/** One cover per reading stage: picture book, middle school, teens */
const STACK_ASINS = ['B0H8TDN9DJ', 'B0H9J18QYB', 'B0H9JL2JQ3']

export default function Hero() {
  const stack = STACK_ASINS.map((asin) =>
    BOOKS.find((book) => book.asin === asin),
  ).filter((book) => book !== undefined)

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="hero-eyebrow">
          The AI Series · {BOOKS.length} Kindle books
        </p>
        <h1 className="hero-title">AI, explained at every age.</h1>
        <p className="hero-lede">
          From a Class 1 picture book to a field guide for teens, Deekshi Press
          books show Indian kids how the smart machines around them really work
          — one class at a time. Written by {AUTHORS}.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#bookshelf">
            Browse the bookshelf
          </a>
          <a
            className="link-out"
            href={AMAZON_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Deekshi Press on Amazon.in ↗
          </a>
        </div>
      </div>
      <div className="hero-stack" aria-hidden="true">
        {stack.map((book) => (
          <img
            key={book.asin}
            src={coverSrc(book)}
            alt=""
            width={640}
            height={906}
          />
        ))}
      </div>
    </section>
  )
}
