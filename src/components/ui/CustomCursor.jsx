import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(max-width: 768px)').matches
    if (prefersReduced || isTouch) return

    const move = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' })
    }

    const hoverIn = () => gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.3 })
    const hoverOut = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', hoverIn)
      el.addEventListener('mouseleave', hoverOut)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', hoverIn)
        el.removeEventListener('mouseleave', hoverOut)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-holo)] mix-blend-difference md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-holo)]/40 md:block"
        aria-hidden
      />
    </>
  )
}
