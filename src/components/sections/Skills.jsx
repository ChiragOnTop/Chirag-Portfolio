import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { skills } from '../../data/portfolio'

const categoryColors = {
  ai: 'var(--color-holo)',
  frontend: 'var(--color-violet)',
  backend: 'var(--color-amber)',
  creative: '#ec4899',
}

export default function Skills() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.skill-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 72%',
        },
      })

      gsap.to('.skill-bar-fill', {
        width: (i, el) => el.dataset.level + '%',
        duration: 1.4,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 65%',
        },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden px-4 py-32 md:px-8 md:py-48"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,212,170,0.3), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          title="Capability Matrix"
          subtitle="Depth across the full stack — from models to motion."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              style={{ perspective: 800 }}
            >
              <GlassPanel className="relative h-full overflow-hidden p-6">
                <div
                  className="absolute top-0 right-0 h-24 w-24 rounded-bl-full opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColors[skill.category]}, transparent)`,
                  }}
                />
                <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{skill.name}</h3>
                <div className="mt-6 h-1 overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="skill-bar-fill h-full rounded-full"
                    data-level={skill.level}
                    style={{
                      width: 0,
                      background: categoryColors[skill.category],
                      boxShadow: `0 0 12px ${categoryColors[skill.category]}`,
                    }}
                  />
                </div>
                <span className="mt-2 block text-right font-mono text-xs text-ink-muted">
                  {skill.level}%
                </span>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
