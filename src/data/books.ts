export type BandId = 'foundations' | 'explorers' | 'middle' | 'seniors'

export interface GradeBand {
  id: BandId
  /** Red margin annotation, e.g. "Classes 1–2" */
  classes: string
  title: string
  blurb: string
  /** One-line rung description for the syllabus ladder */
  ladderLine: string
}

export interface Book {
  /** Full title as listed on Amazon (minus the series suffix) */
  title: string
  /** Short title shown on cards and in the detail dialog */
  displayTitle: string
  /** Descriptive tail of the Amazon title, cleaned up */
  subtitle: string
  /** One-line hook shown on the card */
  hook: string
  /**
   * ~60-word pitch for the detail dialog.
   * NOTE: drafted from the title, cover, and grade level — not from the
   * manuscript. Fact-check against the actual book before publishing.
   */
  blurb: string
  /** "Inside this book" bullets — same caveat as blurb */
  inside: string[]
  classLabel: string
  ages: string
  priceInr: number
  kindleUnlimited: boolean
  asin: string
  band: BandId
}

export const AUTHORS = 'Gooduru Vineeth & Deekshitha S'

export const AMAZON_SEARCH_URL = 'https://www.amazon.in/s?k=deekshi+press'

export const amazonUrl = (book: Book): string =>
  `https://www.amazon.in/dp/${book.asin}`

/** Cover images live in public/covers, named by ASIN */
export const coverSrc = (book: Book): string =>
  `${import.meta.env.BASE_URL}covers/${book.asin}.jpg`

/** 1280px cover. CoverImage paints the 640px file first, then swaps. */
export const coverSrcLarge = (book: Book): string =>
  `${import.meta.env.BASE_URL}covers/${book.asin}-lg.jpg`

export const GRADE_BANDS: GradeBand[] = [
  {
    id: 'foundations',
    classes: 'Classes 1–2',
    title: 'First hellos',
    blurb:
      'Picture-book introductions — what AI is, where it lives, and why it isn’t magic.',
    ladderLine: 'Say hello: what AI is, in pictures and read-aloud words.',
  },
  {
    id: 'explorers',
    classes: 'Classes 3–5',
    title: 'Young explorers',
    blurb: 'Meet the helper inside your apps, maps, speakers, and games.',
    ladderLine: 'Spot the AI hiding in apps, maps, speakers, and games.',
  },
  {
    id: 'middle',
    classes: 'Classes 6–8',
    title: 'Field guides',
    blurb: 'How smart machines think and learn — and where they go wrong.',
    ladderLine:
      'Look under the hood: how machines learn — and where they go wrong.',
  },
  {
    id: 'seniors',
    classes: 'Class 9 & teens',
    title: 'The road ahead',
    blurb: 'CBSE 417-friendly study, and a map for growing up fluent in AI.',
    ladderLine:
      'Study it properly: the CBSE 417 way, then a map for the decade ahead.',
  },
]

