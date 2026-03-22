// Templates and project export utilities
import type { CanvasItem } from './store'
import type { DesignTokens } from './tokens'
import { generateCSS, generateJSON, generateTailwind } from './tokens'

// ---- Template definitions ----
export interface Template {
  id:          string
  name:        string
  description: string
  icon:        string
  items:       CanvasItem[]
  tokens?:     Partial<DesignTokens>
}

export const TEMPLATES: Template[] = [
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Data-rich layout with stats and tables',
    icon: '📊',
    items: [
      { id: 'tpl-1', type: 'navbar',  variant: 'default', label: 'Navbar',   props: { title: 'Dashboard' } },
      { id: 'tpl-2', type: 'stats',   variant: 'default', label: 'Stats',    props: {} },
      { id: 'tpl-3', type: 'table',   variant: 'default', label: 'Table',    props: { title: 'Recent Activity' } },
    ],
    tokens: { colorPrimary: '#3B82F6' },
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Marketing page with hero and CTA',
    icon: '🚀',
    items: [
      { id: 'tpl-1', type: 'navbar',  variant: 'default', label: 'Navbar',   props: { title: 'Startup' } },
      { id: 'tpl-2', type: 'hero',    variant: 'default', label: 'Hero',     props: { headline: 'Build faster than ever', subtext: 'The modern way to design and ship UI components.' } },
      { id: 'tpl-3', type: 'stats',   variant: 'default', label: 'Stats',    props: {} },
      { id: 'tpl-4', type: 'card',    variant: 'default', label: 'Card',     props: { title: 'Why choose us', description: 'Describe your key differentiator here.' } },
    ],
    tokens: { colorPrimary: '#8B5CF6', colorBackground: '#FAFAF9' },
  },
  {
    id: 'saas',
    name: 'SaaS App',
    description: 'App shell with forms and data',
    icon: '⚙️',
    items: [
      { id: 'tpl-1', type: 'navbar',  variant: 'default', label: 'Navbar',   props: { title: 'App' } },
      { id: 'tpl-2', type: 'form',    variant: 'default', label: 'Form',     props: { title: 'Account Settings' } },
      { id: 'tpl-3', type: 'divider', variant: 'default', label: 'Divider',  props: {} },
      { id: 'tpl-4', type: 'table',   variant: 'default', label: 'Table',    props: { title: 'Activity Log' } },
    ],
    tokens: { colorPrimary: '#0EA5E9' },
  },
  {
    id: 'profile',
    name: 'User Profile',
    description: 'Clean profile with stats and cards',
    icon: '👤',
    items: [
      { id: 'tpl-1', type: 'navbar',  variant: 'default', label: 'Navbar',   props: { title: 'Profile' } },
      { id: 'tpl-2', type: 'card',    variant: 'default', label: 'Info',     props: { title: 'About Me', description: 'Frontend developer with 5 years experience building beautiful interfaces.' } },
      { id: 'tpl-3', type: 'stats',   variant: 'default', label: 'Stats',    props: {} },
      { id: 'tpl-4', type: 'badge',   variant: 'default', label: 'Skills',   props: { text: 'React' } },
    ],
    tokens: { colorPrimary: '#10B981' },
  },
  {
    id: 'admin',
    name: 'Admin Panel',
    description: 'Management interface with tables',
    icon: '🛠',
    items: [
      { id: 'tpl-1', type: 'navbar',  variant: 'default', label: 'Navbar',   props: { title: 'Admin Console' } },
      { id: 'tpl-2', type: 'stats',   variant: 'default', label: 'Stats',    props: {} },
      { id: 'tpl-3', type: 'input',   variant: 'default', label: 'Search',   props: { label: 'Search users', placeholder: 'Type a name or email...' } },
      { id: 'tpl-4', type: 'table',   variant: 'default', label: 'Users',    props: { title: 'User Management' } },
    ],
    tokens: { colorPrimary: '#F43F5E' },
  },
]

// ---- Export helpers ----
export function downloadFile(filename: string, content: string, type = 'text/plain'): void {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).catch(() => {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  })
}

export function handleExport(format: 'css' | 'json' | 'tailwind', tokens: DesignTokens): void {
  switch (format) {
    case 'css':
      downloadFile('tokens.css', generateCSS(tokens), 'text/css')
      break
    case 'json':
      downloadFile('tokens.json', generateJSON(tokens), 'application/json')
      break
    case 'tailwind':
      downloadFile('tailwind.config.js', generateTailwind(tokens), 'text/javascript')
      break
  }
}
