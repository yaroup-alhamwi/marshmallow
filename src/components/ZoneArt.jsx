import { useEffect, useRef, useState } from 'react'
import { play as sfx } from '../sound'

// رسومات تفاعلية لكل ركن من الألعاب
// `play` رقم بيزيد كل ما الولد يكبس أو يمرّق الماوس، وكل رسمة بتعيد حركتها
const INK = '#3A1250'
const BALL_COLORS = ['#E4007C', '#FFD23F', '#2FB6EA', '#38C98B', '#FF8A3D', '#8B5CF6']

// بيشغّل حركات SMIL (animateMotion) كل ما يتغيّر play
function useSmil(play) {
  const ref = useRef(null)
  useEffect(() => {
    if (!play || !ref.current) return
    ref.current.querySelectorAll('[data-smil]').forEach((a) => {
      try {
        a.beginElement()
      } catch {
        /* متصفحات قديمة */
      }
    })
  }, [play])
  return ref
}

const BALLS = (() => {
  const out = []
  const rows = [
    { y: 150, n: 9, r: 15 },
    { y: 126, n: 8, r: 15 },
    { y: 104, n: 7, r: 14 },
  ]
  rows.forEach((row, ri) => {
    const step = 300 / row.n
    for (let i = 0; i < row.n; i++) {
      out.push({
        x: 30 + step * i + step / 2 + (ri % 2 ? step / 4 : 0),
        y: row.y + ((i * 7) % 5) - 2,
        r: row.r,
        c: BALL_COLORS[(i * 2 + ri * 3) % BALL_COLORS.length],
        row: ri,
      })
    }
  })
  return out
})()

function Balls({ play }) {
  // كل طابة فيك تكبس عليها لحالها فبتنطّ لفوق
  const [kick, setKick] = useState({ i: -1, n: 0 })
  return (
    <svg viewBox="0 0 360 190" className="zone-art zone-art--balls" aria-hidden="true">
      <rect x="18" y="86" width="324" height="92" rx="28" fill="#fff" opacity=".55" />
      {BALLS.map((b, i) => {
        const kicked = kick.i === i
        const cls = kicked ? 'ball ball--kick' : play ? 'ball ball--wave' : 'ball'
        return (
          <g
            key={`${i}-${play}-${kicked ? kick.n : 0}`}
            className={cls}
            style={{ '--d': `${Math.round((360 - b.x) * 1.4 + b.row * 60)}ms` }}
            onClick={(e) => {
              e.stopPropagation()
              setKick((k) => ({ i, n: k.n + 1 }))
              sfx.bonk(0, 0.8 + (i % 5) * 0.12)
            }}
          >
            <circle cx={b.x} cy={b.y} r={b.r} fill={b.c} />
            <circle cx={b.x - b.r / 3} cy={b.y - b.r / 3} r={b.r / 3.5} fill="#fff" opacity=".6" />
          </g>
        )
      })}
      <g className="zone-art__hop">
        <circle cx="250" cy="48" r="17" fill="#E4007C" />
        <circle cx="244" cy="42" r="5" fill="#fff" opacity=".6" />
      </g>
      <g className="zone-art__hop zone-art__hop--late">
        <circle cx="120" cy="62" r="13" fill="#FFD23F" />
        <circle cx="116" cy="58" r="4" fill="#fff" opacity=".6" />
      </g>
      <rect x="18" y="168" width="324" height="14" rx="7" fill={INK} opacity=".12" />
    </svg>
  )
}

function Tower({ play }) {
  const ref = useSmil(play)
  return (
    <svg ref={ref} viewBox="0 0 215 190" className="zone-art" aria-hidden="true">
      <g stroke="#E4007C" strokeWidth="8" strokeLinecap="round">
        <path d="M30 175V25M100 175V25M170 175V25" />
        <path d="M30 25h140M30 100h140" />
      </g>
      <g stroke={INK} strokeWidth="1.6" opacity=".35" key={`net-${play}`} className={play ? 'net-shake' : ''}>
        {[42, 54, 66, 78, 90].map((x) => (
          <path key={x} d={`M${x} 30v65`} />
        ))}
        {[40, 55, 70, 85].map((y) => (
          <path key={y} d={`M34 ${y}h62`} />
        ))}
      </g>
      <rect x="104" y="92" width="62" height="14" rx="7" fill="#2FB6EA" />
      <rect x="34" y="168" width="132" height="10" rx="5" fill="#38C98B" />
      <path d="M166 100c18 0 20 30 26 50s4 24 8 24" stroke="#2FB6EA" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* الولد اللي بيتزحلق */}
      <g>
        <animateMotion
          data-smil
          begin="indefinite"
          dur="1.3s"
          fill="remove"
          calcMode="spline"
          keyTimes="0;0.25;1"
          keyPoints="0;0.12;1"
          keySplines="0.4 0 0.6 1;0.5 0 0.2 1"
          path="M0 0 L22 0 C40 0 46 30 52 54 S58 82 64 84"
        />
        <circle cx="135" cy="70" r="11" fill="#fff" />
        <path d={play ? 'M128 83q7 10 14 0z' : 'M128 85q7 8 14 0'} stroke={INK} strokeWidth="3" fill={play ? INK : 'none'} strokeLinecap="round" />
        <circle cx="131" cy="68" r="2" fill={INK} />
        <circle cx="139" cy="68" r="2" fill={INK} />
      </g>
    </svg>
  )
}

