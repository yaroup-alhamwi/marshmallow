// أصوات مرحة مولّدة بالكود (Web Audio) — بدون أي ملف صوت.
// الصوت مسكّر من الأساس، والزائر بيشغّله من زر السمّاعة، والموقع بيتذكّر اختياره.
import { useSyncExternalStore } from 'react'

const KEY = 'marshmallow-sound'
let enabled = false
try {
  enabled = localStorage.getItem(KEY) === 'on'
} catch {
  /* تخزين المتصفح مسكّر */
}

const listeners = new Set()
let ctx = null
let master = null

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.32
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function isSoundOn() {
  return enabled
}

export function setSound(on) {
  enabled = on
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* ما في مشكلة */
  }
  listeners.forEach((l) => l())
  if (on) play.chime()
}

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => enabled,
    () => false,
  )
}

// ---------- أدوات صغيرة ----------
function tone({ type = 'sine', from, to, dur, vol = 0.5, delay = 0, curve = 'exp' }) {
  const a = audio()
  if (!a) return
  const t = a.currentTime + delay
  const o = a.createOscillator()
  const g = a.createGain()
  o.type = type
  o.frequency.setValueAtTime(from, t)
  if (to && to !== from) {
    if (curve === 'exp') o.frequency.exponentialRampToValueAtTime(to, t + dur)
    else o.frequency.linearRampToValueAtTime(to, t + dur)
  }
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(master)
  o.start(t)
  o.stop(t + dur + 0.05)
  return { o, g, t }
}

function noise({ dur, vol = 0.4, delay = 0, freq = 1200, q = 1, sweep }) {
  const a = audio()
  if (!a) return
  const t = a.currentTime + delay
  const len = Math.ceil(a.sampleRate * dur)
  const buf = a.createBuffer(1, len, a.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  const src = a.createBufferSource()
  src.buffer = buf
  const f = a.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = q
  f.frequency.setValueAtTime(freq, t)
  if (sweep) {
    sweep.forEach(([v, at]) => f.frequency.exponentialRampToValueAtTime(v, t + at))
  }
  const g = a.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 4))
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(f).connect(g).connect(master)
  src.start(t)
  src.stop(t + dur + 0.05)
}

// ---------- الأصوات ----------
const sounds = {
  // ضغطة المارشميللو: "سكويش" ناعمة
  squish() {
    tone({ type: 'sine', from: 260, to: 150, dur: 0.12, vol: 0.35 })
  },
  // ترك المارشميللو: "بوينغ" مطّاطي
  boing() {
    const n = tone({ type: 'triangle', from: 170, to: 520, dur: 0.38, vol: 0.5 })
    if (!n) return
    const lfo = ctx.createOscillator()
    const depth = ctx.createGain()
    lfo.frequency.value = 22
    depth.gain.setValueAtTime(70, n.t)
    depth.gain.exponentialRampToValueAtTime(1, n.t + 0.38)
    lfo.connect(depth).connect(n.o.frequency)
    lfo.start(n.t)
    lfo.stop(n.t + 0.42)
  },
  // البالون: "بوب"
  pop() {
    noise({ dur: 0.09, vol: 0.8, freq: 1800, q: 0.7 })
    tone({ type: 'sine', from: 700, to: 120, dur: 0.1, vol: 0.4 })
  },
  // نطّة طابة: "بونك"
  bonk(delay = 0, pitch = 1) {
    tone({ type: 'sine', from: 520 * pitch, to: 210 * pitch, dur: 0.13, vol: 0.4, delay })
  },
  // موجة طابات
  balls() {
    ;[0, 0.07, 0.14, 0.21, 0.3].forEach((d, i) => sounds.bonk(d, 1 + i * 0.12))
  },
  // الزحليطة: "وييييي"
  slide() {
    tone({ type: 'sine', from: 950, to: 260, dur: 1.0, vol: 0.28, curve: 'lin' })
    tone({ type: 'sine', from: 1900, to: 520, dur: 1.0, vol: 0.06, curve: 'lin' })
  },
  // ضربة الطابة والغول
  goal() {
    tone({ type: 'sine', from: 180, to: 90, dur: 0.12, vol: 0.6 })
    noise({ dur: 0.05, vol: 0.4, freq: 900 })
    // صفرة
    const w = tone({ type: 'sine', from: 2300, to: 2300, dur: 0.45, vol: 0.18, delay: 0.72 })
    if (w) {
      const lfo = ctx.createOscillator()
      const depth = ctx.createGain()
      lfo.frequency.value = 28
      depth.gain.value = 120
      lfo.connect(depth).connect(w.o.frequency)
      lfo.start(w.t)
      lfo.stop(w.t + 0.5)
    }
    // تصفيق وهيصة
    noise({ dur: 0.9, vol: 0.22, freq: 1400, q: 0.5, delay: 0.8 })
  },
  // الأشغال: نغمات خرز صغيرة
  beads() {
    ;[1046, 1318, 1568, 2093].forEach((f, i) => tone({ type: 'triangle', from: f, dur: 0.18, vol: 0.18, delay: i * 0.06 }))
    noise({ dur: 0.5, vol: 0.08, freq: 3000, q: 2, delay: 0.15 })
  },
  // الستارة: "ووووش"
  whoosh() {
    noise({ dur: 0.75, vol: 0.45, freq: 300, q: 0.9, sweep: [[2400, 0.35], [500, 0.75]] })
  },
  // الشمس: "دينغ"
  ding() {
    tone({ type: 'sine', from: 1318, dur: 0.7, vol: 0.3 })
    tone({ type: 'sine', from: 1976, dur: 0.5, vol: 0.12, delay: 0.02 })
  },
  // تشغيل الصوت: نغمة ترحيب
  chime() {
    ;[523, 659, 784, 1046].forEach((f, i) => tone({ type: 'triangle', from: f, dur: 0.22, vol: 0.25, delay: i * 0.08 }))
  },
}

// كل الأصوات بتمرق من هون: إذا الصوت مسكّر ما بيصير شي
export const play = new Proxy(sounds, {
  get(target, name) {
    const fn = target[name]
    return (...args) => {
      if (!enabled || typeof fn !== 'function') return
      try {
        fn(...args)
      } catch {
        /* الصوت مش ضروري، ما منخرّب الموقع عشانه */
      }
    }
  },
})
