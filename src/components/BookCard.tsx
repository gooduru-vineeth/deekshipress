import type { CSSProperties } from 'react'
import { coverSrc, type Book } from '../data/books'

interface BookCardProps {
  book: Book
  /** Position within its shelf, for the reveal stagger */
  index: number
  onOpen: (book: Book, opener: HTMLElement) => void
}

export default function BookCard({ book, index, onOpen }: BookCardProps) {
  return (
    <button
      type="button"
      className="book-card"
      data-band={book.band}
      style={{ '--i': index } as CSSProperties}
      onClick={(event) => onOpen(book, event.currentTarget)}
    >
      <span className="book-cover">
        <img
          className="cover-img"
          src={coverSrc(book)}
          alt=""
          width={640}
          height={905}
          decoding="async"
        />
      </span>
      <span className="book-meta">
        <span className="book-chips">
          <span className="chip chip-class">{book.classLabel}</span>
          <span className="chip">Ages {book.ages}</span>
        </span>
        <span className="book-title">{book.displayTitle}</span>
        <span className="book-hook">{book.hook}</span>
        <span className="book-buy">
          <span className="book-price">₹{book.priceInr}</span>
          {book.kindleUnlimited && (
            <span className="ku-badge">Kindle Unlimited</span>
          )}
          <span className="book-cta">Details →</span>
        </span>
      </span>
    </button>
  )
}
