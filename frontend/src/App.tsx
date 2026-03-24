import React from 'react'
import { useWindowManager, type WindowId } from './hooks/useWindowManager'
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

// minWidth/minHeight computed as fraction of viewport so resize never gets too small
const vw = window.innerWidth
const vh = window.innerHeight

const WIN_TITLES: Record<WindowId, { title: string; minW?: number; minH?: number }> = {
  welcome:    { title: 'welcome.exe',    minW: Math.round(vw * 0.25), minH: Math.round(vh * 0.35) },
  about:      { title: 'about_me.txt',   minW: Math.round(vw * 0.28), minH: Math.round(vh * 0.40) },
  experience: { title: 'experience.txt', minW: Math.round(vw * 0.28), minH: Math.round(vh * 0.38) },
  projects:   { title: 'projects/',      minW: Math.round(vw * 0.30), minH: Math.round(vh * 0.40) },
  contact:    { title: 'contact.json',   minW: Math.round(vw * 0.24), minH: Math.round(vh * 0.32) },
  ai:         { title: 'olivia_ai.exe',  minW: Math.round(vw * 0.28), minH: Math.round(vh * 0.45) },
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
  const { windows, open, close, minimize, focus, move, resize, activeId } = useWindowManager()

  return (
    <div className="desktop-bg pixel-grid w-full h-full relative overflow-hidden">
      {/* Decorative background elements */}
      <DesktopBackground />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeId={activeId}
        onTabClick={open}
        onMinimize={minimize}
      />

      {/* Desktop icons */}
      <DesktopIcons onOpen={open} />

      {/* Windows */}
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

      {/* Statusbar */}
      <Statusbar />
    </div>
  )
}
