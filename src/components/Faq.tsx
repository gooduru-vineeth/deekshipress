import { useReveal } from '../hooks/useReveal'
import { StarDoodle } from './doodles'

const FAQS = [
  {
    q: 'Is my child too young to start learning about AI?',
    a: 'The series starts at Class 1 with a picture book — “Hi, AI!” is read-aloud simple, with no jargon. Every book after that grows with your kid’s class, so nobody starts too early; they just start where they are.',
  },
  {
    q: 'Do we need a computer, coding setup, or extra screen time?',
    a: 'No setup and no coding. These are books to read and talk about — they teach kids to understand the AI around them. They’re Kindle editions, so they open in the free Kindle app on any phone or tablet.',
  },
  {
    q: 'Do the books follow the school syllabus?',
    a: 'They’re written to sit beside schoolwork, in Indian classroom language. The Class 6 field guide is CBSE-friendly, and the Class 9 guide follows the CBSE Artificial Intelligence (417) skill subject.',
  },
  {
    q: 'Which book should we buy first?',
    a: 'Match your child’s class — every book names its class right on the cover. If they’re between stages, or you want one book for siblings to share, the Classes 3–5 and Classes 6–8 guides each cover a whole stage.',
  },
  {
    q: 'What is Kindle Unlimited — are these books included?',
    a: '10 of the 11 books are in Kindle Unlimited, Amazon’s reading subscription, so subscribers read them at no extra cost. Without it, every book is a regular Kindle purchase (₹149–289).',
  },
  {
    q: 'Are print editions available?',
    a: 'Right now the series is Kindle-only on Amazon.in. You don’t need a Kindle device — the free Kindle app works on any phone or tablet.',
  },
]

export default function Faq() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      className="chapter reveal"
      id="faq"
      aria-labelledby="faq-title"
    >
      <StarDoodle className="doodle doodle-star doodle-red" />
      <header className="chapter-head">
        <p className="chapter-eyebrow">Ch. 5 · Doubts?</p>
        <h2 className="chapter-title" id="faq-title">
          A unit test for parents
        </h2>
      </header>
      <div className="faq-sheet">
        <p className="faq-meta">
          <span>Time: 2 minutes</span>
          <span>Full marks: peace of mind</span>
        </p>
        {FAQS.map((item, i) => (
          <details key={item.q} className="faq-q" name="faq">
            <summary>
              <span className="faq-qno">Q{i + 1}.</span>
              <span>{item.q}</span>
              <span className="faq-marks">(2 marks)</span>
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="faq-a">
              <span className="faq-ans">Ans.</span>
              {item.a}
            </p>
          </details>
        ))}
        <p className="faq-total">
          Total: 12 marks. Passing grade: any curious kid.
        </p>
      </div>
    </section>
  )
}
