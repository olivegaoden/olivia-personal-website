import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDraggable } from '../../hooks/useDraggable'
import type { WindowId } from '../../hooks/useWindowManager'

interface WindowProps {
  id: WindowId
  title: string
  emoji: string
  x: number; y: number
  width: number; height: number
  zIndex: number
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
  children: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onResize: (w: number, h: number) => void
  minWidth?: number
  minHeight?: number
  resizable?: boolean
}

export const Window: React.FC<WindowProps> = ({
  id, title, emoji, x, y, width, height, zIndex,
  isOpen, isMinimized, isActive,
  children, onClose, onMinimize, onFocus, onMove, onResize,
  minWidth = 300, minHeight = 200, resizable = true,
}) => {
  const { onMouseDown } = useDraggable({ onMove, onFocus })
  const resizing = useRef(false)
  const resizeStart = useRef({ mx: 0, my: 0, w: 0, h: 0 })

  const onResizeDown = (e: React.MouseEvent) => {
    resizing.current = true
    resizeStart.current = { mx: e.clientX, my: e.clientY, w: width, h: height }
    e.preventDefault()
    e.stopPropagation()
    const onMove_ = (me: MouseEvent) => {
      if (!resizing.current) return
      onResize(
        Math.max(minWidth,  resizeStart.current.w + me.clientX - resizeStart.current.mx),
        Math.max(minHeight, resizeStart.current.h + me.clientY - resizeStart.current.my),
      )
    }
    const onUp = () => {
      resizing.current = false
      window.removeEventListener('mousemove', onMove_)
      window.removeEventListener('mouseup',   onUp)
    }
    window.addEventListener('mousemove', onMove_)
    window.addEventListener('mouseup',   onUp)
  }

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          key={id}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          exit={{    scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className={`pixel-window absolute flex flex-col overflow-hidden select-none ${isActive ? 'active' : ''}`}
          style={{ left: x, top: y, width, height, zIndex }}
          onMouseDown={() => onFocus()}
        >
          {/* ── TITLEBAR ── */}
          <div
            className="pixel-titlebar flex-shrink-0"
            onMouseDown={e => onMouseDown(e, x, y)}
          >
            {/* dots */}
            <div className="flex gap-1.5 flex-shrink-0">
              <button className="win-dot close" onClick={e => { e.stopPropagation(); onClose() }} title="Close" />
              <button className="win-dot min"   onClick={e => { e.stopPropagation(); onMinimize() }} title="Minimise" />
              <button className="win-dot expand" title="Maximise" />
            </div>
            {/* title */}
            <span className="font-pixel text-[7px] text-ink flex-1 text-center truncate pointer-events-none">
              {emoji} {title}
            </span>
          </div>

          {/* ── BODY ── */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            {children}
          </div>

          {/* ── RESIZE GRIP ── */}
          {resizable && (
            <div className="resize-grip" onMouseDown={onResizeDown} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
