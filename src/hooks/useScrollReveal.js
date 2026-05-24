import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'

export function useScrollReveal(scopeRef, selector = '.reveal', options = {}) {
  const {
    y = 72,
    duration = 1.1,
    stagger = 0.1,
    start = 'top 82%',
  } = options

  useGSAP(
    () => {
      gsap.from(selector, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: scopeRef }
  )
}
