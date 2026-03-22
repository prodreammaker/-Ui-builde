import React, { useState } from 'react'
import { useStore } from '../store'
import { generateCSS, generateJSON, generateTailwind, FONT_OPTIONS, defaultTokens } from '../tokens'
import { copyToClipboard } from '../utils'
import { IcoPalette, IcoSettings, IcoCode, IcoClose, IcoCopy, IcoEye } from '../Icons'
import type { DesignTokens } from '../tokens'

// ---- Simple mode panel ----
function SimplePanel() {
  const { tokens, updateToken, resetTokens } = useStore()
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Colors */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Colors</h3>
        <div className="space-y-3">
          <ColorRow label="Primary"    value={String(tokens.colorPrimary)}    onChange={(v) => updateToken('colorPrimary',    v)} />
          <ColorRow label="Background" value={String(tokens.colorBackground)} onChange={(v) => updateToken('colorBackground', v)} />
          <ColorRow label="Surface"    value={String(tokens.colorSurface)}    onChange={(v) => updateToken('colorSurface',    v)} />
          <ColorRow label="Text"       value={String(tokens.colorText)}       onChange={(v) => updateToken('colorText',       v)} />
        </div>
      </section>

      {/* Corner style */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Corner Style</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Sharp</span><span>Round</span>
          </div>
          <input
            type="range" min={0} max={24} step={2}
            value={Number(tokens.radiusMd)}
            onChange={(e) => {
              const v = Number(e.target.value)
              updateToken('radiusSm', Math.round(v * 0.5))
              updateToken('radiusMd', v)
              updateToken('radiusLg', Math.round(v * 1.8))
            }}
            className="w-full"
          />
        </div>
      </section>

      {/* Shadow */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shadow Depth</h3>
        <div className="grid grid-cols-4 gap-2">
          {(['None', 'Light', 'Medium', 'Heavy'] as const).map((label, i) => (
            <button
              key={label}
              onClick={() => updateToken('shadowDepth', i)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg text-xs border transition-all ${
                Number(tokens.shadowDepth) === i
                  ? 'bg-blue-50 border-blue-400 text-blue-600 font-semibold'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              <div style={{
                width: '24px', height: '16px', borderRadius: '4px', background: '#fff',
                boxShadow: i === 0 ? '0 0 0 1px #E2E8F0' : i === 1 ? '0 1px 4px rgba(0,0,0,0.12)' : i === 2 ? '0 4px 12px rgba(0,0,0,0.18)' : '0 8px 24px rgba(0,0,0,0.24)',
              }} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Spacing Scale</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Compact</span><span>Airy</span>
          </div>
          <input
            type="range" min={0.5} max={2} step={0.1}
            value={Number(tokens.spacingScale)}
            onChange={(e) => updateToken('spacingScale', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </section>

      {/* Font */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Font Style</h3>
        <select
          value={String(tokens.fontFamily)}
          onChange={(e) => updateToken('fontFamily', e.target.value)}
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:border-blue-400"
        >
          {FONT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </section>

      {/* Reset */}
      <button
        onClick={resetTokens}
        className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg transition-all"
      >
        Reset to defaults
      </button>
    </div>
  )
}

// ---- Advanced tokens panel ----
function TokensPanel() {
  const { tokens, updateToken, resetTokens } = useStore()

  const colorTokens: [string, keyof DesignTokens][] = [
    ['Primary',    'colorPrimary'],
    ['Secondary',  'colorSecondary'],
    ['Background', 'colorBackground'],
    ['Surface',    'colorSurface'],
    ['Border',     'colorBorder'],
    ['Text',       'colorText'],
    ['Text Muted', 'colorTextMuted'],
    ['Success',    'colorSuccess'],
    ['Warning',    'colorWarning'],
    ['Error',      'colorError'],
  ]

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5">
      {/* Colors */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Color Tokens</h3>
        <div className="space-y-2">
          {colorTokens.map(([label, key]) => (
            <div key={key} className="flex items-center gap-3">
              <input
                type="color"
                value={String(tokens[key])}
                onChange={(e) => updateToken(key, e.target.value)}
                className="rounded-lg border border-slate-200 cursor-pointer"
                style={{ width: '36px', height: '36px' }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-600">{label}</div>
                <div className="text-xs text-slate-400 font-mono">--t-{key.replace('color', '').toLowerCase()}</div>
              </div>
              <span className="text-xs font-mono text-slate-500">{String(tokens[key])}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shape */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shape Tokens</h3>
        <div className="space-y-3">
          {([['Radius SM', 'radiusSm', 0, 16], ['Radius MD', 'radiusMd', 0, 32], ['Radius LG', 'radiusLg', 0, 48]] as [string, keyof DesignTokens, number, number][]).map(([label, key, min, max]) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-slate-600">{label}</span>
                <span className="text-xs font-mono text-slate-400">{Number(tokens[key])}px</span>
              </div>
              <input
                type="range" min={min} max={max} step={1}
                value={Number(tokens[key])}
                onChange={(e) => updateToken(key, Number(e.target.value))}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Shadow */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shadow</h3>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-slate-600">Depth</span>
            <span className="text-xs font-mono text-slate-400">{Number(tokens.shadowDepth)}/3</span>
          </div>
          <input
            type="range" min={0} max={3} step={1}
            value={Number(tokens.shadowDepth)}
            onChange={(e) => updateToken('shadowDepth', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Spacing</h3>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-slate-600">Scale</span>
            <span className="text-xs font-mono text-slate-400">×{Number(tokens.spacingScale).toFixed(1)}</span>
          </div>
          <input
            type="range" min={0.5} max={2} step={0.1}
            value={Number(tokens.spacingScale)}
            onChange={(e) => updateToken('spacingScale', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </section>

      {/* Typography */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Typography</h3>
        <select
          value={String(tokens.fontFamily)}
          onChange={(e) => updateToken('fontFamily', e.target.value)}
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:border-blue-400"
        >
          {FONT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </section>

      <button
        onClick={resetTokens}
        className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg transition-all"
      >
        Reset to defaults
      </button>
    </div>
  )
}

// ---- Component props panel ----
function PropsPanel() {
  const { selectedId, items, updateItem } = useStore()
  const item = items.find((i) => i.id === selectedId)

  if (!item) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <IcoEye size={28} className="text-slate-300 mb-3" />
        <p className="text-sm text-slate-400">Select a component on the canvas to edit its properties</p>
      </div>
    )
  }

  const propDefs = ({
    button:  [{ key: 'text',        label: 'Button text',   type: 'text' }],
    card:    [{ key: 'title',       label: 'Title',         type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }],
    input:   [{ key: 'label',       label: 'Field label',   type: 'text' }, { key: 'placeholder', label: 'Placeholder', type: 'text' }],
    badge:   [{ key: 'text',        label: 'Badge text',    type: 'text' }],
    navbar:  [{ key: 'title',       label: 'Brand name',    type: 'text' }],
    table:   [{ key: 'title',       label: 'Table title',   type: 'text' }],
    hero:    [{ key: 'headline',    label: 'Headline',      type: 'text' }, { key: 'subtext', label: 'Subtext', type: 'textarea' }],
    text:    [{ key: 'content',     label: 'Content',       type: 'textarea' }],
    form:    [{ key: 'title',       label: 'Form title',    type: 'text' as const }],
  } as Record<string, { key: string; label: string; type: 'text' | 'textarea' }[]>)[item.type] ?? []

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.label}</div>
        <div className="text-xs text-blue-400 font-mono mt-0.5">id: {item.id.slice(-8)}</div>
      </div>
      <div className="space-y-3">
        {propDefs.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
            {type === 'textarea' ? (
              <textarea
                value={String(item.props[key] ?? '')}
                onChange={(e) => updateItem(item.id, { props: { [key]: e.target.value } })}
                rows={3}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 resize-none text-slate-700"
              />
            ) : (
              <input
                value={String(item.props[key] ?? '')}
                onChange={(e) => updateItem(item.id, { props: { [key]: e.target.value } })}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 text-slate-700"
              />
            )}
          </div>
        ))}
        {propDefs.length === 0 && (
          <p className="text-xs text-slate-400">No editable properties for this component.</p>
        )}
      </div>
    </div>
  )
}

// ---- Code export panel ----
function CodePanel() {
  const { tokens } = useStore()
  const [tab, setTab] = useState<'css' | 'json' | 'tw'>('css')
  const [copied, setCopied] = useState(false)

  const code = tab === 'css' ? generateCSS(tokens) : tab === 'json' ? generateJSON(tokens) : generateTailwind(tokens)
  const filename = tab === 'css' ? 'tokens.css' : tab === 'json' ? 'tokens.json' : 'tailwind.config.js'

  const copy = () => {
    copyToClipboard(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
        {(['css', 'json', 'tw'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              tab === t ? 'text-blue-600 border-b-2 border-blue-500 bg-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {t === 'tw' ? 'Tailwind' : t.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden relative">
        <button
          onClick={copy}
          className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 bg-white/90 border border-slate-200 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 shadow-sm transition-all"
        >
          <IcoCopy size={11} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="h-full overflow-auto p-4 text-xs font-mono text-slate-600 leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  )
}

// ---- Color row helper ----
function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer' }}
      />
      <div className="flex-1 flex items-center justify-between">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-xs font-mono text-slate-400">{value}</span>
      </div>
    </div>
  )
}

// ---- Root right panel ----
export default function RightPanel() {
  const { mode, selectedId } = useStore()
  const [advancedTab, setAdvancedTab] = useState<'tokens' | 'props' | 'code'>('tokens')

  if (mode === 'simple') {
    return (
      <aside className="w-[272px] shrink-0 bg-white border-l border-slate-200 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-white shrink-0 flex items-center gap-2">
          <IcoPalette size={14} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-700">Styles</h2>
        </div>
        <SimplePanel />
      </aside>
    )
  }

  return (
    <aside className="w-[288px] shrink-0 bg-white border-l border-slate-200 flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 bg-white shrink-0">
        {([
          ['tokens', 'Tokens',     IcoPalette],
          ['props',  'Props',      IcoSettings],
          ['code',   'Code',       IcoCode],
        ] as const).map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setAdvancedTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
              advancedTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            } ${id === 'props' && selectedId ? 'ring-1 ring-inset ring-blue-200' : ''}`}
          >
            <Icon size={12} />
            {label}
            {id === 'props' && selectedId && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />
            )}
          </button>
        ))}
      </div>

      {advancedTab === 'tokens' && <TokensPanel />}
      {advancedTab === 'props'  && <PropsPanel />}
      {advancedTab === 'code'   && <CodePanel />}
    </aside>
  )
}
