import type * as Amplitude from '@amplitude/analytics-browser'

type Props = Record<string, string | number | boolean | undefined>
type Queued = { name: string; props?: Props; flush?: boolean }

const queue: Queued[] = []
let client: typeof Amplitude | null = null

export function track(name: string, props?: Props, opts?: { flush?: boolean }) {
  if (client) {
    client.track(name, props)
    if (opts?.flush) void client.flush()
    return
  }
  queue.push({ name, props, flush: opts?.flush })
}

export function flush() {
  if (client) void client.flush()
}

export function startAnalytics() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY
  if (!apiKey) return

  void import('@amplitude/analytics-browser').then((amplitude) => {
    amplitude.init(apiKey, {
      autocapture: {
        attribution: true,
        pageViews: { trackHistoryChanges: 'pathOnly' },
        sessions: true,
        fileDownloads: false,
        formInteractions: false,
        elementInteractions: {
          cssSelectorAllowlist: [
            'a',
            'button',
            'summary',
            '[role="button"]',
          ],
        },
        webVitals: true,
        pageUrlEnrichment: true,
        networkTracking: false,
        frustrationInteractions: false,
      },
      remoteConfig: { fetchRemoteConfig: false },
    })
    client = amplitude
    for (const event of queue) {
      amplitude.track(event.name, event.props)
      if (event.flush) void amplitude.flush()
    }
    queue.length = 0
    bindUiEvents()
    bindSectionViews()
    window.addEventListener('pagehide', () => void amplitude.flush())
  })
}

function bindUiEvents() {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest('a')
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute('href') ?? link.href
      if (/amazon\./i.test(link.href)) {
        track(
          'Clicked Amazon',
          {
            destination: link.dataset.ampTrackDestination,
            asin: link.dataset.ampTrackAsin,
            book: link.dataset.ampTrackBook,
            source: link.dataset.ampTrackSource,
            href: link.href,
          },
          { flush: true },
        )
        return
      }
      if (href.startsWith('#')) {
        track('Clicked Nav', {
          href,
          label:
            link.getAttribute('aria-label') ||
            link.textContent?.replace(/\s+/g, ' ').trim() ||
            href,
        })
      }
    },
    true,
  )

  document.addEventListener(
    'toggle',
    (event) => {
      const el = event.target
      if (!(el instanceof HTMLDetailsElement) || !el.open) return
      track('Opened FAQ', {
        question: el.querySelector('summary')?.textContent?.replace(/\s+/g, ' ').trim(),
      })
    },
    true,
  )
}

function bindSectionViews() {
  const ids = ['why', 'syllabus', 'bookshelf', 'authors', 'faq']
  if (!('IntersectionObserver' in window)) return
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const id = entry.target.id
        track('Viewed Section', { section: id })
        io.unobserve(entry.target)
      }
    },
    { threshold: 0.35 },
  )
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  }
}
