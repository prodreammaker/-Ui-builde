// All SVG icon components — no icon library dependency
import React from 'react'

interface IconProps {
  size?: number
  className?: string
}

const ico = (d: React.ReactNode, vb = '0 0 16 16') =>
  ({ size = 16, className = '' }: IconProps) => (
    <svg width={size} height={size} viewBox={vb} fill="none" className={className} aria-hidden="true">
      {d}
    </svg>
  )

export const IcoDragHandle = ico(
  <>
    <circle cx="5.5" cy="4" r="1.2" fill="currentColor"/>
    <circle cx="10.5" cy="4" r="1.2" fill="currentColor"/>
    <circle cx="5.5" cy="8" r="1.2" fill="currentColor"/>
    <circle cx="10.5" cy="8" r="1.2" fill="currentColor"/>
    <circle cx="5.5" cy="12" r="1.2" fill="currentColor"/>
    <circle cx="10.5" cy="12" r="1.2" fill="currentColor"/>
  </>
)

export const IcoPlus = ico(
  <>
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </>
)

export const IcoTrash = ico(
  <>
    <path d="M2.5 4.5h11M5.5 4.5V3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1.5M3.5 4.5l1 9h7l1-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoUndo = ico(
  <>
    <path d="M3.5 6.5H9a3.5 3.5 0 0 1 0 7H6M3.5 6.5L6 4m-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoRedo = ico(
  <>
    <path d="M12.5 6.5H7a3.5 3.5 0 0 0 0 7h3m2.5-7L10 4m2.5 2.5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoSave = ico(
  <>
    <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5.5 3v3.5h5V3M5 13v-4h6v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </>
)

export const IcoDownload = ico(
  <>
    <path d="M8 2v8M5 7l3 3 3-3M3 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoCode = ico(
  <>
    <path d="M5 4L1.5 8 5 12M11 4l3.5 4L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 3l-3 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </>
)

export const IcoSettings = ico(
  <>
    <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8 1.5v1.7M8 12.8v1.7M1.5 8h1.7M12.8 8h1.7M3.4 3.4l1.2 1.2M11.4 11.4l1.2 1.2M12.6 3.4l-1.2 1.2M4.6 11.4l-1.2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </>
)

export const IcoChevronDown = ico(
  <>
    <path d="M4 6.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoChevronRight = ico(
  <>
    <path d="M6.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoClose = ico(
  <>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
)

export const IcoCopy = ico(
  <>
    <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoLayers = ico(
  <>
    <path d="M8 2L14 5.5 8 9 2 5.5 8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M2 8.5L8 12l6-3.5M2 11L8 14.5 14 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoGrid = ico(
  <>
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
  </>
)

export const IcoPalette = ico(
  <>
    <path d="M8 2a6 6 0 1 0 0 12 3 3 0 0 0 0-6 3 3 0 0 1 0-6z" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="5.5" cy="6" r="1" fill="currentColor"/>
    <circle cx="10.5" cy="6" r="1" fill="currentColor"/>
    <circle cx="8" cy="4" r="1" fill="currentColor"/>
  </>
)

export const IcoType = ico(
  <>
    <path d="M3 4h10M8 4v9M6 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
)

export const IcoTemplate = ico(
  <>
    <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 6h12M6 6v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </>
)

export const IcoButton = ico(
  <>
    <rect x="2" y="5.5" width="12" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
)

export const IcoCard = ico(
  <>
    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 6.5h12M5 9.5h3M5 11.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </>
)

export const IcoInput = ico(
  <>
    <rect x="2" y="5" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 8.5h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 3.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </>
)

export const IcoBadge = ico(
  <>
    <rect x="3" y="5.5" width="10" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </>
)

export const IcoTable = ico(
  <>
    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 6.5h12M6 3v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M2 9.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </>
)

export const IcoHero = ico(
  <>
    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 7h6M6 9h4M8 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </>
)

export const IcoStats = ico(
  <>
    <rect x="2" y="5" width="3" height="8" rx="1" fill="currentColor" opacity=".5"/>
    <rect x="6.5" y="3" width="3" height="10" rx="1" fill="currentColor"/>
    <rect x="11" y="6" width="3" height="7" rx="1" fill="currentColor" opacity=".7"/>
  </>
)

export const IcoForm = ico(
  <>
    <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M4 13.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
)

export const IcoNavbar = ico(
  <>
    <rect x="2" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="5" cy="8" r="1.2" fill="currentColor"/>
    <path d="M8 7.5h4M8 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </>
)

export const IcoToggle = ico(
  <>
    <rect x="2" y="5.5" width="12" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="11" cy="8" r="1.8" fill="currentColor"/>
  </>
)

export const IcoEye = ico(
  <>
    <path d="M1.5 8S4 4 8 4s6.5 4 6.5 4-2.5 4-6.5 4-6.5-4-6.5-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
  </>
)

export const IcoSearch = ico(
  <>
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
)
