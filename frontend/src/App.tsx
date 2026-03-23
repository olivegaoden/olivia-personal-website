import React from 'react'
import { useWindowManager, type WindowId } from './hooks/useWindowManager'
import { Window } from './components/windows/Window'
import { WelcomeWindow } from './components/windows/WelcomeWindow'
import { AboutWindow } from './components/windows/AboutWindow'
import { ProjectsWindow } from './components/windows/ProjectsWindow'
import { ContactWindow } from './components/windows/ContactWindow'
import { AIWindow } from './components/windows/AIWindow'
import { Taskbar } from './components/Taskbar'
import { DesktopIcons } from './components/DesktopIcons'
import { DesktopBackground } from './components/DesktopBackground'
import { Statusbar } from './components/Statusbar'

const WIN_TITLES: Record<WindowId, { title: string; emoji: string; minW?: number; minH?: number }> = {
  welcome:  { title: 'welcome.exe',   emoji: '🏠', minW: 360, minH: 340 },
  about:    { title: 'about_me.txt',  emoji: '👩‍💻', minW: 360, minH: 380 },
  projects: { title: 'projects/',     emoji: '📁', minW: 380, minH: 380 },
  contact:  { title: 'contact.json',  emoji: '💌', minW: 320, minH: 300 },
  ai:       { title: 'olivia_ai.exe', emoji: '🤖', minW: 380, minH: 440 },
}

const WIN_CONTENT: Record<WindowId, (open: (id: WindowId) => void) => React.ReactNode> = {
  welcome:  (open) => <WelcomeWindow openWindow={open} />,
  about:    ()     => <AboutWindow />,
  projects: ()     => <ProjectsWindow />,
  contact:  ()     => <ContactWindow />,
  ai:       ()     => <AIWindow />,
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
            emoji={meta.emoji}
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
