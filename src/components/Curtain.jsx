import { useEffect, useRef, useState } from 'react'
import { MallowSvg } from './Mallow'
import { play } from '../sound'

// ستارة التنقل: لما تكبس على رابط داخلي (#...) بتنزل طبقات ملوّنة متل المارشميللو،
// منقفز للقسم وهي مسكّرة، وبعدين بتكمّل نزول وبتكشف القسم الجديد.
const LABELS = {
  top: 'البداية',
  play: 'ألعابنا',
  events: 'فعالياتنا',
  morning: 'صباح مارشميللو',
  parents: 'زاوية الأهل',
  visit: 'موقعنا',
}
const COLORS = { top: 'white', play: 'sky', events: 'sun', morning: 'mint', parents: 'pink', visit: 'white' }

const COVER_AT = 560 // لحظة ما تكون الشاشة مغطّاة كلها
const DONE_AT = 1220

function jumpTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const navH = document.querySelector('.nav')?.offsetHeight || 0
  const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - navH - 26
  window.scrollTo({ top, behavior: 'instant' })
  history.replaceState(null, '', `#${id}`)
  // للقارئ الصوتي: ننقل التركيز للقسم الجديد
  const heading = el.querySelector('h1, h2')
  if (heading) {
    heading.setAttribute('tabindex', '-1')
    heading.focus({ preventScroll: true })
  }
}

export default function Curtain() {
  const [run, setRun] = useState(null)
  const timers = useRef([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      if (!id || !document.getElementById(id)) return
      e.preventDefault()
      if (reduced.matches) {
        jumpTo(id)
        return
      }
      timers.current.forEach(clearTimeout)
      play.whoosh()
      setRun({ id, n: Date.now() })
      timers.current = [
        setTimeout(() => jumpTo(id), COVER_AT),
        setTimeout(() => setRun(null), DONE_AT),
      ]
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  if (!run) return null
  return (
    <div className="curtain" key={run.n} aria-hidden="true">
      <div className="curtain__layer curtain__layer--sun" />
      <div className="curtain__layer curtain__layer--sky" />
      <div className="curtain__layer curtain__layer--magenta">
        <div className="curtain__mascot">
          <div className="curtain__mallow">
            <MallowSvg color={COLORS[run.id] || 'white'} mood="open" />
          </div>
          <p className="curtain__label">
            <span>يلّا على</span>
            {LABELS[run.id] || ''}
          </p>
        </div>
      </div>
    </div>
  )
}
