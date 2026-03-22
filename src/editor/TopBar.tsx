import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../store'
import { handleExport } from '../utils'
import {
  IcoUndo, IcoRedo, IcoSave, IcoDownload, IcoChevronDown,
  IcoToggle, IcoCode,
} from '../Icons'

export default function TopBar() {
  const {
    projectName, setProjectName,
    mode, setMode,
    tokens,
    undo, redo,
    past, future,
    getExportData, importData,
    clear,
  } = useStore()

  const [editingName, setEditingName] = useState(false)
  const [nameDraft,   setNameDraft]   = useState(projectName)
  const [showExport,  setShowExport]  = useState(false)
  const nameRef   = useRef<HTMLInputElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editingName) nameRef.current?.select()
  }, [editingName])

  // Close export dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!exportRef.current?.contains(e.target as Node)) setShowExport(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const commitName = () => {
    setProjectName(nameDraft.trim() || 'Untitled Project')
    setEditingName(false)
  }

  const handleSave = () => {
    const data = getExportData()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }))
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.uibuilder.json`
    a.click()
  }

  const handleLoad = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => importData(String(ev.target?.result ?? ''))
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <header className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-3 shrink-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect width="22" height="22" rx="6" fill="#3B82F6"/>
          <rect x="5" y="5" width="5" height="5" rx="1.5" fill="white"/>
          <rect x="12" y="5" width="5" height="5" rx="1.5" fill="white" opacity=".6"/>
          <rect x="5" y="12" width="5" height="5" rx="1.5" fill="white" opacity=".6"/>
          <rect x="12" y="12" width="5" height="5" rx="1.5" fill="white" opacity=".3"/>
        </svg>
        <span className="text-white font-semibold text-sm hidden sm:block">UI Builder</span>
      </div>

      <div className="w-px h-5 bg-slate-700 mx-1 shrink-0" />

      {/* Project name */}
      {editingName ? (
        <input
          ref={nameRef}
          value={nameDraft}
          onChange={(e) => setNameDraft(e.target.value)}
          onBlur={commitName}
          onKeyDown={(e) => { if (e.key === 'Enter') commitName(); if (e.key === 'Escape') { setNameDraft(projectName); setEditingName(false) } }}
          className="bg-slate-800 text-white text-sm font-medium border border-blue-500 rounded px-2 py-1 outline-none w-48"
        />
      ) : (
        <button
          onClick={() => { setNameDraft(projectName); setEditingName(true) }}
          className="text-slate-300 text-sm font-medium hover:text-white transition-colors truncate max-w-[180px]"
          title="Click to rename"
        >
          {projectName}
        </button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Undo / Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!past.length}
          className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Undo (Ctrl+Z)"
        >
          <IcoUndo size={15} />
        </button>
        <button
          onClick={redo}
          disabled={!future.length}
          className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Redo (Ctrl+Y)"
        >
          <IcoRedo size={15} />
        </button>
      </div>

      <div className="w-px h-5 bg-slate-700 mx-1 shrink-0" />

      {/* Clear canvas */}
      <button
        onClick={() => { if (confirm('Clear all canvas items?')) clear() }}
        className="px-3 py-1.5 text-slate-400 hover:text-white text-xs font-medium hover:bg-slate-800 rounded transition-all"
      >
        Clear
      </button>

      {/* Mode toggle */}
      <button
        onClick={() => setMode(mode === 'simple' ? 'advanced' : 'simple')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
          mode === 'advanced'
            ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
        }`}
        title="Toggle Simple / Advanced mode"
      >
        <IcoCode size={12} />
        {mode === 'advanced' ? 'Pro Mode' : 'Simple Mode'}
        <IcoToggle size={14} className={mode === 'advanced' ? 'text-blue-400' : 'text-slate-500'} />
      </button>

      {/* Save */}
      <button
        onClick={handleSave}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-slate-300 hover:text-white text-xs font-medium transition-all"
        title="Save project JSON"
      >
        <IcoSave size={13} />
        Save
      </button>

      {/* Export dropdown */}
      <div className="relative" ref={exportRef}>
        <button
          onClick={() => setShowExport((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-white text-xs font-semibold transition-all"
        >
          <IcoDownload size={13} />
          Export
          <IcoChevronDown size={12} />
        </button>

        {showExport && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
            {([
              ['css',     'tokens.css',          'CSS Variables'],
              ['json',    'tokens.json',          'JSON Tokens'],
              ['tailwind','tailwind.config.js',   'Tailwind Config'],
            ] as const).map(([format, file, label]) => (
              <button
                key={format}
                onClick={() => { handleExport(format, tokens); setShowExport(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <IcoDownload size={13} className="text-slate-500" />
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-slate-500">{file}</div>
                </div>
              </button>
            ))}
            <div className="border-t border-slate-700 my-1" />
            <button
              onClick={() => { handleLoad(); setShowExport(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <IcoCode size={13} className="text-slate-500" />
              <div>
                <div className="font-medium">Import Project</div>
                <div className="text-xs text-slate-500">.uibuilder.json</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
