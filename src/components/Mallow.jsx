import { useRef, useState } from 'react'
import { play } from '../sound'

export const FILLS = {
  white: ['#FFFFFF', '#F3E6EE'],
  pink: ['#FFC9E0', '#F6A7C9'],
  sun: ['#FFE68C', '#F5CF55'],
  sky: ['#C4ECFC', '#93D6F2'],
  mint: ['#C8F3DE', '#98E0BE'],
}

const INK = '#3A1250'

// رسمة المارشميللو لحالها (منستعملها بالواجهة وبستارة التنقل)
export function MallowSvg({ color = 'white', pressed = false, mood = 'smile' }) {
  const [face, side] = FILLS[color]
  return (
    <svg viewBox="0 0 120 130" width="100%" height="100%" aria-hidden="true">
      <path d="M10 32 C10 14 32 8 60 8 C88 8 110 14 110 32 L110 100 C110 118 88 124 60 124 C32 124 10 118 10 100 Z" fill={side} />
      <path d="M10 32 C10 14 32 8 60 8 C88 8 110 14 110 32 L110 96 C110 112 88 117 60 117 C32 117 10 112 10 96 Z" fill={face} />
      <ellipse cx="60" cy="30" rx="47" ry="18" fill="#fff" opacity=".55" />
      <ellipse cx="44" cy="24" rx="14" ry="5" fill="#fff" opacity=".9" />
      {pressed ? (
        <g stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M36 70 l8 -6 l8 6" />
          <path d="M68 70 l8 -6 l8 6" />
        </g>
      ) : (
        // العيون: الغروب الخارجي بيلحق الماوس، والداخلي بيرمش
        <g className="mallow__eyes">
          <g className="mallow__blink">
            <ellipse cx="44" cy="68" rx="5" ry="6.5" fill={INK} />
            <ellipse cx="76" cy="68" rx="5" ry="6.5" fill={INK} />
            <circle cx="46" cy="65.5" r="1.8" fill="#fff" />
            <circle cx="78" cy="65.5" r="1.8" fill="#fff" />
          </g>
        </g>
      )}
      <ellipse cx="32" cy="82" rx="8" ry="5" fill="#FF7FB5" opacity=".55" />
      <ellipse cx="88" cy="82" rx="8" ry="5" fill="#FF7FB5" opacity=".55" />
      {pressed || mood === 'open' ? (
        <path d="M52 82 Q60 96 68 82 Z" fill={INK} />
      ) : (
        <path d="M52 82 Q60 90 68 82" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      )}
    </svg>
  )
}

const SPARK_COLORS = ['#FFD23F', '#FFFFFF', '#8AD8F7', '#FFC9E0', '#C8F3DE', '#FFD23F']

// مارشميللو بتنعصر لما تكبس عليها، وبتطلع منها نجوم لما تتركها
export default function Mallow({ color = 'white', size = 120, tilt = 0, style, delay = 0, mood = 'smile' }) {
  const [state, setState] = useState('idle')
  const [bursts, setBursts] = useState([])
  const nextId = useRef(0)
  const pressed = state === 'pressed'

  const press = () => {
    if (state === 'pressed') return
    setState('pressed')
    play.squish()
  }
  const release = () => {
    if (state !== 'pressed') return
    setState('boing')
    play.boing()
    const id = nextId.current++
    setBursts((b) => [...b, id])
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 800)
  }

  return (
    <button
      type="button"
      className={`mallow mallow--${state}`}
      style={{ ...style, '--size': `${size}px`, '--tilt': `${tilt}deg`, '--delay': `${delay}ms` }}
      onPointerDown={press}
      onPointerUp={release}
      onPointerLeave={release}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && press()}
      onKeyUp={release}
      onAnimationEnd={(e) => e.animationName === 'boing' && setState('idle')}
      aria-label="مارشميللو، اعصروها"
    >
      <span className="mallow__body">
        <MallowSvg color={color} pressed={pressed} mood={mood} />
      </span>
      {bursts.map((id) => (
        <span key={id} className="burst" aria-hidden="true">
          {SPARK_COLORS.map((c, i) => (
            <span key={i} className="burst__spark" style={{ '--a': `${i * 60 - 90}deg`, '--c': c }} />
          ))}
        </span>
      ))}
    </button>
  )
}
