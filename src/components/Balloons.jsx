import { useRef, useState } from 'react'
import { play } from '../sound'

// بالونات بتطلع لفوق بالواجهة، والولد بيفقعها بكبسة
const BALLOONS = [
  { x: 2, c: '#FFD23F', s: 1, dur: 13, delay: 0 },
  { x: 13, c: '#8AD8F7', s: 0.8, dur: 16, delay: 5 },
  { x: 30, c: '#C8F3DE', s: 0.7, dur: 18, delay: 9 },
  { x: 48, c: '#FFFFFF', s: 0.85, dur: 15, delay: 2.5 },
  { x: 92, c: '#FFD23F', s: 0.75, dur: 17, delay: 7 },
  { x: 97, c: '#8AD8F7', s: 0.95, dur: 14, delay: 11 },
]

const POP_WORDS = ['بوب!', 'بووم!', 'طاخ!', 'هيييه!']

function Balloon({ b, onPop }) {
  return (
    <button
      type="button"
      className="balloon-fly"
      style={{
        '--x': `${b.x}%`,
        '--s': b.s,
        '--dur': `${b.dur}s`,
        '--delay': `${b.delay}s`,
      }}
      onPointerDown={(e) => onPop(e)}
      aria-label="بالون، افقعه"
      tabIndex={-1}
    >
      <svg viewBox="0 0 60 100" width="100%" height="100%" aria-hidden="true">
        <path d="M30 2C13 2 4 16 4 30c0 18 15 30 26 34 11-4 26-16 26-34C56 16 47 2 30 2z" fill={b.c} />
        <path d="M27 64h6l-3 5z" fill={b.c} />
        <path d="M30 69q-5 7 0 12t0 12" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" fill="none" />
        <ellipse cx="19" cy="18" rx="5" ry="9" fill="#fff" opacity=".45" transform="rotate(25 19 18)" />
      </svg>
    </button>
  )
}

export default function Balloons() {
  // كل بالون إلو "جيل": لما ينفقع منزيد الجيل فبيرجع يطلع من تحت من جديد
  const [gens, setGens] = useState(() => BALLOONS.map(() => 0))
  const [pops, setPops] = useState([])
  const id = useRef(0)
  const wrap = useRef(null)

  const pop = (i, e) => {
    play.pop()
    const r = wrap.current.getBoundingClientRect()
    const p = {
      id: id.current++,
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      word: POP_WORDS[Math.floor(Math.random() * POP_WORDS.length)],
      c: BALLOONS[i].c,
    }
    setPops((ps) => [...ps, p])
    setTimeout(() => setPops((ps) => ps.filter((x) => x.id !== p.id)), 900)
    setGens((g) => g.map((v, j) => (j === i ? v + 1 : v)))
  }

  return (
    <div className="balloons" ref={wrap} aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <Balloon
          key={`${i}-${gens[i]}`}
          b={gens[i] ? { ...b, delay: 1.2 + (i % 3) } : b}
          onPop={(e) => pop(i, e)}
        />
      ))}
      {pops.map((p) => (
        <span key={p.id} className="pop" style={{ left: p.x, top: p.y, '--c': p.c }}>
          {Array.from({ length: 8 }).map((_, k) => (
            <span key={k} className="pop__bit" style={{ '--a': `${k * 45}deg` }} />
          ))}
          <span className="pop__word">{p.word}</span>
        </span>
      ))}
    </div>
  )
}
