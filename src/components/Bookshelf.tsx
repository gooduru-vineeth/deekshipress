import {
  GRADE_BANDS,
  STAGE_GROUP,
  classBooksIn,
  stageBooks,
  type Book,
} from '../data/books'
import { useReveal } from '../hooks/useReveal'
import ShelfBand from './ShelfBand'

interface OpenBook {
  (book: Book, opener: HTMLElement): void
}

export default function Bookshelf({ onOpen }: { onOpen: OpenBook }) {
  const headRef = useReveal<HTMLElement>()
  return (
    <div className="bookshelf chapter" id="bookshelf">
      <header ref={headRef} className="chapter-head reveal">
        <p className="chapter-eyebrow">Ch. 3 · The bookshelf</p>
        <h2 className="chapter-title">Thirteen books, two ways in</h2>
        <p className="chapter-lede">
          Start with one book for a whole stage — or pick your kid’s class.
          Every book stands alone; together they make one syllabus.
        </p>
        <p className="chapter-ku">
          All 13 books — free to read with Kindle Unlimited.
        </p>
      </header>
      <ShelfBand
        band={STAGE_GROUP}
        books={stageBooks()}
        onOpen={onOpen}
        id="shelf-stages"
      />
      {GRADE_BANDS.map((band) => {
        const books = classBooksIn(band.id)
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
