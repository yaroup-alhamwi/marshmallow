// أيقونات بسيطة — كل وحدة إلها حركة خاصة لما تمرّق عليها أو تكبسها (شوف styles.css: "الأيقونات التفاعلية")
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Svg = ({ kind, children, className = '', ...p }) => (
  <svg {...base} {...p} className={`ico ico-${kind} ${className}`}>
    {children}
  </svg>
)

export const PhoneIcon = (p) => (
  <Svg kind="phone" {...p}>
    <path d="M5 3h3.5l2 5-2.5 1.5a11 11 0 0 0 6.5 6.5L16 13.5l5 2V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
    <path className="ico-phone__wave" d="M15 3.5a6 6 0 0 1 5.5 5.5M15 7a2.6 2.6 0 0 1 2 2" />
  </Svg>
)

export const ChatIcon = (p) => (
  <Svg kind="chat" {...p}>
    <path d="M20 11.5A8.5 8.5 0 0 1 7.6 19L3 20.5 4.5 16A8.5 8.5 0 1 1 20 11.5z" />
    <path className="ico-chat__dot" d="M8.5 11.5h.01" strokeWidth="3" />
    <path className="ico-chat__dot" d="M12 11.5h.01" strokeWidth="3" />
    <path className="ico-chat__dot" d="M15.5 11.5h.01" strokeWidth="3" />
  </Svg>
)

export const PinIcon = (p) => (
  <Svg kind="pin" {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
)

export const MailIcon = (p) => (
  <Svg kind="mail" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path className="ico-mail__flap" d="m4 7 8 6 8-6" />
  </Svg>
)

export const PeopleIcon = (p) => (
  <Svg kind="people" {...p}>
    <g className="ico-people__a">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </g>
    <g className="ico-people__b">
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.2c2.8.2 5 2.6 5 5.8" />
    </g>
  </Svg>
)

export const ShieldIcon = (p) => (
  <Svg kind="shield" {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" />
    <path className="ico-shield__check" d="m8.5 12 2.5 2.5 4.5-5" />
  </Svg>
)

export const EyeIcon = (p) => (
  <Svg kind="eye" {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
)

export const ClockIcon = (p) => (
  <Svg kind="clock" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path className="ico-clock__hand" d="M12 12V7" />
    <path d="M12 12l3 2" />
  </Svg>
)

export const HeartIcon = (p) => (
  <Svg kind="heart" {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
  </Svg>
)

export const SparkleIcon = (p) => (
  <Svg kind="sparkle" {...p}>
    <path className="ico-sparkle__big" d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z" />
    <path className="ico-sparkle__small" d="M19 16.5c.2 1.4 1 2.1 2.3 2.3-1.4.2-2.1 1-2.3 2.3-.2-1.4-1-2.1-2.3-2.3 1.4-.2 2.1-1 2.3-2.3z" />
  </Svg>
)

export const iconFor = { shield: ShieldIcon, eye: EyeIcon, pin: PinIcon, heart: HeartIcon, sparkle: SparkleIcon }
