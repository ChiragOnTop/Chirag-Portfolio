import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import StellarAI from '../projects/StellarAI'
import AirCanvas from '../projects/AirCanvas'
import { featuredProjects, projects } from '../../data/portfolio'

export default function Projects() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.project-featured', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })

      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 80%',
        },
      })
    },
    { scope: ref }
  )

  const stellar = featuredProjects.find((p) => p.id === 'stellar-ai')
  const airCanvas = featuredProjects.find((p) => p.id === 'air-canvas')

  return (
    <section id="projects" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          title="Cinematic Work"
          subtitle="Flagship AI ecosystems and experimental interfaces — built for the next internet."
        />

        <div className="space-y-12">
          {stellar && (
            <div className="project-featured glass-holo holo-border overflow-hidden rounded-3xl">
              <StellarAI project={stellar} />
            </div>
          )}

          {airCanvas && (
            <div className="project-featured glass-holo holo-border overflow-hidden rounded-3xl">
              <AirCanvas project={airCanvas} />
            </div>
          )}
        </div>

        <div className="project-grid mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="project-card project-3d"
              whileHover={{ zIndex: 10 }}
              data-cursor
            >
              <GlassPanel
                className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-8"
                depth={2}
              >
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-30 blur-2xl"
                  style={{ background: project.accent }}
                />
                <div>
                  <div className="flex justify-between font-mono text-[10px] tracking-widest uppercase">
                    <span style={{ color: project.accent }}>{project.tag}</span>
                    <span className="text-ink-muted">{project.year}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{project.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-ink-muted">
                    {project.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-ink/5 px-2 py-0.5 font-mono text-[9px] uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors hover:text-[var(--color-electric)]"
                    >
                      View Live <span>→</span>
                    </a>
                  )}
                </div>
                <span className="absolute top-4 right-6 font-display text-6xl font-bold text-ink/[0.03]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </GlassPanel>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
