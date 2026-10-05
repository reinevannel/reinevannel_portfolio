/** Monogramme du studio : aile nuit à gauche, aile forêt à droite, corps or. */
export function Butterfly({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <path d="M15 15 C8 6 0 8 2 15 C0 20 8 24 15 19 Z" fill="#0A1628" />
      <path d="M15 18 C10 23 4 28 7 29 C9 30 13 24 15 21 Z" fill="#1C3A6E" />
      <path d="M15 15 C22 6 30 8 28 15 C30 20 22 24 15 19 Z" fill="#0F5C3A" />
      <path d="M15 18 C20 23 26 28 23 29 C21 30 17 24 15 21 Z" fill="#1A6E45" />
      <path d="M15 15 C10 9 3 10 4 14" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
      <path d="M15 15 C20 9 27 10 26 14" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
      <ellipse cx="15" cy="16" rx="1.6" ry="8" fill="#D4AF37" />
      <circle cx="15" cy="8" r="2.2" fill="#D4AF37" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="2.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 1.2v1.8M8 13v1.8M1.2 8h1.8M13 8h1.8M3.1 3.1l1.3 1.3M11.6 11.6l1.3 1.3M12.9 3.1l-1.3 1.3M4.4 11.6l-1.3 1.3" />
      </g>
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M9.2 1.6A6.2 6.2 0 1 0 14.4 9 4.8 4.8 0 0 1 9.2 1.6Z" fill="currentColor" />
    </svg>
  );
}
