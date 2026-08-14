export type BandId = 'foundations' | 'explorers' | 'middle' | 'seniors'

export interface GradeBand {
  id: BandId
  /** Red margin annotation, e.g. "Classes 1–2" */
  classes: string
  title: string
  blurb: string
}

export interface Book {
  /** Full title as listed on Amazon (minus the series suffix) */
  title: string
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

export const GRADE_BANDS: GradeBand[] = [
  {
    id: 'foundations',
    classes: 'Classes 1–2',
    title: 'First hellos',
    blurb:
      'Picture-book introductions — what AI is, where it lives, and why it isn’t magic.',
  },
  {
    id: 'explorers',
    classes: 'Classes 3–5',
    title: 'Young explorers',
    blurb: 'Meet the helper inside your apps, maps, speakers, and games.',
  },
  {
    id: 'middle',
    classes: 'Classes 6–8',
    title: 'Field guides',
    blurb: 'How smart machines think and learn — and where they go wrong.',
  },
  {
    id: 'seniors',
    classes: 'Class 9 & teens',
    title: 'The road ahead',
    blurb:
      'CBSE 417-friendly study, and a map for growing up fluent in AI.',
  },
]

export const BOOKS: Book[] = [
  {
    title:
      'Hi, AI!: An Illustrated Introduction to Artificial Intelligence for Young Children, Parents, and Class 1 Classrooms',
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
    classLabel: 'Class 4',
    ages: '9–10',
    priceInr: 149,
    kindleUnlimited: true,
    asin: 'B0H9HBM7T3',
    band: 'explorers',
  },
  {
    title:
      'AI and You: A Class 5 Field Guide to Your Smartest New Friend',
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
    classLabel: 'Teens',
    ages: '14–17',
    priceInr: 249,
    kindleUnlimited: true,
    asin: 'B0H9JL2JQ3',
    band: 'seniors',
  },
]
