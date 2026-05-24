import { useEffect, useRef } from 'react'

export default function GlobalAmbience() {
  const canvasRef = useRef(null)
  const glowRef = useRef(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let frame
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      hue: 170 + Math.random() * 60,
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1

        const px = p.x * w + (mouse.current.x - 0.5) * 12
        const py = p.y * h + (mouse.current.y - 0.5) * 12

        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.35)`
        ctx.fill()
      })

      frame = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[1] opacity-60"
        aria-hidden
      />
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[1] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 mix-blend-screen transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.2) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,10,15,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,15,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }}
        aria-hidden
      />
      <div
        className="ambient-gradient pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
    </>
  )
}
