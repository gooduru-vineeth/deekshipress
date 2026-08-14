import { useReveal } from '../hooks/useReveal'
import { PaperPlaneDoodle } from './doodles'

export default function WhyAI() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      className="chapter why reveal"
      id="why"
      aria-labelledby="why-title"
    >
      <PaperPlaneDoodle className="doodle doodle-plane" />
      <header className="chapter-head">
        <p className="chapter-eyebrow">Ch. 1 · Why AI, why now</p>
        <h2 className="chapter-title" id="why-title">
          The machines got smart. Kids should too.
        </h2>
      </header>
      <div className="why-beats">
        <p className="why-beat">
          AI already picks your child’s videos, answers their doubts, and
          finishes their sentences.
        </p>
        <p className="why-beat">
          Kids can grow up just obeying it — or{' '}
          <span className="u-pen">truly understanding it</span>. The
          difference is one good book at the right age.
        </p>
        <p className="why-beat">
          So we’re writing the syllabus we wish schools had:{' '}
          <span className="u-pen">one book per class</span>, picture books to
          CBSE 417.
        </p>
      </div>
    </section>
  )
}
