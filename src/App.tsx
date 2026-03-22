import React, { useEffect, useCallback } from 'react'
import {
  DndContext, DragEndEvent, DragOverlay,
  PointerSensor, useSensor, useSensors, DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useStore, getDefaultProps, getComponentLabel } from './store'
import { applyTokens } from './tokens'
import TopBar    from './editor/TopBar'
import LeftPanel from './editor/LeftPanel'
import Canvas    from './editor/Canvas'
import RightPanel from './editor/RightPanel'

// Ghost shown during drag from palette
function PaletteDragGhost({ id }: { id: string }) {
  if (!id.startsWith('add:')) return null
  const type = id.slice(4)
  return (
    <div className="px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-2xl opacity-90 pointer-events-none flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {getComponentLabel(type)}
    </div>
  )
}

export default function App() {
  const { tokens, items, addItem, reorder, undo, redo } = useStore()
  const [activeDragId, setActiveDragId] = React.useState<string | null>(null)

  // Apply token CSS variables whenever tokens change
  useEffect(() => { applyTokens(tokens) }, [tokens])

  // Global keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const mod = e.ctrlKey || e.metaKey
    if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
    if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
  }, [undo, redo])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragId(String(e.active.id))
  }

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = e
    if (!over) return

    const activeId = String(active.id)
    const overId   = String(over.id)

    if (activeId.startsWith('add:')) {
      // Drop from palette — add new item
      const type = activeId.slice(4)
      addItem({
        id:      `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type,
        variant: 'default',
        label:   getComponentLabel(type),
        props:   getDefaultProps(type),
      })
    } else if (activeId !== overId && !overId.startsWith('add:') && overId !== 'canvas-drop') {
      // Reorder existing canvas items
      const oldIdx = items.findIndex((i) => i.id === activeId)
      const newIdx = items.findIndex((i) => i.id === overId)
      if (oldIdx !== -1 && newIdx !== -1) {
        reorder(arrayMove(items, oldIdx, newIdx))
      }
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-slate-950 overflow-hidden font-sans">
        <TopBar />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <LeftPanel />
          <Canvas />
          <RightPanel />
        </div>
      </div>
      <DragOverlay dropAnimation={{ duration: 120, easing: 'ease' }}>
        {activeDragId ? <PaletteDragGhost id={activeDragId} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
