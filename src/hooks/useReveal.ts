import { useEffect, useRef } from 'react'

/**
 * Adds .is-visible to the referenced element the first time it
 * scrolls into view. Adds it immediately when IntersectionObserver
 * is unavailable or the user prefers reduced motion, so content is
 * never stuck hidden.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const show = () => {
      el.classList.add('is-visible')
    }

    const alreadyInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }
    if (alreadyInView()) {
      show()
      return
    }

    // Pixel rootMargin: percentage margins are flaky on iOS Safari,
    // and a negative bottom margin can miss tall shelf sections.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show()
          io.disconnect()
        }
      },
      { root: null, threshold: 0, rootMargin: '80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
