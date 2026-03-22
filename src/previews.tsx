// Canvas component preview renderers — all use CSS token variables
import React from 'react'
import type { CanvasItem } from './store'

type P = { item: CanvasItem }

// Convenience: inline style shorthand for CSS vars
const v = (name: string) => `var(${name})`

export function ComponentPreview({ item }: P): React.ReactElement {
  switch (item.type) {
    case 'button':  return <ButtonPreview item={item} />
    case 'card':    return <CardPreview item={item} />
    case 'input':   return <InputPreview item={item} />
    case 'badge':   return <BadgePreview item={item} />
    case 'navbar':  return <NavbarPreview item={item} />
    case 'table':   return <TablePreview item={item} />
    case 'hero':    return <HeroPreview item={item} />
    case 'stats':   return <StatsPreview />
    case 'text':    return <TextPreview item={item} />
    case 'divider': return <DividerPreview />
    case 'form':    return <FormPreview item={item} />
    default:        return <DefaultPreview item={item} />
  }
}

// ---- Button ----
function ButtonPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-surface'), display: 'flex', gap: v('--t-sp-3'), flexWrap: 'wrap', alignItems: 'center' }}>
      <button style={{ backgroundColor: v('--t-primary'), color: '#fff', border: 'none', borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-4')}`, fontFamily: v('--t-font'), fontSize: '14px', fontWeight: '500', cursor: 'default', boxShadow: v('--t-shadow') }}>
        {String(item.props.text ?? 'Primary')}
      </button>
      <button style={{ backgroundColor: 'transparent', color: v('--t-primary'), border: `1.5px solid ${v('--t-primary')}`, borderRadius: v('--t-radius-md'), padding: `calc(${v('--t-sp-2')} - 1px) calc(${v('--t-sp-4')} - 1px)`, fontFamily: v('--t-font'), fontSize: '14px', fontWeight: '500', cursor: 'default' }}>
        Outline
      </button>
      <button style={{ backgroundColor: v('--t-bg'), color: v('--t-text'), border: `1px solid ${v('--t-border')}`, borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-4')}`, fontFamily: v('--t-font'), fontSize: '14px', cursor: 'default' }}>
        Secondary
      </button>
      <button style={{ backgroundColor: 'transparent', color: v('--t-text-muted'), border: 'none', borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-3')}`, fontFamily: v('--t-font'), fontSize: '14px', cursor: 'default' }}>
        Ghost
      </button>
    </div>
  )
}

// ---- Card ----
function CardPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-bg') }}>
      <div style={{ backgroundColor: v('--t-surface'), borderRadius: v('--t-radius-lg'), padding: v('--t-sp-6'), boxShadow: v('--t-shadow'), border: `1px solid ${v('--t-border')}` }}>
        <div style={{ width: '40px', height: '40px', borderRadius: v('--t-radius-md'), backgroundColor: v('--t-primary'), opacity: 0.15, marginBottom: v('--t-sp-3') }} />
        <div style={{ fontFamily: v('--t-font'), fontSize: '16px', fontWeight: '600', color: v('--t-text'), marginBottom: v('--t-sp-2') }}>
          {String(item.props.title ?? 'Card Title')}
        </div>
        <div style={{ fontFamily: v('--t-font'), fontSize: '14px', color: v('--t-text-muted'), lineHeight: '1.6' }}>
          {String(item.props.description ?? 'Card description goes here.')}
        </div>
        <div style={{ marginTop: v('--t-sp-4'), display: 'flex', gap: v('--t-sp-2') }}>
          <button style={{ backgroundColor: v('--t-primary'), color: '#fff', border: 'none', borderRadius: v('--t-radius-sm'), padding: `6px 14px`, fontFamily: v('--t-font'), fontSize: '13px', fontWeight: '500', cursor: 'default' }}>
            Action
          </button>
          <button style={{ backgroundColor: 'transparent', color: v('--t-text-muted'), border: 'none', fontFamily: v('--t-font'), fontSize: '13px', cursor: 'default' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Input ----
function InputPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-surface'), display: 'flex', gap: v('--t-sp-4'), flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '160px' }}>
        <label style={{ fontFamily: v('--t-font'), fontSize: '13px', fontWeight: '500', color: v('--t-text'), display: 'block', marginBottom: v('--t-sp-1') }}>
          {String(item.props.label ?? 'Email address')}
        </label>
        <input readOnly placeholder={String(item.props.placeholder ?? 'you@example.com')} style={{ width: '100%', fontFamily: v('--t-font'), fontSize: '14px', color: v('--t-text'), backgroundColor: v('--t-bg'), border: `1px solid ${v('--t-border')}`, borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-3')}`, outline: 'none', boxSizing: 'border-box' }} />
      </div>
      <div style={{ flex: 1, minWidth: '160px' }}>
        <label style={{ fontFamily: v('--t-font'), fontSize: '13px', fontWeight: '500', color: v('--t-text'), display: 'block', marginBottom: v('--t-sp-1') }}>
          Password
        </label>
        <input readOnly type="password" placeholder="••••••••" style={{ width: '100%', fontFamily: v('--t-font'), fontSize: '14px', border: `1px solid ${v('--t-primary')}`, borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-3')}`, outline: 'none', boxShadow: `0 0 0 3px ${v('--t-primary')}22`, boxSizing: 'border-box' }} />
      </div>
    </div>
  )
}

// ---- Badge ----
function BadgePreview({ item }: P) {
  const badge = (label: string, bg: string, color: string) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: bg, color, borderRadius: v('--t-radius-full'), padding: `3px 10px`, fontFamily: v('--t-font'), fontSize: '12px', fontWeight: '500' }}>
      {label}
    </span>
  )
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-surface'), display: 'flex', gap: v('--t-sp-2'), flexWrap: 'wrap', alignItems: 'center' }}>
      {badge(String(item.props.text ?? 'New'), `${v('--t-primary')}1A`, v('--t-primary'))}
      {badge('Success', `${v('--t-success')}1A`, v('--t-success'))}
      {badge('Warning', `${v('--t-warning')}1A`, v('--t-warning'))}
      {badge('Error',   `${v('--t-error')}1A`,   v('--t-error'))}
      <span style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${v('--t-border')}`, color: v('--t-text-muted'), borderRadius: v('--t-radius-full'), padding: `3px 10px`, fontFamily: v('--t-font'), fontSize: '12px' }}>Outline</span>
    </div>
  )
}

// ---- Navbar ----
function NavbarPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ backgroundColor: v('--t-surface'), borderBottom: `1px solid ${v('--t-border')}`, padding: `${v('--t-sp-3')} ${v('--t-sp-6')}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: v('--t-sp-3') }}>
        <div style={{ width: '28px', height: '28px', borderRadius: v('--t-radius-sm'), backgroundColor: v('--t-primary') }} />
        <span style={{ fontFamily: v('--t-font'), fontSize: '15px', fontWeight: '600', color: v('--t-text') }}>
          {String(item.props.title ?? 'My App')}
        </span>
      </div>
      <div style={{ display: 'flex', gap: v('--t-sp-4'), alignItems: 'center' }}>
        {['Home', 'About', 'Pricing'].map((l) => (
          <span key={l} style={{ fontFamily: v('--t-font'), fontSize: '14px', color: v('--t-text-muted'), cursor: 'default' }}>{l}</span>
        ))}
        <button style={{ backgroundColor: v('--t-primary'), color: '#fff', border: 'none', borderRadius: v('--t-radius-md'), padding: `6px 16px`, fontFamily: v('--t-font'), fontSize: '13px', fontWeight: '500', cursor: 'default' }}>
          Sign up
        </button>
      </div>
    </div>
  )
}

// ---- Table ----
function TablePreview({ item }: P) {
  const rows = [
    { name: 'Alice Johnson', status: 'Active', date: 'Mar 12', amount: '$240' },
    { name: 'Bob Chen',      status: 'Pending', date: 'Mar 10', amount: '$120' },
    { name: 'Carol White',   status: 'Active', date: 'Mar 8', amount: '$380' },
  ]
  const statusColor = (s: string) => s === 'Active' ? v('--t-success') : v('--t-warning')
  const statusBg    = (s: string) => s === 'Active' ? `${v('--t-success')}18` : `${v('--t-warning')}18`
  return (
    <div data-canvas-item style={{ backgroundColor: v('--t-surface'), borderBottom: 'none' }}>
      <div style={{ padding: `${v('--t-sp-4')} ${v('--t-sp-6')}`, borderBottom: `1px solid ${v('--t-border')}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: v('--t-font'), fontSize: '15px', fontWeight: '600', color: v('--t-text') }}>
          {String(item.props.title ?? 'Recent Activity')}
        </span>
        <button style={{ backgroundColor: v('--t-bg'), border: `1px solid ${v('--t-border')}`, borderRadius: v('--t-radius-sm'), padding: `4px 12px`, fontFamily: v('--t-font'), fontSize: '12px', color: v('--t-text-muted'), cursor: 'default' }}>
          Filter
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: v('--t-font') }}>
        <thead>
          <tr style={{ backgroundColor: v('--t-bg') }}>
            {['Name','Status','Date','Amount'].map((h) => (
              <th key={h} style={{ padding: `${v('--t-sp-2')} ${v('--t-sp-4')}`, textAlign: 'left', fontSize: '11px', fontWeight: '600', color: v('--t-text-muted'), textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${v('--t-border')}` }}>
              <td style={{ padding: `${v('--t-sp-3')} ${v('--t-sp-4')}`, fontSize: '14px', color: v('--t-text'), fontWeight: '500' }}>{row.name}</td>
              <td style={{ padding: `${v('--t-sp-3')} ${v('--t-sp-4')}` }}>
                <span style={{ backgroundColor: statusBg(row.status), color: statusColor(row.status), borderRadius: v('--t-radius-full'), padding: '2px 9px', fontSize: '12px', fontWeight: '500' }}>
                  {row.status}
                </span>
              </td>
              <td style={{ padding: `${v('--t-sp-3')} ${v('--t-sp-4')}`, fontSize: '13px', color: v('--t-text-muted') }}>{row.date}</td>
              <td style={{ padding: `${v('--t-sp-3')} ${v('--t-sp-4')}`, fontSize: '14px', color: v('--t-text'), fontWeight: '600' }}>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---- Hero ----
function HeroPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: `${v('--t-sp-8')} ${v('--t-sp-6')}`, backgroundColor: v('--t-surface'), textAlign: 'center' }}>
      <div style={{ display: 'inline-block', backgroundColor: `${v('--t-primary')}18`, color: v('--t-primary'), borderRadius: v('--t-radius-full'), padding: '4px 14px', fontFamily: v('--t-font'), fontSize: '12px', fontWeight: '600', marginBottom: v('--t-sp-4') }}>
        ✦ New release
      </div>
      <h1 style={{ fontFamily: v('--t-font'), fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: '700', color: v('--t-text'), margin: `0 0 ${v('--t-sp-3')}`, lineHeight: '1.2' }}>
        {String(item.props.headline ?? 'Build Something Amazing')}
      </h1>
      <p style={{ fontFamily: v('--t-font'), fontSize: '16px', color: v('--t-text-muted'), maxWidth: '480px', margin: `0 auto ${v('--t-sp-6')}`, lineHeight: '1.6' }}>
        {String(item.props.subtext ?? 'Start your project with a clean, modern foundation.')}
      </p>
      <div style={{ display: 'flex', gap: v('--t-sp-3'), justifyContent: 'center', flexWrap: 'wrap' }}>
        <button style={{ backgroundColor: v('--t-primary'), color: '#fff', border: 'none', borderRadius: v('--t-radius-md'), padding: `10px 24px`, fontFamily: v('--t-font'), fontSize: '14px', fontWeight: '600', cursor: 'default', boxShadow: v('--t-shadow') }}>
          Get started free
        </button>
        <button style={{ backgroundColor: 'transparent', color: v('--t-text'), border: `1px solid ${v('--t-border')}`, borderRadius: v('--t-radius-md'), padding: `10px 24px`, fontFamily: v('--t-font'), fontSize: '14px', cursor: 'default' }}>
          Learn more →
        </button>
      </div>
    </div>
  )
}

