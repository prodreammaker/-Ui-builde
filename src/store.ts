import { create } from 'zustand'
import { arrayMove } from '@dnd-kit/sortable'
import type { DesignTokens } from './tokens'
import { defaultTokens } from './tokens'

export type AppMode = 'simple' | 'advanced'

export interface CanvasItem {
  id:      string
  type:    string
  variant: string
  label:   string
  props:   Record<string, unknown>
}

interface AppStore {
  mode:       AppMode
  selectedId: string | null
  items:      CanvasItem[]
  tokens:     DesignTokens
  past:       CanvasItem[][]
  future:     CanvasItem[][]
  projectName: string

  setMode:       (m: AppMode) => void
  select:        (id: string | null) => void
  addItem:       (item: CanvasItem) => void
  removeItem:    (id: string) => void
  updateItem:    (id: string, patch: Partial<CanvasItem> & { props?: Partial<Record<string, unknown>> }) => void
  reorder:       (items: CanvasItem[]) => void
  updateToken:   (key: keyof DesignTokens, value: string | number) => void
  resetTokens:   () => void
  undo:          () => void
  redo:          () => void
  clear:         () => void
  loadTemplate:  (items: CanvasItem[], tokens?: Partial<DesignTokens>) => void
  setProjectName:(name: string) => void
  getExportData: () => string
  importData:    (json: string) => void
}

const pushPast = (past: CanvasItem[][], cur: CanvasItem[]) =>
  [...past, cur].slice(-50)

export const useStore = create<AppStore>((set, get) => ({
  mode:        'simple',
  selectedId:  null,
  items:       [],
  tokens:      { ...defaultTokens },
  past:        [],
  future:      [],
  projectName: 'Untitled Project',

  setMode: (mode) => set({ mode }),

  select: (selectedId) => set({ selectedId }),

  addItem: (item) => set((s) => ({
    past:       pushPast(s.past, s.items),
    future:     [],
    items:      [...s.items, item],
    selectedId: item.id,
  })),

  removeItem: (id) => set((s) => ({
    past:       pushPast(s.past, s.items),
    future:     [],
    items:      s.items.filter((i) => i.id !== id),
    selectedId: s.selectedId === id ? null : s.selectedId,
  })),

  updateItem: (id, patch) => set((s) => ({
    items: s.items.map((i) =>
      i.id !== id ? i : {
        ...i,
        ...patch,
        props: { ...i.props, ...(patch.props ?? {}) },
      }
    ),
  })),

  reorder: (items) => set((s) => ({
    past:   pushPast(s.past, s.items),
    future: [],
    items,
  })),

  updateToken: (key, value) => set((s) => ({
    tokens: { ...s.tokens, [key]: value },
  })),

  resetTokens: () => set({ tokens: { ...defaultTokens } }),

  undo: () => set((s) => {
    if (!s.past.length) return s
    const past   = [...s.past]
    const items  = past.pop()!
    return { past, future: [s.items, ...s.future].slice(0, 50), items }
  }),

  redo: () => set((s) => {
    if (!s.future.length) return s
    const future = [...s.future]
    const items  = future.shift()!
    return { future, past: [...s.past, s.items].slice(-50), items }
  }),

  clear: () => set((s) => ({
    past:       pushPast(s.past, s.items),
    future:     [],
    items:      [],
    selectedId: null,
  })),

  loadTemplate: (tplItems, tplTokens) => set((s) => ({
    past:       pushPast(s.past, s.items),
    future:     [],
    items:      tplItems.map((i) => ({ ...i, id: `${i.id}-${Date.now()}` })),
    tokens:     tplTokens ? { ...s.tokens, ...tplTokens } : s.tokens,
    selectedId: null,
  })),

  setProjectName: (projectName) => set({ projectName }),

  getExportData: () => {
    const { projectName, items, tokens } = get()
    return JSON.stringify({ projectName, items, tokens }, null, 2)
  },

  importData: (json) => {
    try {
      const data = JSON.parse(json) as { projectName?: string; items?: CanvasItem[]; tokens?: DesignTokens }
      set((s) => ({
        past:        pushPast(s.past, s.items),
        future:      [],
        items:       data.items     ?? s.items,
        tokens:      data.tokens    ? { ...defaultTokens, ...data.tokens } : s.tokens,
        projectName: data.projectName ?? s.projectName,
        selectedId:  null,
      }))
    } catch {
      alert('Invalid project file.')
    }
  },
}))

// Helpers used across components
export const COMPONENT_LABELS: Record<string, string> = {
  button:  'Button',
  card:    'Card',
  input:   'Input',
  badge:   'Badge',
  navbar:  'Navbar',
  table:   'Table',
  hero:    'Hero Section',
  stats:   'Stats Row',
  text:    'Text Block',
  divider: 'Divider',
  form:    'Form',
}

export function getComponentLabel(type: string): string {
  return COMPONENT_LABELS[type] ?? type
}

export function getDefaultProps(type: string): Record<string, unknown> {
  switch (type) {
    case 'button':  return { text: 'Get Started' }
    case 'card':    return { title: 'Card Title', description: 'This is a description for the card component. Edit to customize.' }
    case 'input':   return { label: 'Email address', placeholder: 'you@example.com' }
    case 'badge':   return { text: 'New Feature' }
    case 'navbar':  return { title: 'My App' }
    case 'table':   return { title: 'Recent Activity' }
    case 'hero':    return { headline: 'Build Something Amazing', subtext: 'Start your project with a clean, modern foundation.' }
    case 'stats':   return {}
    case 'text':    return { content: 'This is an editable text block. Use it for headings, paragraphs, or any content you need.' }
    case 'divider': return {}
    case 'form':    return { title: 'Get in Touch' }
    default:        return {}
  }
}
