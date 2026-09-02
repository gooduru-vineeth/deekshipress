import { AUTHORS } from '../data/books'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-belongs">
        This bookshelf belongs to: <span>curious kids everywhere</span>
      </p>
      <p>
        Written by <strong>{AUTHORS}</strong>. Published under Deekshitha
        Press.
      </p>
      <p>
        All books are Kindle editions on Amazon.in — all 13 are free to read
        with Kindle Unlimited.
      </p>
      <p className="footer-copy">© 2026 Deekshi Press</p>
    </footer>
  )
}