export const BOOKS: Book[] = [
  {
    title:
      'Hi, AI!: An Illustrated Introduction to Artificial Intelligence for Young Children, Parents, and Class 1 Classrooms',
    displayTitle: 'Hi, AI!',
    subtitle: 'An illustrated introduction to AI for young children',
    hook: 'The very first hello — AI in pictures and simple words.',
    blurb:
      'A picture-book introduction to artificial intelligence for the youngest readers. Big, friendly illustrations and simple words show what AI is, where it lives around us, and why it isn’t magic — made to be read aloud with a parent, or shared with a whole Class 1 classroom.',
    inside: [
      'What AI is, in words a five-year-old can say',
      'Where AI hides at home and outside',
      'Read-aloud pages for parents and teachers',
      'No jargon, no setup — just curiosity',
    ],
    classLabel: 'Class 1',
    ages: '4–8',
    priceInr: 285,
    kindleUnlimited: true,
    asin: 'B0H8TDN9DJ',
    band: 'foundations',
  },
  {
    title:
      'Hello, AI!: A First Adventure — Fun AI & STEM Lessons for Class 2 / Grade 2 Kids Ages 7–9',
    displayTitle: 'Hello, AI! A First Adventure',
    subtitle: 'Fun AI and STEM lessons for Class 2 kids',
    hook: 'Playful first lessons in AI and STEM, one adventure at a time.',
    blurb:
      'The adventure begins: playful AI and STEM lessons sized for Class 2 attention spans. Each chapter turns one big idea into something a seven-year-old can spot, say, and show off — building the habit of asking “how does that work?” about the smart things around them.',
    inside: [
      'Bite-size AI and STEM lessons for ages 7–9',
      'Everyday examples kids recognise at home and school',
      'Questions to wonder about together as a family',
    ],
    classLabel: 'Class 2',
    ages: '7–9',
    priceInr: 289,
    kindleUnlimited: false,
    asin: 'B0H9GZFD52',
    band: 'foundations',
  },
  {
    title:
      'Hello, AI! A Grade 3 Adventure: Meet the Helper Inside Your Apps, Speakers, and Games',
    displayTitle: 'Hello, AI! A Grade 3 Adventure',
    subtitle: 'Meet the helper inside your apps, speakers, and games',
    hook: 'Who answers when you talk to the speaker? Time to find out.',
    blurb:
      'Who answers when you talk to a speaker? Who picks the next video? This Grade 3 adventure introduces the helper inside everyday apps, speakers, and games — what it’s good at, what it gets wrong, and how to be the kid who understands it instead of just using it.',
    inside: [
      'The AI helpers inside apps, speakers, and games',
      'What smart helpers can and can’t do',
      'Simple habits for using them wisely',
    ],
    classLabel: 'Class 3',
    ages: '7–9',
    priceInr: 149,
    kindleUnlimited: true,
    asin: 'B0H9HGRJVM',
    band: 'explorers',
  },
  {
    title:
      'Hello, AI! A Class 4 Adventure: Meet the Helper Inside Your Apps, Maps, and Movies',
    displayTitle: 'Hello, AI! A Class 4 Adventure',
    subtitle: 'Meet the helper inside your apps, maps, and movies',
    hook: 'How do maps know the way? How do movies find you?',
    blurb:
      'The adventure grows up a step: how does the map know about the traffic ahead? How does the app guess which movie you’ll like? For Class 4 readers, this book follows the helper into maps, recommendations, and movies — the clever guesswork behind the screens they use every day.',
    inside: [
      'How maps, apps, and recommendations really work',
      'The guessing game behind “you might like this”',
      'Sharper questions for sharper Class 4 minds',
    ],
    classLabel: 'Class 4',
    ages: '9–10',
    priceInr: 149,
    kindleUnlimited: true,
    asin: 'B0H9HBM7T3',
    band: 'explorers',
  },
  {
    title: 'AI and You: A Class 5 Field Guide to Your Smartest New Friend',
    displayTitle: 'AI and You',
    subtitle: 'A Class 5 field guide to your smartest new friend',
    hook: 'A first field guide to your smartest new friend.',
    blurb:
      'The first proper field guide in the series: AI as your smartest new friend — one worth understanding properly. Class 5 readers learn to observe the AI around them like young scientists: what it does, how it might be doing it, and when to trust it. The bridge from picture-book wonder to real understanding.',
    inside: [
      'Field-guide style: observe, question, understand',
      'How everyday AI makes its clever guesses',
      'When to trust a smart machine — and when not to',
    ],
    classLabel: 'Class 5',
    ages: '10–11',
    priceInr: 149,
    kindleUnlimited: true,
    asin: 'B0H9BYVKBH',
    band: 'explorers',
  },
  {
    title:
      'AI for Young Explorers: Meet the AI Hiding in Your Apps, Games, and Home — For Indian Classes 3–5',
    displayTitle: 'AI for Young Explorers',
    subtitle:
      'The AI hiding in your apps, games, and home — Classes 3–5 in one book',
    hook: 'One book for the whole 3–5 stretch.',
    blurb:
      'One book that covers the whole Classes 3–5 stretch: the AI hiding in apps, games, and around the home, written for Indian kids and the things they actually use. A great single pick for siblings, school libraries, or any young explorer who wants the full tour in one go.',
    inside: [
      'The complete Classes 3–5 tour in one book',
      'AI in apps, games, and everyday home life',
      'Written for Indian kids, with Indian examples',
    ],
    classLabel: 'Classes 3–5',
    ages: '8–11',
    priceInr: 199,
    kindleUnlimited: true,
    asin: 'B0H9JKZFXT',
    band: 'explorers',
  },
  {
    title:
      'AI Unwrapped: A Class 6 Field Guide to the Smart Machines All Around You — CBSE-Friendly',
    displayTitle: 'AI Unwrapped',
    subtitle:
      'A CBSE-friendly Class 6 field guide to the smart machines all around you',
    hook: 'Unwrap the smart machines all around you.',
    blurb:
      'Time to unwrap the box. This CBSE-friendly Class 6 field guide looks at the smart machines all around — at home, at school, in your pocket — and starts explaining what’s really going on inside. Written to sit comfortably beside schoolwork, not compete with it.',
    inside: [
      'What’s inside the “smart” in smart machines',
      'A field guide built for Class 6 curiosity',
      'CBSE-friendly framing that supports schoolwork',
    ],
    classLabel: 'Class 6',
    ages: '11–12',
    priceInr: 149,
    kindleUnlimited: true,
    asin: 'B0H9J18QYB',
    band: 'middle',
  },
  {
    title:
      'AI for Curious Minds: How Artificial Intelligence Really Works, Where It Goes Wrong, and How to Use It Well — Classes 6–8',
    displayTitle: 'AI for Curious Minds',
    subtitle:
      'How AI really works, where it goes wrong, and how to use it well — Classes 6–8 in one book',
    hook: 'How AI works, fails, and should be used — all of middle school in one book.',
    blurb:
      'The middle-school big picture in one book: how artificial intelligence really works, where it goes wrong, and how to use it well. Honest about AI’s mistakes and limits, not just its magic — for Classes 6–8 readers who are ready to think for themselves about the technology shaping their world.',
    inside: [
      'How AI really works, minus the hype',
      'Where AI goes wrong — mistakes, bias, limits',
      'Habits for using AI well and safely',
      'Covers the whole Classes 6–8 arc in one book',
    ],
    classLabel: 'Classes 6–8',
    ages: '9+',
    priceInr: 199,
    kindleUnlimited: true,
    asin: 'B0H9J7XQNN',
    band: 'middle',
  },
  {
    title:
      'AI, Unpacked: How Smart Machines Think, Learn, and Live in Your Pocket — A Class 8 AI Field Guide',
    displayTitle: 'AI, Unpacked',
    subtitle:
      'How smart machines think, learn, and live in your pocket — a Class 8 field guide',
    hook: 'How smart machines think, learn, and live in your pocket.',
    blurb:
      'How does a machine learn? What is it actually doing when it “thinks”? This Class 8 field guide unpacks the machinery behind the smartness — how machines learn from examples, and how they ended up living in your pocket. For readers who want the how, not just the wow.',
    inside: [
      'How machines learn from examples',
      'What “thinking” means for a machine',
      'The AI living in your pocket, unpacked',
    ],
    classLabel: 'Class 8',
    ages: '11+',
    priceInr: 199,
    kindleUnlimited: true,
    asin: 'B0H9J6M8VV',
    band: 'middle',
  },
  {
    title:
      'The Class 9 AI Field Guide: India Edition — Build, Question, and Live with AI the CBSE 417 Way',
    displayTitle: 'The Class 9 AI Field Guide',
    subtitle: 'India Edition — build, question, and live with AI the CBSE 417 way',
    hook: 'Build, question, and live with AI — the CBSE 417 way.',
    blurb:
      'AI becomes a real subject. Written for Class 9 students on the CBSE Artificial Intelligence (417) path, this India Edition field guide is about building, questioning, and living with AI — a companion that treats students as future makers of AI, not just users of it.',
    inside: [
      'Follows the CBSE AI (417) skill subject',
      'Build: start thinking like an AI maker',
      'Question: ethics, bias, and better judgement',
      'India Edition — grounded in Indian contexts',
    ],
    classLabel: 'Class 9',
    ages: '12+',
    priceInr: 199,
    kindleUnlimited: true,
    asin: 'B0H9B29PDT',
    band: 'seniors',
  },
  {
    title:
      'AI: The Field Guide for the Next Decade — How Machines Learn, What They Can Really Do, and How to Grow Up Fluent in AI',
    displayTitle: 'The Field Guide for the Next Decade',
    subtitle:
      'How machines learn, what they can really do, and how to grow up fluent in AI',
    hook: 'For teens about to walk into an AI-shaped decade.',
    blurb:
      'The capstone. For teenagers about to walk into an AI-shaped decade: how machines learn, what they can genuinely do (and what stays hype), and how to grow up fluent — able to use AI, judge it, and build with it. The book to hand a sixteen-year-old who asks what’s next.',
    inside: [
      'How modern machine learning actually works',
      'Capability vs hype: what AI can really do',
      'Fluency: use it, question it, build with it',
      'A map for the decade you’ll graduate into',
    ],
    classLabel: 'Teens',
    ages: '14–17',
    priceInr: 249,
    kindleUnlimited: true,
    asin: 'B0H9JL2JQ3',
    band: 'seniors',
  },
]
