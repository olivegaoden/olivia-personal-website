import React from 'react'

const RESUME_PDF = `${import.meta.env.BASE_URL}resume.pdf`

export const ResumeWindow: React.FC = () => (
  <div className="flex flex-col h-full -m-4" style={{ height: 'calc(100% + 2rem)' }}>
    {/* toolbar */}
    <div
      className="flex-shrink-0 flex items-center justify-between px-4 py-2.5"
      style={{ borderBottom: '2px solid rgba(184,174,232,0.4)', background: 'rgba(255,255,255,0.3)' }}
    >
      <div>
        <p className="font-pixel text-[8px] text-ink">OLIVIA GAO — RESUME</p>
        <p className="font-mono text-[13px] text-ink-mid mt-0.5">Software Engineer · NYC Metro</p>
      </div>
      <a
        href={RESUME_PDF}
        download="Olivia_Gao_Resume.pdf"
        className="px-btn pink"
        style={{ textDecoration: 'none', fontSize: 7 }}
      >
        ⬇ Download PDF
      </a>
    </div>

    {/* PDF embed */}
    <div className="flex-1 relative" style={{ minHeight: 0 }}>
      <iframe
        src={`${RESUME_PDF}#toolbar=0&navpanes=0&scrollbar=1`}
        className="absolute inset-0 w-full h-full"
        style={{ border: 'none' }}
        title="Olivia Gao Resume"
      />
    </div>
  </div>
)
