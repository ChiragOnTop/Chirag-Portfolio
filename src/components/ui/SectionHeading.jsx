import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'

export default function SectionHeading({ index, title, subtitle }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.section-heading-inner', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: ref }
  )

  return (
    <header ref={ref} className="mb-16 md:mb-24">
      <div className="section-heading-inner flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-ink-muted uppercase">
        <span className="h-px w-12 bg-[var(--color-holo)]" />
        <span>{index}</span>
      </div>
      <h2 className="section-heading-inner mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="section-heading-inner mt-4 max-w-xl font-mono text-sm text-ink-muted md:text-base">
          {subtitle}
        </p>
      )}
    </header>
  )
}
