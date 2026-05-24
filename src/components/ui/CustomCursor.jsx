import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRef = useRef([])
  const trailEls = useRef([])

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(max-width: 768px)').matches
    if (prefersReduced || isTouch) return

    trailEls.current = trailRef.current.map((el) => el).filter(Boolean)

    const positions = Array.from({ length: trailEls.current.length }, () => ({
      x: 0,
      y: 0,
    }))

    const move = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.06, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, ease: 'power3.out' })

      positions.unshift({ x: e.clientX, y: e.clientY })
      positions.length = trailEls.current.length

      trailEls.current.forEach((el, i) => {
        const p = positions[i] || positions[positions.length - 1]
        if (p) gsap.to(el, { x: p.x, y: p.y, opacity: 0.15 - i * 0.025, duration: 0.2 })
      })
    }

    const hoverIn = () => {
      gsap.to(ring, {
        scale: 2.4,
        borderColor: 'rgba(0,229,255,0.8)',
        boxShadow: '0 0 30px rgba(0,229,255,0.4)',
        duration: 0.35,
      })
    }
    const hoverOut = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(0,229,255,0.35)',
        boxShadow: '0 0 0 transparent',
        duration: 0.35,
      })
    }

    const bindHover = () => {
      document.querySelectorAll('a, button, [data-cursor], [data-magnetic]').forEach((el) => {
        el.addEventListener('mouseenter', hoverIn)
        el.addEventListener('mouseleave', hoverOut)
      })
    }

    window.addEventListener('mousemove', move)
    bindHover()
    const observer = new MutationObserver(bindHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
      document.querySelectorAll('a, button, [data-cursor], [data-magnetic]').forEach((el) => {
        el.removeEventListener('mouseenter', hoverIn)
        el.removeEventListener('mouseleave', hoverOut)
      })
    }
  }, [])

  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRef.current[i] = el
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9996] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-electric)] md:block"
          aria-hidden
        />
      ))}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-electric)] shadow-[0_0_12px_rgba(0,229,255,0.8)] md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-electric)]/35 md:block"
        aria-hidden
      />
    </>
  )
}
