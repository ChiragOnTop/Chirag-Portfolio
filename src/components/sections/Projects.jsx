import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/portfolio'

export default function Projects() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.project-card', {
        x: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })

      if (trackRef.current && window.innerWidth >= 1024) {
        const track = trackRef.current
        const scrollWidth = track.scrollWidth - track.clientWidth

        gsap.to(track, {
          x: () => -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${scrollWidth + 400}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    },
    { scope: ref }
  )

  return (
    <section id="projects" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          title="Selected Work"
          subtitle="Flagship builds at the frontier of AI and interface craft."
        />
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex flex-col gap-6 px-4 md:px-8 lg:mt-0 lg:flex-row lg:gap-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className="project-card group relative w-full shrink-0 overflow-hidden rounded-3xl lg:w-[min(520px,42vw)]"
            whileHover={{ scale: 1.02 }}
            data-cursor
          >
            <div
              className="glass depth-shadow relative flex h-full min-h-[420px] flex-col justify-between p-8 md:p-10"
              style={{
                borderColor: `${project.accent}22`,
              }}
            >
              <div
                className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
                style={{ background: project.accent }}
              />

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
                  <span style={{ color: project.accent }}>{project.tag}</span>
                  <span className="text-ink-muted">{project.year}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-sm font-mono text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-ink/5 px-3 py-1 font-mono text-[10px] tracking-wider uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
                  <span
                    className="inline-block h-px w-8 transition-all group-hover:w-16"
                    style={{ background: project.accent }}
                  />
                  <span className="text-ink-muted transition-colors group-hover:text-ink">
                    Explore Case
                  </span>
                  <span className="text-2xl opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>

              <span className="absolute top-6 right-8 font-display text-7xl font-bold text-ink/[0.03]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
