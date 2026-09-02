import { useReveal } from '../hooks/useReveal'

export default function Authors() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      className="chapter authors reveal"
      id="authors"
      aria-labelledby="authors-title"
    >
      <header className="chapter-head">
        <p className="chapter-eyebrow">Ch. 4 · Written by</p>
        <h2 className="chapter-title" id="authors-title">
          Two people, thirteen books
        </h2>
        <p className="chapter-lede">
          Deekshi Press is Gooduru Vineeth and Deekshitha S, writing AI books
          in Indian classroom language — the classes kids actually sit in,
          the apps they actually use, the exams they actually face.
        </p>
      </header>
      {/* TODO(deekshi): swap in real bios and photos when ready */}
      <div className="authors-grid">
        <article className="id-card">
          <span className="id-avatar" aria-hidden="true">
            GV
          </span>
          <h3 className="id-name">Gooduru Vineeth</h3>
          <p className="id-role">Co-author · The AI Series</p>
          <p className="id-sign" aria-hidden="true">
            Vineeth
          </p>
        </article>
        <article className="id-card">
          <span className="id-avatar id-avatar-alt" aria-hidden="true">
            DS
          </span>
          <h3 className="id-name">Deekshitha S</h3>
          <p className="id-role">Co-author · The AI Series</p>
          <p className="id-sign" aria-hidden="true">
            Deekshitha
          </p>
        </article>
      </div>
    </section>
  )
}
