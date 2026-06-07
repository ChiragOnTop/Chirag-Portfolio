import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion, AnimatePresence } from 'framer-motion'
import HolographicProfileCard from '../ui/HolographicProfileCard'
import EarthZoomAnimation from '../intro/EarthZoomAnimation'
import { subtitles } from '../../data/portfolio'
import heroImage from '../../assets/hero.png'

export default function Hero() {
  const containerRef = useRef(null)
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [showZoomAnimation, setShowZoomAnimation] = useState(true)

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
        .from('.hero-profile', { scale: 0.9, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-glow-orb', { scale: 0, opacity: 0, duration: 0.8 }, '-=0.3')

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

  if (showZoomAnimation) {
    return <EarthZoomAnimation onComplete={() => setShowZoomAnimation(false)} />
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16"
    >
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
          <div className="lg:col-span-6">
            <p className="hero-line hero-meta font-mono text-xs tracking-[0.4em] text-ink-muted uppercase">
              AI Developer Portfolio v4.0 — Welcome
            </p>

            <h1 className="hero-line mt-8 font-display text-[clamp(2.5rem,10vw,6rem)] leading-[1] font-extrabold tracking-tighter">
              <span className="block text-ink/90">Chirag Gambhir</span>
              <span className="hero-title-main holo-text glow-holo block text-cyan-400">
                AI Developer
              </span>
            </h1>

            <div className="hero-sub mt-8 flex min-h-[3rem] items-center gap-4">
              <span className="font-mono text-xs text-cyan-400">▸</span>
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

            <p className="hero-line mt-8 max-w-md font-mono text-sm leading-relaxed text-ink-muted">
              Building AI-powered products, computer vision systems, and immersive digital experiences. Passionate about turning complex problems into elegant, user-friendly solutions.
            </p>

            <div className="hero-cta mt-10 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="relative px-8 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-full font-mono text-sm font-semibold text-cyan-300 hover:bg-cyan-500/30 transition-all hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                role="button"
                aria-label="View my featured projects and case studies"
                tabIndex={0}
              >
                View Projects
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1oM4B1G1scXMg93X-Nbu8RF1nx_PMyRYv/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-8 py-3 border border-ink/30 rounded-full font-mono text-sm font-semibold text-ink hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download my resume as PDF (opens in new window)"
                tabIndex={0}
              >
                Download Resume
              </motion.a>

              <motion.a
                href="#contact"
                className="relative px-8 py-3 bg-ink text-frost rounded-full font-mono text-sm font-semibold hover:bg-ink/90 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Skip to contact section to send me a message"
                tabIndex={0}
              >
                Get in Touch
              </motion.a>
            </div>

            <div className="hero-line mt-12 flex gap-8">
              <a
                href="https://github.com/ChiragOnTop"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-muted hover:text-cyan-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/chiraggambhir"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-muted hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/chiraggambhir"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-muted hover:text-cyan-400 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>

          <div className="hero-profile lg:col-span-6 flex items-center justify-center">
            <HolographicProfileCard imageUrl={heroImage} />
          </div>
        </div>
      </div>
    </section>
  )
}
