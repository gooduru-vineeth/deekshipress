import { useEffect, useRef } from 'react'
import { AMAZON_SEARCH_URL } from '../data/books'

export default function Masthead() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // A 1px sentinel above the sticky bar: once it scrolls away,
  // the bar is stuck and earns its hairline + solid paper.
  useEffect(() => {
    const sentinel = sentinelRef.current
    const header = headerRef.current
    if (!sentinel || !header || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-stuck', !entry.isIntersecting)
    })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="masthead-sentinel" ref={sentinelRef} aria-hidden="true" />
      <header className="masthead" ref={headerRef}>
        <div className="masthead-inner">
          <div className="masthead-brand">
            <img
              className="masthead-logo"
              src="/logo.png"
              alt="Deekshi Press"
              width={225}
              height={256}
            />
            <p className="masthead-tag">
              AI &amp; STEM books for curious Indian kids
            </p>
          </div>
          <nav className="masthead-nav" aria-label="Sections">
            <a className="m-link m-link-anchor" href="#syllabus">
              Syllabus
            </a>
            <a className="m-link m-link-anchor" href="#bookshelf">
              Bookshelf
            </a>
            <a className="m-link m-link-anchor" href="#faq">
              FAQ
            </a>
            <a
              className="m-link m-link-out"
              href={AMAZON_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-amp-track-destination="store"
              data-amp-track-source="masthead"
            >
              Amazon.in ↗
            </a>
          </nav>
        </div>
      </header>
    </>
  )
}
