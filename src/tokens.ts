// Design token system — all visual primitives

export interface DesignTokens {
  colorPrimary:    string
  colorSecondary:  string
  colorBackground: string
  colorSurface:    string
  colorBorder:     string
  colorText:       string
  colorTextMuted:  string
  colorSuccess:    string
  colorWarning:    string
  colorError:      string
  radiusSm:   number  // px
  radiusMd:   number
  radiusLg:   number
  shadowDepth: number  // 0=none, 1=sm, 2=md, 3=lg
  spacingScale: number // multiplier 0.5–2.0
  fontFamily:  string
}

export const defaultTokens: DesignTokens = {
  colorPrimary:    '#3B82F6',
  colorSecondary:  '#8B5CF6',
  colorBackground: '#F8FAFC',
  colorSurface:    '#FFFFFF',
  colorBorder:     '#E2E8F0',
  colorText:       '#0F172A',
  colorTextMuted:  '#64748B',
  colorSuccess:    '#10B981',
  colorWarning:    '#F59E0B',
  colorError:      '#EF4444',
  radiusSm:    4,
  radiusMd:    8,
  radiusLg:    16,
  shadowDepth: 1,
  spacingScale: 1,
  fontFamily: '"DM Sans", system-ui, sans-serif',
}

const SHADOWS: Record<number, string> = {
  0: 'none',
  1: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  2: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
  3: '0 10px 40px rgba(0,0,0,0.14), 0 4px 10px rgba(0,0,0,0.07)',
}

export const FONT_OPTIONS = [
  { label: 'Modern (DM Sans)', value: '"DM Sans", system-ui, sans-serif' },
  { label: 'Classic (Georgia)', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Monospace', value: '"JetBrains Mono", "Courier New", monospace' },
  { label: 'Geometric (Futura)', value: 'Futura, "Century Gothic", sans-serif' },
]

// Apply tokens to document CSS variables
export function applyTokens(t: DesignTokens): void {
  const r = document.documentElement
  const sp = t.spacingScale
  r.style.setProperty('--t-primary',    t.colorPrimary)
  r.style.setProperty('--t-secondary',  t.colorSecondary)
  r.style.setProperty('--t-bg',         t.colorBackground)
  r.style.setProperty('--t-surface',    t.colorSurface)
  r.style.setProperty('--t-border',     t.colorBorder)
  r.style.setProperty('--t-text',       t.colorText)
  r.style.setProperty('--t-text-muted', t.colorTextMuted)
  r.style.setProperty('--t-success',    t.colorSuccess)
  r.style.setProperty('--t-warning',    t.colorWarning)
  r.style.setProperty('--t-error',      t.colorError)
  r.style.setProperty('--t-radius-sm',  `${t.radiusSm}px`)
  r.style.setProperty('--t-radius-md',  `${t.radiusMd}px`)
  r.style.setProperty('--t-radius-lg',  `${t.radiusLg}px`)
  r.style.setProperty('--t-shadow',     SHADOWS[Math.min(t.shadowDepth, 3)] ?? SHADOWS[1])
  r.style.setProperty('--t-font',       t.fontFamily)
  r.style.setProperty('--t-sp-1',  `${Math.round(4  * sp)}px`)
  r.style.setProperty('--t-sp-2',  `${Math.round(8  * sp)}px`)
  r.style.setProperty('--t-sp-3',  `${Math.round(12 * sp)}px`)
  r.style.setProperty('--t-sp-4',  `${Math.round(16 * sp)}px`)
  r.style.setProperty('--t-sp-6',  `${Math.round(24 * sp)}px`)
  r.style.setProperty('--t-sp-8',  `${Math.round(32 * sp)}px`)
}

// Generate CSS custom properties string for export
export function generateCSS(t: DesignTokens): string {
  const sp = t.spacingScale
  return `:root {
  /* --- Colors --- */
  --t-primary:    ${t.colorPrimary};
  --t-secondary:  ${t.colorSecondary};
  --t-bg:         ${t.colorBackground};
  --t-surface:    ${t.colorSurface};
  --t-border:     ${t.colorBorder};
  --t-text:       ${t.colorText};
  --t-text-muted: ${t.colorTextMuted};
  --t-success:    ${t.colorSuccess};
  --t-warning:    ${t.colorWarning};
  --t-error:      ${t.colorError};

  /* --- Radius --- */
  --t-radius-sm:  ${t.radiusSm}px;
  --t-radius-md:  ${t.radiusMd}px;
  --t-radius-lg:  ${t.radiusLg}px;
  --t-radius-full: 9999px;

  /* --- Shadow --- */
  --t-shadow: ${SHADOWS[Math.min(t.shadowDepth, 3)] ?? SHADOWS[1]};

  /* --- Typography --- */
  --t-font: ${t.fontFamily};

  /* --- Spacing --- */
  --t-sp-1: ${Math.round(4  * sp)}px;
  --t-sp-2: ${Math.round(8  * sp)}px;
  --t-sp-3: ${Math.round(12 * sp)}px;
  --t-sp-4: ${Math.round(16 * sp)}px;
  --t-sp-6: ${Math.round(24 * sp)}px;
  --t-sp-8: ${Math.round(32 * sp)}px;
}`
}

export function generateJSON(t: DesignTokens): string {
  return JSON.stringify(t, null, 2)
}

export function generateTailwind(t: DesignTokens): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary:    '${t.colorPrimary}',
        secondary:  '${t.colorSecondary}',
        background: '${t.colorBackground}',
        surface:    '${t.colorSurface}',
        success:    '${t.colorSuccess}',
        warning:    '${t.colorWarning}',
        error:      '${t.colorError}',
      },
      borderRadius: {
        sm: '${t.radiusSm}px',
        md: '${t.radiusMd}px',
        lg: '${t.radiusLg}px',
      },
      fontFamily: { sans: [${JSON.stringify(t.fontFamily)}] },
    },
  },
}`
}
