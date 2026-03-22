import React from 'react'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '../store'
import { ComponentPreview } from '../previews'
import { IcoDragHandle, IcoTrash, IcoCopy, IcoPlus } from '../Icons'
import type { CanvasItem } from '../store'
import { getDefaultProps, getComponentLabel } from '../store'

// ---- Sortable canvas item wrapper ----
function SortableItem({ item }: { item: CanvasItem }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const { selectedId, select, removeItem, addItem, updateItem } = useStore()
  const isSelected = selectedId === item.id

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
  }

  const duplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({ ...item, id: `item-${Date.now()}`, props: { ...item.props } })
  }

  const del = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeItem(item.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => select(item.id)}
      className={`group relative rounded-xl transition-all duration-150 outline-none ${
        isDragging  ? 'opacity-30 z-50' : ''
      } ${
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2'
          : 'hover:ring-1 hover:ring-blue-300 hover:ring-offset-1'
      }`}
    >
      {/* Overflow clip for the preview */}
      <div className="overflow-hidden rounded-xl">
        <ComponentPreview item={item} />
      </div>

      {/* Drag handle — appears on hover */}
      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white rounded-lg shadow-md cursor-grab active:cursor-grabbing border border-slate-100"
        title="Drag to reorder"
      >
        <IcoDragHandle size={12} className="text-slate-400" />
      </div>

      {/* Action toolbar — shown when selected */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <button
            onClick={duplicate}
            className="p-1.5 bg-white rounded-lg shadow-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 transition-colors"
            title="Duplicate"
          >
            <IcoCopy size={12} />
          </button>
          <button
            onClick={del}
            className="p-1.5 bg-white rounded-lg shadow-md text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-100 transition-colors"
            title="Delete"
          >
            <IcoTrash size={12} />
          </button>
        </div>
      )}

      {/* Type badge */}
      {isSelected && (
        <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full pointer-events-none">
          {item.label}
        </div>
      )}
    </div>
  )
}

// ---- Empty canvas drop zone ----
function EmptyDropZone() {
  const { isOver, setNodeRef } = useDroppable({ id: 'canvas-drop' })
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center justify-center py-24 px-8 rounded-2xl border-2 border-dashed transition-all ${
        isOver ? 'border-blue-400 bg-blue-50' : 'border-slate-200'
      }`}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mb-4">
        <rect width="56" height="56" rx="16" fill="#EFF6FF"/>
        <rect x="16" y="16" width="10" height="10" rx="3" fill="#93C5FD"/>
        <rect x="30" y="16" width="10" height="10" rx="3" fill="#BFDBFE"/>
        <rect x="16" y="30" width="10" height="10" rx="3" fill="#BFDBFE"/>
        <rect x="30" y="30" width="10" height="10" rx="3" fill="#DBEAFE"/>
        <path d="M40 42l4 4M38 40a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <h3 className="text-base font-semibold text-slate-600 mb-1">Canvas is empty</h3>
      <p className="text-sm text-slate-400 text-center max-w-xs leading-relaxed">
        Drag components from the left panel, or pick a template to get started instantly.
      </p>
      {isOver && (
        <div className="mt-4 flex items-center gap-2 text-blue-500 font-semibold text-sm animate-pulse">
          <IcoPlus size={16} />
          Drop to add component
        </div>
      )}
    </div>
  )
}

// ---- Main canvas ----
export default function Canvas() {
  const { items, select, selectedId } = useStore()

  return (
    <main
      className="flex-1 overflow-auto bg-slate-100 flex flex-col"
      style={{ backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      onClick={() => select(null)}
    >
      <div className="flex-1 flex items-start justify-center p-8 min-h-full">
        <div
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[480px]"
          onClick={(e) => e.stopPropagation()}
        >
          {items.length === 0 ? (
            <div className="p-8">
              <EmptyDropZone />
            </div>
          ) : (
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <div className="p-3 space-y-2">
                {items.map((item) => (
                  <SortableItem key={item.id} item={item} />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </main>
  )
}
