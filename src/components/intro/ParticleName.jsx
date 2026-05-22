import { useRef, useEffect } from 'react'

const LINES = ['CHIRAG', 'GAMBHIR']

export default function ParticleName({ active, onComplete }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const targets = []
    const fontSize = Math.min(w * 0.11, 120)
    const lineHeight = fontSize * 1.1
    const startY = h / 2 - lineHeight / 2

    LINES.forEach((line, li) => {
      ctx.font = `800 ${fontSize}px Syne, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const metrics = ctx.measureText(line)
      const textW = metrics.width
      const startX = (w - textW) / 2
      const y = startY + li * lineHeight

      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')
      octx.font = ctx.font
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#fff'
      octx.fillText(line, w / 2, y)
      const data = octx.getImageData(0, 0, w, h).data

      const step = w < 640 ? 5 : 4
      for (let py = 0; py < h; py += step) {
        for (let px = 0; px < w; px += step) {
          const i = (py * w + px) * 4
          if (data[i + 3] > 128) {
            targets.push({
              tx: px,
              ty: py,
              x: Math.random() * w,
              y: Math.random() * h,
              vx: 0,
              vy: 0,
              hue: 170 + Math.random() * 80,
            })
          }
        }
      }
    })

    const particles = targets
    let progress = 0
    const duration = 2200
    let start = null

    const draw = (ts) => {
      if (!start) start = ts
      progress = Math.min(1, (ts - start) / duration)
      const ease = 1 - Math.pow(1 - progress, 3)

      ctx.fillStyle = 'rgba(2, 2, 8, 0.25)'
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p) => {
        p.x += (p.tx - p.x) * (0.04 + ease * 0.08)
        p.y += (p.ty - p.y) * (0.04 + ease * 0.08)
        const alpha = 0.3 + ease * 0.7
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2 + ease * 0.8, 0, Math.PI * 2)
        ctx.fill()
      })

      if (progress < 1) {
        animRef.current = requestAnimationFrame(draw)
      } else {
        onComplete?.()
      }
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden
    />
  )
}
