import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion, AnimatePresence } from 'framer-motion'
import HeroScene from '../three/HeroScene'
import { subtitles } from '../../data/portfolio'

export default function Hero() {
  const containerRef = useRef(null)
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((i) => (i + 1) % subtitles.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-line', { y: 120, opacity: 0, duration: 1.4, stagger: 0.15 })
        .from('.hero-sub', { y: 40, opacity: 0, duration: 1 }, '-=0.8')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
        .from('.hero-meta', { opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-hud', { scale: 0.9, opacity: 0, duration: 1.2, stagger: 0.1 }, '-=0.8')

      gsap.to('.hero-glow-orb', {
        x: 30,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: containerRef }
  )

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCoords({ x, y })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16"
    >
      <HeroScene />

      <div
        className="hero-glow-orb pointer-events-none absolute top-1/4 right-[10%] h-[420px] w-[420px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,170,0.25) 0%, rgba(124,58,237,0.08) 45%, transparent 70%)',
          transform: `translate(${coords.x * 24}px, ${coords.y * 24}px)`,
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <div className="grid-bg scanline pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="hero-meta hero-line font-mono text-xs tracking-[0.4em] text-ink-muted uppercase">
              Neural Interface v2.0 — Online
            </p>

            <h1 className="hero-line mt-6 font-display text-[clamp(2.8rem,12vw,8rem)] leading-[0.9] font-extrabold tracking-tighter">
              <span className="block text-stroke text-ink/90">CHIRAG</span>
              <span className="hero-title-main holo-text glow-holo block">GAMBHIR</span>
            </h1>

            <div className="hero-sub mt-8 flex min-h-[3rem] items-center gap-4">
              <span className="font-mono text-xs text-[var(--color-holo)]">▸</span>
              <div className="relative h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={subtitleIndex}
                    initial={{ y: 28, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -28, opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute font-mono text-sm tracking-[0.2em] text-ink-muted uppercase md:text-base"
                  >
                    {subtitles[subtitleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p className="hero-line mt-8 max-w-lg font-mono text-sm leading-relaxed text-ink-muted">
              Architecting immersive AI-native experiences at the intersection of
              intelligence, interface, and cinematic motion.
            </p>

            <div className="hero-cta mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                data-cursor
                className="group relative overflow-hidden rounded-full bg-ink px-8 py-4 font-mono text-xs tracking-widest text-frost uppercase"
              >
                <span className="relative z-10">View Work</span>
                <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-holo)] transition-transform duration-500 group-hover:scale-x-100" />
              </a>
              <a
                href="#labs"
                data-cursor
                className="glass rounded-full px-8 py-4 font-mono text-xs tracking-widest text-ink uppercase transition-colors hover:bg-white/50"
              >
                Enter Labs
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 lg:col-span-4">
            {[
              { label: 'Systems', value: '12+' },
              { label: 'Experiments', value: '24' },
              { label: 'Latency', value: '<16ms' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="hero-hud glass flex items-center justify-between rounded-xl px-5 py-4"
                style={{
                  transform: `translate(${coords.x * -8}px, ${coords.y * -4}px)`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-mono text-xs tracking-wider text-ink-muted uppercase">
                  {stat.label}
                </span>
                <span className="font-display text-2xl font-bold holo-text">{stat.value}</span>
              </motion.div>
            ))}

            <div
              className="hero-hud glass mt-4 rounded-xl p-5"
              style={{
                transform: `translate(${coords.x * 12}px, ${coords.y * 8}px)`,
              }}
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                <span>Hologram Status</span>
                <span className="text-[var(--color-holo)]">Active</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-holo)] to-[var(--color-violet)]"
                  animate={{ width: ['30%', '85%', '60%', '90%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-[var(--color-holo)] to-transparent" />
      </motion.div>
    </section>
  )
}
