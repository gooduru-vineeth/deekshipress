import { useRef } from 'react'
import Authors from './components/Authors'
import BookDialog from './components/BookDialog'
import Bookshelf from './components/Bookshelf'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Ladder from './components/Ladder'
import Masthead from './components/Masthead'
import ShortPath from './components/ShortPath'
import WhyAI from './components/WhyAI'
import { dismissBook, openBook, useHashBook } from './hooks/useHashBook'
import type { Book } from './data/books'

export default function App() {
  const book = useHashBook()
  const openerRef = useRef<HTMLElement | null>(null)

  const handleOpen = (nextBook: Book, opener: HTMLElement) => {
    openerRef.current = opener
    const source = opener.dataset.ampTrackSource === 'hero' ? 'hero' : 'card'
    openBook(nextBook, source)
  }

  return (
    <div className="page">
      <a className="skip-link" href="#bookshelf">
        Skip to the books
      </a>
      <Masthead />
      <main>
        <Hero onOpen={handleOpen} />
        <WhyAI />
        <ShortPath onOpen={handleOpen} />
        <Ladder />
        <Bookshelf onOpen={handleOpen} />
        <Authors />
        <Faq />
      </main>
      <Footer />
      <BookDialog book={book} onDismiss={dismissBook} openerRef={openerRef} />
    </div>
  )
}