// ---- Stats ----
function StatsPreview() {
  const stats = [
    { label: 'Total Users',  value: '24,521', delta: '+12%' },
    { label: 'Revenue',      value: '$12,450', delta: '+8.4%' },
    { label: 'Growth',       value: '18.2%',   delta: '+2.1%' },
    { label: 'Active Today', value: '4,832',   delta: '+5%' },
  ]
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-4'), backgroundColor: v('--t-bg'), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: v('--t-sp-3') }}>
      {stats.map((s) => (
        <div key={s.label} style={{ backgroundColor: v('--t-surface'), borderRadius: v('--t-radius-lg'), padding: v('--t-sp-4'), boxShadow: v('--t-shadow'), border: `1px solid ${v('--t-border')}` }}>
          <div style={{ fontFamily: v('--t-font'), fontSize: '11px', color: v('--t-text-muted'), textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{s.label}</div>
          <div style={{ fontFamily: v('--t-font'), fontSize: '22px', fontWeight: '700', color: v('--t-text') }}>{s.value}</div>
          <div style={{ fontFamily: v('--t-font'), fontSize: '12px', color: v('--t-success'), marginTop: '4px', fontWeight: '500' }}>{s.delta}</div>
        </div>
      ))}
    </div>
  )
}

// ---- Text ----
function TextPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-surface') }}>
      <p style={{ fontFamily: v('--t-font'), fontSize: '15px', color: v('--t-text'), lineHeight: '1.7', margin: 0 }}>
        {String(item.props.content ?? 'This is a text block. Edit it to add your content.')}
      </p>
    </div>
  )
}

