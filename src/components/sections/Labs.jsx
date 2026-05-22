import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { labs } from '../../data/portfolio'

const statusStyles = {
  Live: 'bg-[var(--color-electric)]/12 text-[var(--color-electric)] border-[var(--color-electric)]/35',
  Beta: 'bg-violet-500/10 text-violet-600 border-violet-400/30',
  Research: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
}

export default function Labs() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.lab-item', {
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
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
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.12), transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="Experimental Labs"
          subtitle="A futuristic innovation center — AI experiments, CV systems, and holographic prototypes."
        />

        <div className="mb-8 flex flex-wrap gap-2 font-mono text-[10px] tracking-widest uppercase">
          {['AI Experiments', 'Computer Vision', 'Holographic UI', 'Creative Prototypes'].map(
            (tag) => (
              <span
                key={tag}
                className="glass rounded-full px-4 py-2 text-ink-muted"
              >
                {tag}
              </span>
            ),
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.id}
              className="lab-item"
              whileHover={{ y: -8, rotateX: 2 }}
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor
            >
              <GlassPanel
                className="group relative h-full overflow-hidden p-7 md:p-8"
                depth={i % 3 === 0 ? 2 : 1}
              >
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[var(--color-electric)]/10 blur-2xl transition-opacity group-hover:opacity-100" />

                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[9px] tracking-widest uppercase ${statusStyles[lab.status]}`}
                  >
                    {lab.status}
                  </span>
                  <span className="font-mono text-[9px] text-ink-muted uppercase">
                    {lab.category}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold md:text-2xl">{lab.title}</h3>
                <p className="mt-3 font-mono text-xs leading-relaxed text-ink-muted">
                  {lab.description}
                </p>

                <div className="mt-6 flex items-center gap-2 font-mono text-[9px] tracking-widest text-[var(--color-electric)] uppercase opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-electric)]" />
                  Enter Lab
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
