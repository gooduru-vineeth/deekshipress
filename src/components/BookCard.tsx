import { amazonUrl, coverSrc, type Book } from '../data/books'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <a
      className="book-card"
      href={amazonUrl(book)}
      target="_blank"
      rel="noopener noreferrer"
      data-band={book.band}
    >
      <span className="book-cover">
        <img
          className="cover-img"
          src={coverSrc(book)}
          alt=""
          loading="lazy"
          width={640}
          height={906}
        />
      </span>
      <span className="book-meta">
        <span className="book-chips">
          <span className="chip chip-class">{book.classLabel}</span>
          <span className="chip">Ages {book.ages}</span>
        </span>
        <span className="book-title">{book.title}</span>
        <span className="book-buy">
          <span className="book-price">₹{book.priceInr}</span>
          {book.kindleUnlimited && (
            <span className="ku-badge">Kindle Unlimited</span>
          )}
          <span className="book-cta">Amazon ↗</span>
        </span>
      </span>
    </a>
  )
}
