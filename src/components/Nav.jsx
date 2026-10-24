import { useEffect, useRef } from 'react'
import { site } from '../data/site'
import { PhoneIcon } from './Icons'
import { MallowSvg } from './Mallow'
import SoundToggle from './SoundToggle'

const links = [
  { href: '#play', label: 'ألعابنا' },
  { href: '#events', label: 'فعالياتنا' },
  { href: '#morning', label: 'صباح مارشميللو' },
  { href: '#parents', label: 'للأهل' },
  { href: '#visit', label: 'وين نحنا' },
]

// مارشميللو صغيرة بتمشي على حبل تحت الشريط وإنت عم تنزل بالصفحة
function useScrollRunner(trackRef) {
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    let idle = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const runner = track.querySelector('.nav__runner')
      const room = track.clientWidth - (runner?.offsetWidth || 0)
      track.style.setProperty('--run', `${(-p * room).toFixed(1)}px`)
      track.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => {
      track.classList.add('is-moving')
      clearTimeout(idle)
      idle = setTimeout(() => track.classList.remove('is-moving'), 180)
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(frame)
      clearTimeout(idle)
    }
  }, [trackRef])
}

export default function Nav() {
  const trackRef = useRef(null)
  useScrollRunner(trackRef)

  return (
    <header className="nav">
      <a href="#top" className="nav__brand" aria-label={site.name}>
        <span className="nav__dot" aria-hidden="true" />
        {site.shortName}
      </a>
      <nav aria-label="أقسام الموقع">
        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <SoundToggle />
      <a className="nav__call" href={`tel:${site.phone}`}>
        <PhoneIcon width={18} height={18} />
        <span dir="ltr">{site.phoneDisplay}</span>
      </a>
      <div className="nav__progress" ref={trackRef} aria-hidden="true">
        <span className="nav__rope" />
        <span className="nav__runner">
          <MallowSvg color="white" />
        </span>
      </div>
    </header>
  )
}
