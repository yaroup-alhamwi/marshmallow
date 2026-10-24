import { useState } from 'react'
import { zones } from '../data/site'
import ZoneArt from './ZoneArt'
import { play as sfx } from '../sound'

// صوت كل ركن (بس لما الزائر يكبس، مش لما يمرّق الماوس)
const ZONE_SOUND = { balls: 'balls', tower: 'slide', football: 'goal', crafts: 'beads' }

function TapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2" />
      <path d="M15 11a1.5 1.5 0 0 1 3 0v3.5A6.5 6.5 0 0 1 11.5 21h-.6a5 5 0 0 1-4-2l-2.7-3.6a1.6 1.6 0 0 1 2.5-2L9 15.5" />
    </svg>
  )
}

export default function Zones() {
  // عدّاد لكل ركن: كل ما يزيد بتعيد الرسمة حركتها
  const [plays, setPlays] = useState({})
  const play = (id, withSound = false) => {
    setPlays((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
    if (withSound) sfx[ZONE_SOUND[id]]()
  }

  return (
    <section className="section zones" id="play" aria-labelledby="play-title">
      <div className="wrap">
        <h2 className="section__title" id="play-title" data-reveal>شو في عنّا؟</h2>
        <p className="section__lead" data-reveal style={{ '--i': 1 }}>
          مساحة طريّة وملوّنة، مصمّمة لتعب الولاد بالطريقة الحلوة. اكبسوا على الرسمات وشوفوا شو بيصير!
        </p>
        <ul className="zones__grid">
          {zones.map((z, i) => (
            <li
              key={z.id}
              className={`zone zone--${z.id} tone-${z.tone}`}
              data-reveal
              style={{ '--i': i + 2 }}
              onPointerEnter={(e) => e.pointerType === 'mouse' && play(z.id)}
            >
              <div className="zone__art" onClick={() => play(z.id, true)}>
                <ZoneArt id={z.id} play={plays[z.id] || 0} />
              </div>
              <div className="zone__text">
                <h3>{z.title}</h3>
                <p>{z.text}</p>
              </div>
              <button type="button" className="zone__tap" onClick={() => play(z.id, true)} aria-label={`حرّك رسمة ${z.title}`}>
                <TapIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
