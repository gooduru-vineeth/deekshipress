import { useEffect, useRef, type MouseEvent, type RefObject } from 'react'
import { amazonUrl, type Book } from '../data/books'
import CoverImage from './CoverImage'

interface BookDialogProps {
  book: Book | null
  onDismiss: () => void
  /** The card that opened the dialog — refocused on close because
   *  Safari doesn't focus buttons on click, so the native focus
   *  restore has nothing to return to. */
  openerRef: RefObject<HTMLElement | null>
}

export default function BookDialog({
  book,
  onDismiss,
  openerRef,
}: BookDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Keep the latest onDismiss without re-binding the close listener.
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  // Keep the last shown book so content doesn't blank out in the
  // render that closes the dialog.
  const lastBookRef = useRef<Book | null>(null)
  if (book) lastBookRef.current = book
  const shown = book ?? lastBookRef.current

  // One always-mounted dialog; the `open` prop would make it
  // non-modal and conditional rendering would skip close events.
  // After open, park focus on the close button (first in the
  // sheet) so the browser does not scroll the buy link into view.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (book && !dialog.open) dialog.showModal()
    if (book && dialog.open) {
      dialog.scrollTop = 0
      closeRef.current?.focus({ preventScroll: true })
    }
    if (!book && dialog.open) dialog.close()
  }, [book])

  // The `close` event fires for every way the dialog closes,
  // including Esc. Attached with addEventListener — not the
  // onClose prop — so it works regardless of React's dialog
  // event support.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      onDismissRef.current()
      const opener = openerRef.current
      if (opener) {
        opener.focus()
        openerRef.current = null
      }
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [openerRef])

  // Backdrop clicks target the <dialog> element itself; content
  // clicks land on .bd-body children (dialog has padding: 0).
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) onDismiss()
  }

  return (
    <dialog
      ref={ref}
      className="book-dialog"
      data-band={shown?.band}
      aria-labelledby="bd-title"
      onClick={handleClick}
    >
      {shown && (
        <div className="bd-body">
          <button
            ref={closeRef}
            type="button"
            className="bd-close"
            onClick={onDismiss}
            aria-label="Close book details"
          >
            ✕
          </button>
          <div className="bd-cover-col">
            <span className="book-cover bd-cover">
              <CoverImage
                book={shown}
                className="cover-img"
                onLoad={() => {
                  if (ref.current) ref.current.scrollTop = 0
                }}
              />
            </span>
          </div>
          <div className="bd-content">
            <p className="bd-kicker">
              {shown.classLabel} · Ages {shown.ages} ✓
            </p>
            <h2 className="bd-title" id="bd-title">
              {shown.displayTitle}
            </h2>
            <p className="bd-subtitle">{shown.subtitle}</p>
            <p className="bd-blurb">{shown.blurb}</p>
            <p className="bd-inside-label">Inside this book:</p>
            <ul className="bd-inside">
              {shown.inside.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="bd-actions">
              <a
                className="btn"
                href={amazonUrl(shown)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy on Amazon.in ↗
              </a>
              <span className="bd-price">₹{shown.priceInr}</span>
              {shown.kindleUnlimited && (
                <span className="bd-ku-note">
                  or free with Kindle Unlimited
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
