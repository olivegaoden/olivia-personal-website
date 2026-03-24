import React from 'react'
import { useWindowManager, type WindowId } from './hooks/useWindowManager'
import { useIsMobile } from './hooks/useViewport'
import { Window } from './components/windows/Window'
import { WelcomeWindow } from './components/windows/WelcomeWindow'
import { AboutWindow } from './components/windows/AboutWindow'
import { ExperienceWindow } from './components/windows/ExperienceWindow'
import { ProjectsWindow } from './components/windows/ProjectsWindow'
import { ContactWindow } from './components/windows/ContactWindow'
import { AIWindow } from './components/windows/AIWindow'
import { Taskbar } from './components/Taskbar'
import { DesktopIcons } from './components/DesktopIcons'
import { DesktopBackground } from './components/DesktopBackground'
import { Statusbar } from './components/Statusbar'
import { MobileView } from './components/MobileView'

// minWidth/minHeight are viewport-relative — recalculated on each render so they
// stay correct after window resize.
function getWinTitles() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    welcome:    { title: 'welcome.exe',    minW: Math.round(vw * 0.22), minH: Math.round(vh * 0.25) },
    about:      { title: 'about_me.txt',   minW: Math.round(vw * 0.24), minH: Math.round(vh * 0.28) },
    experience: { title: 'experience.txt', minW: Math.round(vw * 0.24), minH: Math.round(vh * 0.26) },
    projects:   { title: 'projects/',      minW: Math.round(vw * 0.26), minH: Math.round(vh * 0.28) },
    contact:    { title: 'contact.json',   minW: Math.round(vw * 0.20), minH: Math.round(vh * 0.22) },
    ai:         { title: 'olivia_ai.exe',  minW: Math.round(vw * 0.24), minH: Math.round(vh * 0.30) },
  } as Record<WindowId, { title: string; minW: number; minH: number }>
}

const WIN_CONTENT: Record<WindowId, (open: (id: WindowId) => void) => React.ReactNode> = {
  welcome:    (open) => <WelcomeWindow openWindow={open} />,
  about:      ()     => <AboutWindow />,
  experience: ()     => <ExperienceWindow />,
  projects:   ()     => <ProjectsWindow />,
  contact:    ()     => <ContactWindow />,
  ai:         ()     => <AIWindow />,
}

export default function App() {
  const isMobile = useIsMobile(768)
  const { windows, open, close, minimize, focus, move, resize, activeId } = useWindowManager()

  // ── MOBILE: single-page scrollable layout ────────────────────────────────
  if (isMobile) {
    return <MobileView />
  }

  // ── DESKTOP: full OS window system ───────────────────────────────────────
  const WIN_TITLES = getWinTitles()

  return (
    <div className="desktop-bg pixel-grid desktop-os-root relative">
      <DesktopBackground />

      <Taskbar
        windows={windows}
        activeId={activeId}
        onTabClick={open}
        onMinimize={minimize}
      />

      <DesktopIcons onOpen={open} />

      {(Object.keys(windows) as WindowId[]).map(id => {
        const w    = windows[id]
        const meta = WIN_TITLES[id]
        return (
          <Window
            key={id}
            id={id}
            title={meta.title}
            x={w.x} y={w.y}
            width={w.width} height={w.height}
            zIndex={w.zIndex}
            isOpen={w.isOpen}
            isMinimized={w.isMinimized}
            isActive={id === activeId}
            onClose={() => close(id)}
            onMinimize={() => minimize(id)}
            onFocus={() => focus(id)}
            onMove={(x, y) => move(id, x, y)}
            onResize={(w_, h_) => resize(id, w_, h_)}
            minWidth={meta.minW}
            minHeight={meta.minH}
          >
            {WIN_CONTENT[id](open)}
          </Window>
        )
      })}

      <Statusbar />
    </div>
  )
}