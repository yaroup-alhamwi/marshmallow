import { useRef, useState } from 'react'
import { morning, site } from '../data/site'
import { play } from '../sound'
import { ChatIcon } from './Icons'

function Sunrise({ wink }) {
  return (
    <svg viewBox="0 0 320 200" className="sunrise" aria-hidden="true">
      <defs>
        <clipPath id="sky-clip">
          <rect x="0" y="0" width="320" height="166" />
        </clipPath>
      </defs>
      <g clipPath="url(#sky-clip)">
      <g className="sunrise__rays" stroke="#FFD23F" strokeWidth="10" strokeLinecap="round">
        {Array.from({ length: 9 }).map((_, i) => {
          const a = Math.PI + (Math.PI * (i + 0.5)) / 9
          const x1 = 160 + Math.cos(a) * 92
          const y1 = 170 + Math.sin(a) * 92
          const x2 = 160 + Math.cos(a) * 124
          const y2 = 170 + Math.sin(a) * 124
          return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} />
        })}
      </g>
      </g>
      <path d="M85 170a75 75 0 0 1 150 0z" fill="#FFD23F" />
      <ellipse cx="135" cy="138" rx="6" ry="8" fill="#3A1250" />
      {wink ? (
        <path d="M177 140q8 -9 16 0" stroke="#3A1250" strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx="185" cy="138" rx="6" ry="8" fill="#3A1250" />
      )}
      <ellipse cx="120" cy="155" rx="9" ry="5" fill="#FF7FB5" opacity=".6" />
      <ellipse cx="200" cy="155" rx="9" ry="5" fill="#FF7FB5" opacity=".6" />
      <path d="M148 152q12 12 24 0" stroke="#3A1250" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="20" y="168" width="280" height="14" rx="7" fill="#fff" opacity=".7" />
    </svg>
  )
}

export default function Morning() {
  // الشمس بتغمز وبتسرّع أشعتها لما تكبس عليها
  const [wink, setWink] = useState(0)
  const [winking, setWinking] = useState(false)
  const t = useRef(0)
  const poke = () => {
    play.ding()
    setWink((w) => w + 1)
    setWinking(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setWinking(false), 1000)
  }
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('مرحبا مارشميللو! حابب سجّل بصباح مارشميللو')}`
  return (
    <section className="section morning" id="morning" aria-labelledby="morning-title">
      <div className="wrap morning__inner">
        <div className="morning__art">
          <button
            type="button"
            key={wink}
            className={`sun-btn${wink ? ' is-winking' : ''}`}
            onClick={poke}
            aria-label="صباح الخير يا شمس"
          >
            <Sunrise wink={winking} />
          </button>
          <p className="morning__quote">{morning.quote}</p>
        </div>
        <div>
          <h2 className="section__title" id="morning-title" data-reveal>{morning.title}</h2>
          <p className="section__lead" data-reveal style={{ '--i': 1 }}>{morning.text}</p>
          <dl className="facts">
            {morning.facts.map((f, i) => (
              <div key={f.label} className="fact" data-reveal style={{ '--i': i + 2 }}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="morning__trial">{morning.trial}</p>
          <a className="btn btn--magenta btn--big" href={wa} target="_blank" rel="noreferrer">
            <ChatIcon /> سجّلوا عالواتساب
          </a>
        </div>
      </div>
    </section>
  )
}
