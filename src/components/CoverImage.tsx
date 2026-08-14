import { useEffect, useRef, useState } from 'react'
import { coverSrc, coverSrcLarge, type Book } from '../data/books'

/** ASINs whose 1280px file is already in the browser cache. */
const hiResReady = new Set<string>()

/**
 * Paint the 640px cover first, then swap to the 1280px file once
 * the image is on (or near) screen. The small file stays visible
 * until the large one has decoded — no blank flash.
 */
export default function CoverImage({
  book,
  className,
  width = 640,
  height = 905,
  onLoad,
}: {
  book: Book
  className?: string
  width?: number
  height?: number
  onLoad?: () => void
}) {
  const small = coverSrc(book)
  const large = coverSrcLarge(book)
  const [src, setSrc] = useState(() =>
    hiResReady.has(book.asin) ? large : small,
  )
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (hiResReady.has(book.asin)) {
      setSrc(large)
      return
    }

    setSrc(small)
    const el = imgRef.current
    if (!el) return

    let cancelled = false

    const loadLarge = () => {
      if (cancelled) return
      if (hiResReady.has(book.asin)) {
        setSrc(large)
        return
      }
      const hi = new Image()
      hi.onload = () => {
        hiResReady.add(book.asin)
        if (!cancelled) setSrc(large)
      }
      hi.src = large
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        io.disconnect()
        if (el.complete) loadLarge()
        else el.addEventListener('load', loadLarge, { once: true })
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)

    return () => {
      cancelled = true
      io.disconnect()
      el.removeEventListener('load', loadLarge)
    }
  }, [book.asin, small, large])

  return (
    <img
      ref={imgRef}
      className={className}
      src={src}
      alt=""
      width={width}
      height={height}
      decoding="async"
      onLoad={onLoad}
    />
  )
}