function Football({ play }) {
  const ref = useSmil(play)
  return (
    <svg ref={ref} viewBox="0 0 260 190" className="zone-art" aria-hidden="true">
      <rect x="10" y="120" width="240" height="60" rx="18" fill="#38C98B" />
      <g stroke="#fff" strokeWidth="3" opacity=".7">
        <path d="M130 120v60" />
        <ellipse cx="130" cy="150" rx="26" ry="12" fill="none" />
      </g>
      <g stroke="#E4007C" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M36 140V70h70v70" />
      </g>
      <g stroke="#3A1250" strokeWidth="1.5" opacity=".3" key={`net-${play}`} className={play ? 'net-shake net-shake--late' : ''}>
        {[48, 60, 72, 84, 96].map((x) => (<path key={x} d={`M${x} 74v62`} />))}
        {[84, 98, 112, 126].map((y) => (<path key={y} d={`M40 ${y}h62`} />))}
      </g>
      <g className={play ? '' : 'zone-art__hop'}>
        <animateMotion data-smil begin="indefinite" dur="1.8s" fill="remove" calcMode="linear" keyTimes="0;0.4;1" keyPoints="0;1;1" path="M0 0 Q-55 -75 -110 -2" />
        <g key={`spin-${play}`} className={play ? 'ball-spin' : ''}>
          <circle cx="180" cy="108" r="20" fill="#fff" />
          <path d="M180 96l9 6-3 10h-12l-3-10z" fill="#3A1250" />
          <path d="M180 96v-8M189 102l8-3M186 112l5 7M174 112l-5 7M171 102l-8-3" stroke="#3A1250" strokeWidth="2" />
        </g>
      </g>
      {play > 0 && (
        <text key={`goal-${play}`} x="72" y="56" textAnchor="middle" className="goal-text">
          غوووول!
        </text>
      )}
    </svg>
  )
}

function Crafts({ play }) {
  const beads = ['#E4007C', '#FFD23F', '#2FB6EA', '#38C98B', '#8B5CF6', '#FF8A3D', '#E4007C', '#FFD23F', '#2FB6EA', '#38C98B', '#8B5CF6']
  return (
    <svg viewBox="0 0 300 190" className="zone-art" aria-hidden="true">
      <path d="M40 120a60 34 0 1 0 120 0a60 34 0 1 0 -120 0" stroke="#3A1250" strokeWidth="1.5" fill="none" opacity=".4" />
      {beads.map((c, i) => {
        const a = (i / beads.length) * Math.PI * 2
        return (
          <circle
            key={`${i}-${play}`}
            className={play ? 'bead-pop' : ''}
            style={{ '--d': `${i * 60}ms` }}
            cx={100 + Math.cos(a) * 60}
            cy={120 + Math.sin(a) * 34}
            r="11"
            fill={c}
          />
        )
      })}
      {/* معجون الفوم */}
      <g key={`foam-${play}`} className={play ? 'foam-squish' : ''}>
        <path d="M200 150c-14 0-22-10-18-22 3-10 14-12 18-20 6 8 18 9 22 20 4 12-6 22-22 22z" fill="#FF7FB5" />
      </g>
      <g key={`foam2-${play}`} className={play ? 'foam-squish foam-squish--late' : ''}>
        <path d="M232 156c-10 0-16-7-13-15 2-7 10-9 13-14 4 6 12 7 15 14 3 8-4 15-15 15z" fill="#2FB6EA" />
      </g>
      {/* القلم وخربشته */}
      {play > 0 && (
        <path
          key={`scribble-${play}`}
          className="scribble"
          d="M186 92q10-14 20 0t20 0t20 0"
          stroke="#E4007C"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      )}
      <g key={`pencil-${play}`} className={play ? 'pencil-wiggle' : ''}>
        <path d="M212 70l40-40 10 10-40 40z" fill="#FFD23F" />
        <path d="M212 70l-6 16 16-6z" fill="#3A1250" />
      </g>
    </svg>
  )
}

const ART = { balls: Balls, tower: Tower, football: Football, crafts: Crafts }

export default function ZoneArt({ id, play = 0 }) {
  const Art = ART[id]
  return Art ? <Art play={play} /> : null
}
