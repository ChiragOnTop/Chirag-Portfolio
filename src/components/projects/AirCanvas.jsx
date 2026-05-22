import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const TRACKING_POINTS = [
  { x: 42, y: 28 }, { x: 55, y: 22 }, { x: 68, y: 30 },
  { x: 38, y: 45 }, { x: 52, y: 50 }, { x: 66, y: 48 },
  { x: 45, y: 62 }, { x: 58, y: 68 }, { x: 72, y: 58 },
  { x: 30, y: 55 }, { x: 78, y: 42 },
]

export default function AirCanvas({ project }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame
    const trails = []
    let t = 0

    const draw = () => {
      t += 0.02
      const w = canvas.width
      const h = canvas.height
      ctx.fillStyle = 'rgba(10, 10, 15, 0.12)'
      ctx.fillRect(0, 0, w, h)

      TRACKING_POINTS.forEach((p, i) => {
        const px = (p.x / 100) * w + Math.sin(t + i) * 8
        const py = (p.y / 100) * h + Math.cos(t * 1.2 + i) * 6
        trails.push({ x: px, y: py, life: 1 })
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${0.5 + Math.sin(t + i) * 0.3})`
        ctx.fill()
        ctx.strokeStyle = '#00e5ff'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      for (let i = trails.length - 1; i >= 0; i--) {
        trails[i].life -= 0.02
        if (trails[i].life <= 0) trails.splice(i, 1)
        else if (i > 0) {
          ctx.beginPath()
          ctx.moveTo(trails[i - 1].x, trails[i - 1].y)
          ctx.lineTo(trails[i].x, trails[i].y)
          ctx.strokeStyle = `rgba(0, 229, 255, ${trails[i].life * 0.4})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      if (Math.sin(t * 2) > 0.7) {
        ctx.beginPath()
        ctx.strokeStyle = '#ec4899'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        const sx = w * 0.3 + Math.sin(t * 3) * 40
        const sy = h * 0.4
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(sx + 60, sy - 30, sx + 120, sy + 20)
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
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${project.accent}33, transparent 55%)`,
        }}
      />

      <div className="relative grid h-full grid-cols-1 gap-8 p-8 lg:grid-cols-2 lg:p-12">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <span
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: project.accent }}
          >
            Experimental Computer Vision Interface
          </span>
          <h3 className="mt-4 font-display text-4xl font-bold md:text-5xl">{project.title}</h3>
          <p className="mt-4 font-mono text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <ul className="mt-6 space-y-2">
            {project.highlights?.map((h) => (
              <li key={h} className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric)]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 relative lg:order-2">
          <div className="glass relative aspect-[4/3] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 font-mono text-[9px] tracking-widest text-[var(--color-electric)] uppercase">
              <div className="flex justify-between">
                <span>CV HUD v2.1</span>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Tracking Active
                </motion.span>
              </div>
              <div className="flex gap-4">
                <span>Hands: 1</span>
                <span>Gestures: draw</span>
                <span>FPS: 60</span>
              </div>
            </div>

            <video
              className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
              autoPlay
              muted
              loop
              playsInline
              style={{ display: 'none' }}
            />

            <div
              className="absolute inset-0 bg-gradient-to-br from-ink/80 via-ink/60 to-violet-900/40"
              aria-hidden
            />

            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{ width: '100%', height: '100%' }}
            />

            <div className="absolute top-4 right-4 rounded-lg border border-[var(--color-electric)]/40 bg-black/40 px-3 py-2 backdrop-blur-sm">
              <p className="font-mono text-[8px] text-white/70 uppercase">Webcam Sim</p>
              <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full bg-[var(--color-electric)]"
                  animate={{ width: ['20%', '90%', '50%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
