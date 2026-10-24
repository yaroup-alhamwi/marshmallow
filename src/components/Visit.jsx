import { site } from '../data/site'
import { PhoneIcon, ChatIcon, PinIcon, MailIcon, PeopleIcon, ClockIcon } from './Icons'

function MiniMap() {
  return (
    <svg viewBox="0 0 400 280" className="minimap" role="img" aria-label="مارشميللو بعد جامع الرضا بـ ٢٠٠ متر">
      <rect width="400" height="280" rx="28" fill="#FFF3F8" />
      <g fill="#F6DCE8">
        <rect x="24" y="24" width="140" height="84" rx="14" />
        <rect x="236" y="24" width="140" height="84" rx="14" />
        <rect x="24" y="172" width="140" height="84" rx="14" />
        <rect x="236" y="172" width="140" height="84" rx="14" />
      </g>
      <path d="M0 140h400" stroke="#fff" strokeWidth="48" />
      <path d="M200 0v280" stroke="#fff" strokeWidth="40" />
      {/* الجامع */}
      <g transform="translate(346 70)">
        <rect x="-16" y="-4" width="32" height="22" rx="4" fill="#2FB6EA" />
        <path d="M-13 -4a13 13 0 0 1 26 0z" fill="#2FB6EA" />
        <rect x="-26" y="-26" width="6" height="44" rx="3" fill="#2FB6EA" />
      </g>
      <text x="282" y="76" textAnchor="middle" className="minimap__label">جامع الرضا</text>
      {/* الطريق ٢٠٠ متر */}
      <path d="M306 140H120" stroke="#E4007C" strokeWidth="5" strokeDasharray="1 12" strokeLinecap="round" />
      <path d="M128 132l-10 8 10 8" stroke="#E4007C" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="168" y="116" width="64" height="26" rx="13" fill="#E4007C" />
      <text x="200" y="134" textAnchor="middle" className="minimap__small">٢٠٠ متر</text>
      {/* الدبوس */}
      <g className="minimap__pin">
        <path d="M0 -50c-16 0-26 11-26 25 0 18 26 40 26 40s26-22 26-40c0-14-10-25-26-25z" fill="#E4007C" />
        <circle cx="0" cy="-26" r="10" fill="#fff" />
      </g>
      <text x="94" y="222" textAnchor="middle" className="minimap__label minimap__label--pink">مارشميللو</text>
    </svg>
  )
}

export default function Visit() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
  return (
    <section className="section visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit__inner">
        <div className="visit__info">
          <h2 className="section__title" id="visit-title" data-reveal>تعوا لعنّا</h2>
          <address className="visit__address">
            <PinIcon />
            <span>
              {site.address}
              <br />
              <strong>{site.addressHint}</strong>
            </span>
          </address>

          <div className="visit__facts">
            <p className="visit__hours">
              <ClockIcon /> <span>نستقبلكم</span> <strong>{site.hours}</strong>
            </p>
            <ul className="prices">
              {site.prices.map((pr, i) => (
                <li key={pr.title} className="price" data-reveal style={{ '--i': i + 1 }}>
                  <span className="price__title">{pr.title}</span>
                  <strong className="price__value">{pr.value}</strong>
                  <span className="price__note">{pr.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="contact">
            <li>
              <a href={`tel:${site.phone}`}>
                <PhoneIcon /> <span>اتصال</span> <bdi dir="ltr">{site.phoneDisplay}</bdi>
              </a>
            </li>
            <li>
              <a href={wa} target="_blank" rel="noreferrer">
                <ChatIcon /> <span>واتساب</span> <bdi dir="ltr">{site.phoneDisplay}</bdi>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
                <MailIcon /> <span>إيميل</span> <bdi dir="ltr">{site.email}</bdi>
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noreferrer">
                <PeopleIcon /> <span>فيسبوك</span> <bdi>صفحة مركز مارشميللو</bdi>
              </a>
            </li>
          </ul>
        </div>

        <a className="visit__map" data-reveal style={{ '--i': 2 }} href={site.mapsUrl} target="_blank" rel="noreferrer">
          <MiniMap />
          <span className="btn btn--magenta">
            <PinIcon /> افتحوا الموقع على الخريطة
          </span>
        </a>
      </div>
    </section>
  )
}
