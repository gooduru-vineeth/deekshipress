import Bookshelf from './components/Bookshelf'
import Hero from './components/Hero'
import { AMAZON_SEARCH_URL, AUTHORS } from './data/books'

export default function App() {
  return (
    <div className="page">
      <header className="masthead">
        <div>
          <p className="wordmark">
            Deekshi <span className="wordmark-press">Press</span>
          </p>
          <p className="masthead-tag">AI &amp; STEM books for curious Indian kids</p>
        </div>
        <a
          className="masthead-link"
          href={AMAZON_SEARCH_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Amazon.in store ↗
        </a>
      </header>
      <main>
        <Hero />
        <Bookshelf />
      </main>
      <footer className="footer">
        <p>
          Written by <strong>{AUTHORS}</strong>. Published under Deekshitha
          Press.
        </p>
        <p>
          All books are Kindle editions on Amazon.in — most are free to read
          with Kindle Unlimited.
        </p>
        <p className="footer-copy">© 2026 Deekshi Press</p>
      </footer>
    </div>
  )
}
