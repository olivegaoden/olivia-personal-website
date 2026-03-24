import React, { useRef, useState, useEffect } from 'react'
import type { WindowId } from '../hooks/useWindowManager'

const DEFAULT_ICONS: Record<WindowId, React.FC<{ size: number }>> = {
  welcome: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={7} y={0} width={2} height={2} fill="#7c6bc0"/>
      <rect x={5} y={2} width={6} height={2} fill="#7c6bc0"/>
      <rect x={3} y={4} width={10} height={2} fill="#9b8dd4"/>
      <rect x={2} y={6} width={12} height={8} fill="#b8aee8"/>
      <rect x={2} y={6} width={12} height={2} fill="#9b8dd4"/>
      <rect x={6} y={10} width={4} height={4} fill="#7c6bc0"/>
      <rect x={3} y={8} width={3} height={3} fill="#fdd5e5"/>
      <rect x={10} y={8} width={3} height={3} fill="#fdd5e5"/>
    </svg>
  ),
  about: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={5} y={1} width={6} height={6} fill="#fde8c0"/>
      <rect x={4} y={2} width={1} height={4} fill="#fde8c0"/>
      <rect x={11} y={2} width={1} height={4} fill="#fde8c0"/>
      <rect x={6} y={4} width={2} height={1} fill="#3a3550"/>
      <rect x={9} y={4} width={1} height={1} fill="#3a3550"/>
      <rect x={6} y={6} width={4} height={1} fill="#c05688"/>
      <rect x={3} y={9} width={10} height={6} fill="#b8aee8"/>
      <rect x={6} y={7} width={4} height={2} fill="#fde8c0"/>
      <rect x={4} y={10} width={3} height={4} fill="#9b8dd4"/>
      <rect x={9} y={10} width={3} height={4} fill="#9b8dd4"/>
    </svg>
  ),
  experience: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={2} y={4} width={12} height={9} fill="#c5d8f0"/>
      <rect x={2} y={4} width={12} height={2} fill="#5b9fd4"/>
      <rect x={1} y={3} width={14} height={2} fill="#7c6bc0"/>
      <rect x={5} y={2} width={6} height={2} fill="#7c6bc0"/>
      <rect x={6} y={1} width={4} height={2} fill="#9b8dd4"/>
      <rect x={3} y={8} width={4} height={1} fill="#3a3550"/>
      <rect x={3} y={10} width={6} height={1} fill="#6b6488"/>
      <rect x={3} y={12} width={5} height={1} fill="#6b6488"/>
    </svg>
  ),
  projects: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={1} y={4} width={14} height={10} fill="#f7a8c4"/>
      <rect x={1} y={4} width={14} height={2}  fill="#e879a0"/>
      <rect x={1} y={3} width={6}  height={2}  fill="#e879a0"/>
      <rect x={3} y={7} width={10} height={1}  fill="#fdd5e5"/>
      <rect x={3} y={9} width={8}  height={1}  fill="#fdd5e5"/>
      <rect x={3} y={11} width={6} height={1}  fill="#fdd5e5"/>
    </svg>
  ),
  contact: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={1} y={3} width={14} height={10} fill="#b8aee8"/>
      <rect x={1} y={3} width={14} height={2}  fill="#7c6bc0"/>
      <rect x={2} y={5} width={5}  height={4}  fill="#fdd5e5"/>
      <rect x={8} y={5} width={6}  height={1}  fill="#fef6ff"/>
      <rect x={8} y={7} width={4}  height={1}  fill="#fef6ff"/>
      <rect x={2} y={10} width={11} height={1} fill="#9b8dd4"/>
    </svg>
  ),
  ai: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={3} y={2} width={10} height={10} fill="#9b8dd4"/>
      <rect x={2} y={3} width={1}  height={4}  fill="#7c6bc0"/>
      <rect x={13} y={3} width={1} height={4}  fill="#7c6bc0"/>
      <rect x={5} y={5} width={2}  height={2}  fill="#fef6ff"/>
      <rect x={9} y={5} width={2}  height={2}  fill="#fef6ff"/>
      <rect x={5} y={8} width={6}  height={1}  fill="#fdd5e5"/>
      <rect x={6} y={12} width={4} height={2}  fill="#7c6bc0"/>
      <rect x={4} y={13} width={8} height={1}  fill="#9b8dd4"/>
    </svg>
  ),
}

