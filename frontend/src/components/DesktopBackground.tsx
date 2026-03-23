import React from 'react'

// Pixel cloud drawn with SVG rects for true pixel-art look
const PixelCloud = ({
  x, y, scale = 1, opacity = 0.7, floatClass = 'float-1',
}: {
  x: number; y: number; scale?: number; opacity?: number; floatClass?: string
}) => (
  <div
    className={`absolute pointer-events-none ${floatClass}`}
    style={{ left: x, top: y, opacity, transform: `scale(${scale})`, transformOrigin: 'center' }}
  >
    <svg viewBox="0 0 64 32" width={128} height={64} xmlns="http://www.w3.org/2000/svg">
      {/* pixel cloud shape using rects */}
      <rect x={16} y={20} width={32} height={8}  fill="white"/>
      <rect x={12} y={16} width={40} height={12} fill="white"/>
      <rect x={20} y={12} width={12} height={4}  fill="white"/>
      <rect x={32} y={8}  width={16} height={8}  fill="white"/>
      <rect x={24} y={16} width={8}  height={4}  fill="white"/>
      {/* soft shadow */}
      <rect x={16} y={26} width={32} height={4} fill="rgba(184,174,232,0.25)"/>
    </svg>
  </div>
)

// Pixel star
const PixelStar = ({ x, y, size = 20, floatClass = '', color = '#fde047' }: {
  x: number; y: number; size?: number; floatClass?: string; color?: string
}) => (
  <div
    className={`absolute pointer-events-none ${floatClass}`}
    style={{ left: x, top: y }}
  >
    <svg viewBox="0 0 10 10" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={4} y={0} width={2} height={2} fill={color}/>
      <rect x={4} y={8} width={2} height={2} fill={color}/>
      <rect x={0} y={4} width={2} height={2} fill={color}/>
      <rect x={8} y={4} width={2} height={2} fill={color}/>
      <rect x={2} y={2} width={2} height={2} fill={color}/>
      <rect x={6} y={2} width={2} height={2} fill={color}/>
      <rect x={2} y={6} width={2} height={2} fill={color}/>
      <rect x={6} y={6} width={2} height={2} fill={color}/>
      <rect x={3} y={3} width={4} height={4} fill={color}/>
    </svg>
  </div>
)

// Pixel moon
const PixelMoon = ({ x, y }: { x: number; y: number }) => (
  <div className="absolute pointer-events-none float-2" style={{ left: x, top: y }}>
    <svg viewBox="0 0 24 24" width={48} height={48} xmlns="http://www.w3.org/2000/svg">
      <rect x={8}  y={0}  width={8}  height={2}  fill="#fde68a"/>
      <rect x={4}  y={2}  width={12} height={4}  fill="#fde68a"/>
      <rect x={2}  y={6}  width={14} height={4}  fill="#fde68a"/>
      <rect x={2}  y={10} width={12} height={4}  fill="#fde68a"/>
      <rect x={4}  y={14} width={10} height={4}  fill="#fde68a"/>
      <rect x={8}  y={18} width={6}  height={4}  fill="#fde68a"/>
      {/* cutout for crescent */}
      <rect x={10} y={2}  width={8}  height={16} fill="transparent"/>
    </svg>
  </div>
)

export const DesktopBackground: React.FC = () => (
  <>
    {/* Clouds */}
    <PixelCloud x={-20}  y={60}  scale={1.1} opacity={0.65} floatClass="float-1" />
    <PixelCloud x={220}  y={20}  scale={0.75} opacity={0.55} floatClass="float-2" />
    <PixelCloud x={520}  y={80}  scale={0.9}  opacity={0.6}  floatClass="float-3" />
    <PixelCloud x={780}  y={30}  scale={1.2}  opacity={0.5}  floatClass="float-1" />
    <PixelCloud x={1050} y={95}  scale={0.8}  opacity={0.6}  floatClass="float-2" />
    <PixelCloud x={40}   y={420} scale={0.9}  opacity={0.45} floatClass="float-3" />
    <PixelCloud x={900}  y={500} scale={0.7}  opacity={0.4}  floatClass="float-1" />

    {/* Stars */}
    <PixelStar x={310} y={55}  size={18} floatClass="float-2" color="#fde047"/>
    <PixelStar x={690} y={70}  size={14} floatClass="float-1" color="#fde047"/>
    <PixelStar x={430} y={470} size={16} floatClass="float-3" color="#fde047"/>
    <PixelStar x={860} y={420} size={12} floatClass="float-2" color="#fde047"/>
    <PixelStar x={150} y={320} size={10} floatClass="float-1" color="#f7a8c4"/>
    <PixelStar x={970} y={180} size={14} floatClass="float-3" color="#c4d8f7"/>
    <PixelStar x={55}  y={530} size={12} floatClass="float-2" color="#fde047"/>
    <PixelStar x={1150}y={340} size={16} floatClass="float-1" color="#fde047"/>

    {/* Moon */}
    <PixelMoon x={920} y={60} />
  </>
)
