const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const SearchIcon = (p) => <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
export const PlusIcon = (p) => <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
export const CheckIcon = (p) => <svg {...base} {...p}><path d="m5 12 5 5L20 7" /></svg>
export const PlayIcon = (p) => <svg {...base} {...p} fill="currentColor" stroke="none"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" /></svg>
export const InfoIcon = (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
export const ChevronLeft = (p) => <svg {...base} {...p}><path d="m15 18-6-6 6-6" /></svg>
export const ChevronRight = (p) => <svg {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>
export const StarIcon = (p) => <svg {...base} {...p} fill="currentColor" stroke="none"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5Z" /></svg>
export const MenuIcon = (p) => <svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
export const CloseIcon = (p) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
export const EyeIcon = (p) => <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
export const EyeOffIcon = (p) => <svg {...base} {...p}><path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6A16.6 16.6 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