const ICON_META: { id: WindowId; label: string }[] = [
  { id: 'welcome',    label: 'Welcome'      },
  { id: 'about',      label: 'About Me'     },
  { id: 'experience', label: 'Experience'   },
  { id: 'projects',   label: 'Projects'     },
  { id: 'contact',    label: 'Contact'      },
  { id: 'ai',         label: 'AI Assistant' },
]

const STORAGE_KEY = 'olivia-custom-icons'

function loadSaved(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') } catch { return {} }
}
function saveIcon(id: string, dataUrl: string) {
  const all = loadSaved(); all[id] = dataUrl
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}
function removeIcon(id: string) {
  const all = loadSaved(); delete all[id]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

interface Props { onOpen: (id: WindowId) => void }

export const DesktopIcons: React.FC<Props> = ({ onOpen }) => {
  const [customIcons, setCustomIcons] = useState<Record<string, string>>(loadSaved)
  const [editMode, setEditMode] = useState(false)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customIcons))
  }, [customIcons])

  const handleFile = (id: string, file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => {
      const dataUrl = e.target?.result as string
      setCustomIcons(prev => { const n = { ...prev, [id]: dataUrl }; saveIcon(id, dataUrl); return n })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="absolute top-12 left-5 flex flex-col gap-3 z-10">
      {ICON_META.map(({ id, label }) => {
        const DefaultIcon = DEFAULT_ICONS[id]
        const customSrc   = customIcons[id]

        return (
          <div
            key={id}
            className="desk-icon group relative"
            onDoubleClick={() => !editMode && onOpen(id)}
            title={editMode ? `Click to change ${label} icon` : `Double-click to open ${label}`}
          >
            {/* icon image */}
            <div
              className="desk-icon-img relative"
              onClick={() => editMode && fileRefs.current[id]?.click()}
              style={{ cursor: editMode ? 'pointer' : undefined }}
            >
              {customSrc
                ? <img src={customSrc} alt={label} style={{ width: 32, height: 32, imageRendering: 'pixelated', objectFit: 'contain' }} />
                : <DefaultIcon size={32} />
              }

              {/* edit overlay */}
              {editMode && (
                <div
                  className="absolute inset-0 flex items-center justify-center text-[9px] font-pixel"
                  style={{ background: 'rgba(255,255,255,0.75)', color: '#7c6bc0', border: '2px dashed #9b8dd4' }}
                >
                  {customSrc ? '↺' : '+'}
                </div>
              )}

              {/* remove button */}
              {editMode && customSrc && (
                <button
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center font-pixel text-[7px] text-white"
                  style={{ background: '#e879a0', border: '1px solid #7c6bc0', zIndex: 2 }}
                  onClick={e => { e.stopPropagation(); setCustomIcons(p => { const n={...p}; delete n[id]; removeIcon(id); return n }) }}
                >
                  ×
                </button>
              )}
            </div>

            <div className="desk-icon-label">{label}</div>

            {/* hidden file input */}
            <input
              type="file" accept="image/*"
              style={{ display: 'none' }}
              ref={el => fileRefs.current[id] = el}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(id, f); e.target.value = '' }}
            />
          </div>
        )
      })}

      {/* Edit icons toggle button */}
      <button
        className="px-btn mt-1"
        style={{ fontSize: 6, padding: '5px 8px', opacity: editMode ? 1 : 0.65 }}
        onClick={() => setEditMode(v => !v)}
        title="Toggle icon edit mode"
      >
        {editMode ? '✓ DONE' : '✎ ICONS'}
      </button>
    </div>
  )
}
