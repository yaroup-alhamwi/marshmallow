import { useEffect, useState } from 'react'
import { setSound, useSound } from '../sound'

// زر الصوت/الوضع الصامت بالشريط العلوي
export default function SoundToggle() {
  const on = useSound()
  // تلميح صغير لأول زيارة بس
  const [hint, setHint] = useState(false)
  useEffect(() => {
    let seen = true
    try {
      seen = localStorage.getItem('marshmallow-sound') !== null
    } catch {
      /* */
    }
    if (seen) return
    const a = setTimeout(() => setHint(true), 2500)
    const b = setTimeout(() => setHint(false), 9000)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [])

  return (
    <button
      type="button"
      className={`sound-toggle${on ? ' is-on' : ''}${hint ? ' has-hint' : ''}`}
      onClick={() => {
        setHint(false)
        setSound(!on)
      }}
      aria-pressed={on}
      aria-label={on ? 'سكّر الصوت' : 'شغّل الصوت'}
      title={on ? 'سكّر الصوت' : 'شغّل الصوت'}
    >
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" className="sound-toggle__icon">
        {/* سمّاعة على شكل مارشميللو */}
        <path d="M5 12.5c0-1.4 1.1-2.5 2.5-2.5H11l6.2-5.1c.9-.7 2.3-.1 2.3 1.1v20c0 1.2-1.4 1.8-2.3 1.1L11 22H7.5C6.1 22 5 20.9 5 19.5z" fill="#fff" />
        <ellipse cx="9" cy="15" rx="1.2" ry="1.5" fill="#3A1250" />
        <ellipse cx="13.6" cy="15" rx="1.2" ry="1.5" fill="#3A1250" />
        {on ? (
          <>
            <path d="M10 18.2q1.3 1.6 2.6 0" stroke="#3A1250" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path className="sound-toggle__wave" d="M23 11.5a6 6 0 0 1 0 9" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path className="sound-toggle__wave sound-toggle__wave--2" d="M26.2 8.5a10.5 10.5 0 0 1 0 15" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M10.2 18.6h2.2" stroke="#3A1250" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M23 12.5l6 7M29 12.5l-6 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </>
        )}
      </svg>
      {hint && (
        <span className="sound-toggle__hint" role="status">
          في أصوات! اكبس لتشغّلها
        </span>
      )}
    </button>
  )
}
