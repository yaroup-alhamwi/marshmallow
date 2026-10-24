import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { ChatIcon } from './Icons'

export default function Footer() {
  // زر الواتساب العائم بيظهر بعد ما ننزل تحت الواجهة
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <footer className="footer">
        <p className="footer__brand">{site.shortName}</p>
        <p>{site.slogan}</p>
        <p className="footer__small">© {new Date().getFullYear()} {site.name} – دمشق</p>
      </footer>
      <a
        className={`fab${show ? '' : ' fab--hidden'}`}
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="راسلونا عالواتساب"
      >
        <ChatIcon width={28} height={28} />
      </a>
    </>
  )
}
