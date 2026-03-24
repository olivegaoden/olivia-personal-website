import React from 'react'
import { PROJECTS } from '../../data/portfolio'

export const ProjectsWindow: React.FC = () => (
  <div className="flex flex-col gap-0">
    {PROJECTS.map(p => (
      <div key={p.id} className="proj-card">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-pixel text-[9px] text-ink leading-5">
            {p.title}
          </h3>
          {p.badge && (
            <span className="px-chip pink text-[5px] flex-shrink-0">{p.badge}</span>
          )}
        </div>
        <p className="font-body text-[11px] text-ink-mid font-semibold leading-relaxed mb-2.5">
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tech.map(t => <span key={t} className="px-chip">{t}</span>)}
        </div>
        <div className="flex gap-2">
          {p.githubUrl && (<a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="px-btn" style={{ fontSize: 7 }}>
            GITHUB
          </a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="px-btn pink" style={{ fontSize: 7 }}>
              ▶ LIVE DEMO
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
)
