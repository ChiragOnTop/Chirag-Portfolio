import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Magnetic from '../ui/Magnetic'

const ZODIAC = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

export default function StellarAI({ project }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2,
      a: Math.random() * Math.PI * 2,
      s: 0.002 + Math.random() * 0.004,
    }))

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      stars.forEach((st) => {
        st.a += st.s
        const x = w / 2 + Math.cos(st.a) * st.x * w * 0.45
        const y = h / 2 + Math.sin(st.a) * st.y * h * 0.45
        ctx.beginPath()
        ctx.arc(x, y, st.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${0.3 + Math.sin(st.a * 3) * 0.2})`
        ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="stellar-ai"
      className="relative min-h-[640px] overflow-hidden rounded-3xl"
      aria-labelledby="stellar-ai-title"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, ${project.accent}33, transparent),
            radial-gradient(ellipse 50% 40% at 90% 70%, #7c3aed28, transparent),
            radial-gradient(ellipse 80% 60% at 50% 100%, #0a0a1a08, transparent)
          `,
        }}
      />

      {ZODIAC.map((z, i) => (
        <motion.span
          key={z}
          className="pointer-events-none absolute font-mono text-lg opacity-20"
          style={{
            left: `${8 + (i % 4) * 22}%`,
            top: `${10 + Math.floor(i / 4) * 28}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        >
          {z}
        </motion.span>
      ))}

      <div className="relative grid grid-cols-1 gap-10 p-8 md:grid-cols-2 md:p-14 lg:gap-16">
        <div className="flex flex-col justify-center">
          <span
            className="font-mono text-[10px] tracking-[0.4em] uppercase"
            style={{ color: project.accent }}
          >
            ◈ {project.tag} — Cosmic Intelligence
          </span>
          <h3
            id="stellar-ai-title"
            className="mt-5 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-bold tracking-tight"
          >
            {project.title}
          </h3>
          <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="glass rounded-full px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[400px] items-center justify-center perspective-[1400px]">
          <Magnetic strength={0.2} className="relative">
            <motion.div
              className="relative z-10 h-[360px] w-[190px] rounded-[2.2rem] border border-white/60 bg-gradient-to-b from-white/70 to-white/25 p-2.5 shadow-2xl"
              style={{
                boxShadow: `0 50px 100px ${project.accent}25, 0 0 80px ${project.accent}12`,
                transformStyle: 'preserve-3d',
              }}
              animate={{ y: [0, -14, 0], rotateY: [-10, 10, -10] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-[#0a0a12]">
                <div className="border-b border-white/10 p-4">
                  <p className="font-mono text-[8px] tracking-[0.3em] text-[var(--color-electric)] uppercase">
                    Stellar AI Chat
                  </p>
                </div>
                <div className="flex-1 space-y-3 overflow-hidden p-3">
                  {[
                    { role: 'ai', text: 'Cosmic alignment detected.' },
                    { role: 'user', text: 'Analyze neural stream.' },
                    { role: 'ai', text: 'Processing zodiac data...' },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`max-w-[90%] rounded-xl px-3 py-2 font-mono text-[8px] leading-relaxed ${
                        msg.role === 'ai'
                          ? 'bg-[var(--color-electric)]/15 text-[var(--color-electric)]'
                          : 'ml-auto bg-white/10 text-white/70'
                      }`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.4 }}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Magnetic>

          <motion.div
            className="glass-holo absolute -left-4 top-1/4 hidden w-44 rounded-2xl p-4 md:block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <p className="font-mono text-[9px] tracking-widest text-ink-muted uppercase">
              Live Streams
            </p>
            <div className="mt-3 space-y-2">
              {[92, 78, 85, 96].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--color-electric)] to-violet-500"
                      animate={{ width: [`${v - 20}%`, `${v}%`] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </div>
                  <span className="font-mono text-[8px] text-ink-muted">{v}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-holo absolute -right-2 bottom-1/4 hidden rounded-2xl p-4 md:block"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="font-mono text-[9px] text-[var(--color-electric)] uppercase">
              Dashboard
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-sm bg-gradient-to-br from-[var(--color-electric)]/40 to-violet-500/30"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
