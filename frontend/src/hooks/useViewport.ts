import { useState, useEffect, useCallback } from 'react'

export interface ViewportSize { width: number; height: number }

/** Returns live viewport dimensions and fires on every resize */
export function useViewport(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>({
    width:  window.innerWidth,
    height: window.innerHeight,
  })

  const update = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [update])

  return size
}

/** Returns true when viewport width is below the given breakpoint (default 768) */
export function useIsMobile(breakpoint = 768): boolean {
  const { width } = useViewport()
  return width < breakpoint
}
