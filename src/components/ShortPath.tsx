import { STAGE_GROUP, stageBooks, type Book } from '../data/books'
import ShelfBand from './ShelfBand'

export default function ShortPath({
  onOpen,
}: {
  onOpen: (book: Book, opener: HTMLElement) => void
}) {
  return (
    <div className="chapter short-path">
      <ShelfBand
        band={STAGE_GROUP}
        books={stageBooks()}
        onOpen={onOpen}
        id="short-path"
      />
      <p className="ladder-alt">
        <a href="#syllabus">
          Or pick your kid’s class, one rung at a time →
        </a>
      </p>
    </div>
  )
}
