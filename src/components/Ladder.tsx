import { GRADE_BANDS, classBooksIn, coverSrc } from '../data/books'
import { useReveal } from '../hooks/useReveal'
import { RobotDoodle } from './doodles'

export default function Ladder() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      className="chapter ladder reveal"
      id="syllabus"
      aria-labelledby="syllabus-title"
    >
      <RobotDoodle className="doodle doodle-robot" />
      <header className="chapter-head">
        <p className="chapter-eyebrow">Ch. 2 · The syllabus</p>
        <h2 className="chapter-title" id="syllabus-title">
          One ladder, Class 1 to teens
        </h2>
        <p className="chapter-lede">
          Each stage hands over to the next. Find your kid’s rung, then jump
          to its shelf.
        </p>
      </header>
      <ol className="ladder-list">
        {GRADE_BANDS.map((band) => {
          const books = classBooksIn(band.id)
          return (
            <li key={band.id} className="rung" data-band={band.id}>
              <span className="rung-dot" aria-hidden="true" />
              <a className="rung-link" href={`#shelf-${band.id}`}>
                <p className="rung-classes">{band.classes}</p>
                <h3 className="rung-title">{band.title}</h3>
                <p className="rung-line">{band.ladderLine}</p>
                <span className="rung-thumbs">
                  <span className="rung-covers" aria-hidden="true">
                    {books.map((book) => (
                      <img
                        key={book.asin}
                        src={coverSrc(book)}
                        alt=""
                        width={640}
                        height={905}
                        decoding="async"
                      />
                    ))}
                  </span>
                  <span className="rung-more">
                    {books.length} book{books.length > 1 ? 's' : ''} on this
                    shelf →
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
