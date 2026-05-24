import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const HAND_POINTS = [
  { x: 35, y: 30, label: 'WRIST' },
  { x: 42, y: 22, label: 'INDEX' },
  { x: 55, y: 20, label: 'MIDDLE' },
  { x: 68, y: 24, label: 'RING' },
  { x: 48, y: 42, label: 'THUMB' },
  { x: 52, y: 55, label: 'PALM' },
  { x: 62, y: 58, label: 'CV' },
]

export default function AirCanvas({ project }) {
  const canvasRef = useRef(null)
  const scanRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame
    let scanY = 0
    const trails = []

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.fillStyle = 'rgba(5, 8, 18, 0.15)'
      ctx.fillRect(0, 0, w, h)

      scanY = (scanY + 2) % h
      ctx.strokeStyle = 'rgba(0,229,255,0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(w, scanY)
      ctx.stroke()

      HAND_POINTS.forEach((p, i) => {
        const t = performance.now() * 0.001
        const px = (p.x / 100) * w + Math.sin(t + i) * 10
        const py = (p.y / 100) * h + Math.cos(t * 1.1 + i) * 8
        trails.push({ x: px, y: py, life: 1 })

        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139,92,246,0.7)'
        ctx.fill()
        ctx.strokeStyle = '#00e5ff'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.fillStyle = 'rgba(0,229,255,0.8)'
        ctx.font = '8px JetBrains Mono'
        ctx.fillText(p.label, px + 8, py - 8)
      })

      for (let i = trails.length - 1; i >= 0; i--) {
        trails[i].life -= 0.015
        if (trails[i].life <= 0) trails.splice(i, 1)
        else if (i > 0) {
          ctx.beginPath()
          ctx.moveTo(trails[i - 1].x, trails[i - 1].y)
          ctx.lineTo(trails[i].x, trails[i].y)
          ctx.strokeStyle = `rgba(236,72,153,${trails[i].life * 0.5})`
          ctx.lineWidth = 3
          ctx.lineCap = 'round'
          ctx.stroke()
        }
      }

      if (Math.sin(performance.now() * 0.002) > 0.5) {
        ctx.beginPath()
        ctx.strokeStyle = '#ec4899'
        ctx.lineWidth = 2.5
        ctx.lineCap = 'round'
        const sx = w * 0.25
        const sy = h * 0.45
        ctx.moveTo(sx, sy)
        ctx.bezierCurveTo(sx + 80, sy - 40, sx + 160, sy + 30, sx + 200, sy)
        ctx.stroke()
      }

      frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
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
      id="air-canvas"
      className="relative min-h-[640px] overflow-hidden rounded-3xl"
      aria-labelledby="air-canvas-title"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${project.accent}30, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(0,229,255,0.08), transparent)`,
        }}
      />

      <div className="relative grid grid-cols-1 gap-10 p-8 lg:grid-cols-2 lg:p-14">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <span
            className="font-mono text-[10px] tracking-[0.4em] uppercase"
            style={{ color: project.accent }}
          >
            Experimental Computer Vision Laboratory
          </span>
          <h3
            id="air-canvas-title"
            className="mt-5 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight"
          >
            {project.title}
          </h3>
          <p className="mt-5 font-mono text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {project.highlights?.map((h) => (
              <li
                key={h}
                className="glass flex items-center gap-2 rounded-xl px-3 py-2.5 font-mono text-[10px] tracking-wide text-ink-muted uppercase"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric)] shadow-[0_0_8px_var(--color-electric)]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 lg:order-2">
          <div
            ref={scanRef}
            className="glass-holo holo-border relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#050810]"
          >
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 font-mono text-[9px] tracking-[0.25em] uppercase">
              <div className="flex justify-between text-[var(--color-electric)]">
                <span>◈ CV HUD v3.1</span>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  SCANNING
                </motion.span>
              </div>
              <div className="flex flex-wrap gap-4 text-white/50">
                <span>Hands: 1</span>
                <span>Gestures: draw</span>
                <span>AI: active</span>
                <span>FPS: 60</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-transparent to-cyan-950/30" />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <div className="absolute top-4 right-4 z-20 rounded-xl border border-[var(--color-electric)]/30 bg-black/50 px-4 py-3 backdrop-blur-md">
              <p className="font-mono text-[8px] text-white/60 uppercase">Webcam Feed</p>
              <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-[var(--color-electric)]"
                  animate={{ width: ['15%', '95%', '40%'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </div>

            {['DETECT', 'TRACK', 'DRAW'].map((label, i) => (
              <motion.div
                key={label}
                className="absolute z-20 rounded border border-[var(--color-electric)]/40 bg-black/40 px-2 py-1 font-mono text-[7px] text-[var(--color-electric)]"
                style={{ left: `${15 + i * 28}%`, bottom: '12%' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
