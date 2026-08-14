/**
 * Hand-drawn margin doodles — a bored kid's pencil (and one
 * teacher's red star). Purely decorative; hidden on small
 * screens by .doodle styles.
 */

interface DoodleProps {
  className?: string
}

export function PaperPlaneDoodle({ className }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 56"
      width="72"
      height="56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 30 C 26 24, 46 15, 64 8 C 56 20, 48 32, 42 46 L 33 34 Z" />
      <path d="M64 8 L 33 34" />
      <path d="M33 34 L 30.5 43" />
      <path d="M8 46 C 15 43, 17 38, 12 34" strokeDasharray="3 4.5" />
    </svg>
  )
}

export function RobotDoodle({ className }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 66"
      width="60"
      height="66"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="14" y="20" width="32" height="26" rx="7" />
      <path d="M30 20 L 30 11.5" />
      <circle cx="30" cy="8.5" r="2.6" />
      <circle cx="24.5" cy="31" r="2.3" fill="currentColor" stroke="none" />
      <circle cx="35.5" cy="31" r="2.3" fill="currentColor" stroke="none" />
      <path d="M23 39 C 27 42.5, 33 42.5, 37 39" />
      <path d="M14 29 L 8 31.5" />
      <path d="M46 29 L 52 31.5" />
      <path d="M23 46 L 23 53" />
      <path d="M37 46 L 37 53" />
      <path d="M17 58 C 25.5 61, 34.5 61, 43 58" strokeDasharray="2.5 4" />
    </svg>
  )
}

export function StarDoodle({ className }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 46"
      width="44"
      height="46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 4 L 26.5 15.5 L 38.5 16 L 29 23.5 L 32.5 35.5 L 22 28.5 L 11.5 35.5 L 15 23.5 L 5.5 16 L 17.5 15.5 Z" />
      <path d="M9 41.5 C 17.5 44.5, 27 44.5, 35.5 41.5" />
    </svg>
  )
}
