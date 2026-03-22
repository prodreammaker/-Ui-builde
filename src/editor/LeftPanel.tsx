import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useStore, COMPONENT_LABELS } from '../store'
import { TEMPLATES } from '../utils'
import {
  IcoButton, IcoCard, IcoInput, IcoBadge, IcoNavbar,
  IcoTable, IcoHero, IcoStats, IcoType, IcoForm,
  IcoGrid, IcoTemplate, IcoSearch,
} from '../Icons'

const PALETTE_ITEMS = [
  { type: 'button',  label: COMPONENT_LABELS.button,  Icon: IcoButton  },
  { type: 'card',    label: COMPONENT_LABELS.card,     Icon: IcoCard    },
  { type: 'input',   label: COMPONENT_LABELS.input,    Icon: IcoInput   },
  { type: 'badge',   label: COMPONENT_LABELS.badge,    Icon: IcoBadge   },
  { type: 'navbar',  label: COMPONENT_LABELS.navbar,   Icon: IcoNavbar  },
  { type: 'table',   label: COMPONENT_LABELS.table,    Icon: IcoTable   },
  { type: 'hero',    label: COMPONENT_LABELS.hero,     Icon: IcoHero    },
  { type: 'stats',   label: COMPONENT_LABELS.stats,    Icon: IcoStats   },
  { type: 'text',    label: COMPONENT_LABELS.text,     Icon: IcoType    },
  { type: 'form',    label: COMPONENT_LABELS.form,     Icon: IcoForm    },
]

function PaletteItem({ type, label, Icon }: { type: string; label: string; Icon: React.FC<{ size?: number; className?: string }> }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `add:${type}`,
    data: { type },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      role="button"
      aria-label={`Add ${label}`}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200 cursor-grab active:cursor-grabbing hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all select-none ${isDragging ? 'opacity-40 scale-95' : ''}`}
    >
      <Icon size={18} className="text-slate-500" />
      <span className="text-xs font-medium text-slate-600 leading-none">{label}</span>
    </div>
  )
}

function TemplateCard({ tpl }: { tpl: typeof TEMPLATES[0] }) {
  const { loadTemplate } = useStore()
  return (
    <button
      onClick={() => { if (!tpl.items.length || confirm('Load "' + tpl.name + '" template? This will replace your canvas.')) loadTemplate(tpl.items, tpl.tokens ?? {}) }}
      className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all group"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{tpl.icon}</span>
        <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">{tpl.name}</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{tpl.description}</p>
    </button>
  )
}

export default function LeftPanel() {
  const [tab,    setTab]    = useState<'library' | 'templates'>('library')
  const [search, setSearch] = useState('')

  const filtered = search
    ? PALETTE_ITEMS.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : PALETTE_ITEMS

  return (
    <aside className="w-[240px] shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 bg-white shrink-0">
        {([['library', 'Library', IcoGrid], ['templates', 'Templates', IcoTemplate]] as const).map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
              tab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'library' && (
        <>
          {/* Search */}
          <div className="p-2 shrink-0">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
              <IcoSearch size={13} className="text-slate-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components…"
                className="text-xs text-slate-700 placeholder-slate-400 outline-none flex-1 bg-transparent"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider px-1 mb-2">
              Drag to canvas
            </p>
            <div className="grid grid-cols-2 gap-2">
              {filtered.map((item) => (
                <PaletteItem key={item.type} {...item} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-xs">No results for "{search}"</div>
            )}
          </div>
        </>
      )}

      {tab === 'templates' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider px-1 mb-2">
            Starter templates
          </p>
          {TEMPLATES.map((tpl) => (
            <TemplateCard key={tpl.id} tpl={tpl} />
          ))}
        </div>
      )}
    </aside>
  )
}