// ---- Divider ----
function DividerPreview() {
  return (
    <div data-canvas-item style={{ padding: `${v('--t-sp-4')} ${v('--t-sp-6')}`, backgroundColor: v('--t-surface') }}>
      <hr style={{ border: 'none', borderTop: `1px solid ${v('--t-border')}`, margin: 0 }} />
    </div>
  )
}

// ---- Form ----
function FormPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-surface') }}>
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ fontFamily: v('--t-font'), fontSize: '18px', fontWeight: '600', color: v('--t-text'), marginBottom: v('--t-sp-4'), marginTop: 0 }}>
          {String(item.props.title ?? 'Get in Touch')}
        </h3>
        {['Full name', 'Email address'].map((label) => (
          <div key={label} style={{ marginBottom: v('--t-sp-3') }}>
            <label style={{ fontFamily: v('--t-font'), fontSize: '13px', fontWeight: '500', color: v('--t-text'), display: 'block', marginBottom: '4px' }}>{label}</label>
            <input readOnly style={{ width: '100%', fontFamily: v('--t-font'), fontSize: '14px', border: `1px solid ${v('--t-border')}`, borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-3')}`, backgroundColor: v('--t-bg'), boxSizing: 'border-box', color: v('--t-text') }} />
          </div>
        ))}
        <div style={{ marginBottom: v('--t-sp-4') }}>
          <label style={{ fontFamily: v('--t-font'), fontSize: '13px', fontWeight: '500', color: v('--t-text'), display: 'block', marginBottom: '4px' }}>Message</label>
          <textarea readOnly rows={3} style={{ width: '100%', fontFamily: v('--t-font'), fontSize: '14px', border: `1px solid ${v('--t-border')}`, borderRadius: v('--t-radius-md'), padding: `${v('--t-sp-2')} ${v('--t-sp-3')}`, backgroundColor: v('--t-bg'), resize: 'none', boxSizing: 'border-box' }} />
        </div>
        <button style={{ width: '100%', backgroundColor: v('--t-primary'), color: '#fff', border: 'none', borderRadius: v('--t-radius-md'), padding: `10px 0`, fontFamily: v('--t-font'), fontSize: '14px', fontWeight: '600', cursor: 'default', boxShadow: v('--t-shadow') }}>
          Send message
        </button>
      </div>
    </div>
  )
}

// ---- Default fallback ----
function DefaultPreview({ item }: P) {
  return (
    <div data-canvas-item style={{ padding: v('--t-sp-6'), backgroundColor: v('--t-surface'), textAlign: 'center', color: v('--t-text-muted'), fontFamily: v('--t-font'), fontSize: '14px' }}>
      {item.type} component
    </div>
  )
}
