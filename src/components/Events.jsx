import { events, site } from '../data/site'
import { PeopleIcon } from './Icons'

export default function Events() {
  return (
    <section className="section events" id="events" aria-labelledby="events-title">
      <div className="wrap">
        <div className="events__head">
          <h2 className="section__title" id="events-title" data-reveal>كل أسبوع في شي جديد</h2>
          <p className="section__lead" data-reveal style={{ '--i': 1 }}>
            مسرح دمى، دوري فوتبول، وأشغال يدوية. هي من فعالياتنا الأخيرة، والجدول بيتجدّد عالصفحة.
          </p>
        </div>
        <ul className="tickets">
          {events.map((e, i) => (
            <li key={e.title} className={`ticket tone-${e.tone}`} data-reveal style={{ '--i': i + 2 }}>
              <p className="ticket__when">
                <span className="ticket__day">{e.day}</span>
                <span className="ticket__time">{e.time}</span>
              </p>
              <h3>{e.title}</h3>
              <p className="ticket__text">{e.text}</p>
            </li>
          ))}
        </ul>
        <a className="btn btn--magenta" href={site.facebook} target="_blank" rel="noreferrer">
          <PeopleIcon /> شوفوا جدول هالأسبوع على فيسبوك
        </a>
      </div>
    </section>
  )
}
