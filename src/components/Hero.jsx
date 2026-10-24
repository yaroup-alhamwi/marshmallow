import { useEffect, useRef } from 'react'
import { site } from '../data/site'
import Mallow from './Mallow'
import Balloons from './Balloons'
import { PhoneIcon, PinIcon } from './Icons'

// كومة المارشميللو: كل وحدة إلها مكان ولون وميلان
const pile = [
  { color: 'white', size: 150, left: 6, bottom: 0, tilt: -4 },
  { color: 'sky', size: 132, left: 37, bottom: 0, tilt: 3, mood: 'open' },
  { color: 'pink', size: 140, left: 64, bottom: 0, tilt: -2 },
  { color: 'sun', size: 120, left: 22, bottom: 36, tilt: 8 },
  { color: 'mint', size: 118, left: 50, bottom: 36, tilt: -7 },
  { color: 'pink', size: 106, left: 36, bottom: 64, tilt: 4, mood: 'open' },
]

// عيون المارشميللو بتلحق الماوس (أو الإصبع)
function useFollowEyes(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let last = null
    const update = () => {
      frame = 0
      if (!last) return
      root.querySelectorAll('.mallow').forEach((m) => {
        const r = m.getBoundingClientRect()
        const dx = last.x - (r.left + r.width / 2)
        const dy = last.y - (r.top + r.height * 0.52)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 260)
        m.style.setProperty('--ex', `${((dx / d) * 4.5 * k).toFixed(2)}px`)
        m.style.setProperty('--ey', `${((dy / d) * 3.5 * k).toFixed(2)}px`)
      })
    }
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      cancelAnimationFrame(frame)
    }
  }, [ref])
}

export default function Hero() {
  const pileRef = useRef(null)
  useFollowEyes(pileRef)

  return (
    <section className="hero" id="top">
      <Balloons />
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__tagline">{site.tagline}</p>
          <h1 className="hero__title">
            <span className="puffy">{site.shortName}</span>
          </h1>
          <p className="hero__slogan">{site.slogan}</p>
          <p className="hero__lead">
            بحر طابات، برج مغامرات، ملعب فوتبول، ومشرفات بيحبّوا ولادكم. وكل أسبوع في شي جديد، بالزاهرة الجديدة بالشام.
          </p>
          <div className="hero__actions">
            <a className="btn btn--sun" href={`tel:${site.phone}`}>
              <PhoneIcon /> اتصلوا فينا
            </a>
            <a className="btn btn--ghost" href={site.mapsUrl} target="_blank" rel="noreferrer">
              <PinIcon /> دلّونا عالطريق
            </a>
          </div>
        </div>

        <div className="hero__pile">
          <div className="pile" ref={pileRef}>
            {pile.map((m, i) => (
              <Mallow
                key={i}
                color={m.color}
                size={m.size}
                tilt={m.tilt}
                mood={m.mood}
                delay={250 + i * 140}
                style={{ insetInlineStart: `${m.left}%`, bottom: `${m.bottom}%`, zIndex: 10 - Math.floor(m.bottom / 10) }}
              />
            ))}
          </div>
          <p className="pile__hint">جرّبوا تعصروا وحدة، أو افقعوا بالون!</p>
        </div>
      </div>
    </section>
  )
}
