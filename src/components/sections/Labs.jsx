import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { labs } from '../../data/portfolio'

const statusStyles = {
  Live: 'bg-[var(--color-holo)]/15 text-[var(--color-holo)] border-[var(--color-holo)]/30',
  Beta: 'bg-[var(--color-violet)]/10 text-[var(--color-violet)] border-[var(--color-violet)]/30',
  Research: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
}

export default function Labs() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.lab-item', {
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 72%',
        },
      })
    },
    { scope: ref }
  )

  return (
    <section id="labs" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="Experimental Labs"
          subtitle="Prototypes, shaders, and interfaces in perpetual evolution."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.id}
              className="lab-item"
              whileHover={{ scale: 1.01 }}
              data-cursor
            >
              <GlassPanel
                className="group relative overflow-hidden p-8 md:p-10"
                depth={i % 2 === 0 ? 2 : 1}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,170,0.03) 2px, rgba(0,212,170,0.03) 4px)',
                    }}
                  />
                </div>

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest uppercase ${statusStyles[lab.status]}`}
                    >
                      {lab.status}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                      {lab.title}
                    </h3>
                    <p className="mt-3 max-w-md font-mono text-sm text-ink-muted">
                      {lab.description}
                    </p>
                  </div>
                  <motion.span
                    className="font-display text-4xl text-ink/10"
                    whileHover={{ color: 'var(--color-holo)', opacity: 0.5 }}
                  >
                    ◈
                  </motion.span>
                </div>

                <div className="relative mt-8 flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-holo)]" />
                  Launch Experiment
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
