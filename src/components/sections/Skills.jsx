import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import SectionHeading from '../ui/SectionHeading'
import SkillOrbit from './SkillOrbit'

export default function Skills() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.skills-orbit-wrap', {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
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
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.2), rgba(139,92,246,0.08), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          title="Neural Tech Matrix"
          subtitle="Orbital skill map — hover nodes to scan the full capability stack."
        />

        <div className="skills-orbit-wrap glass-holo holo-border mx-auto mt-8 max-w-5xl rounded-3xl p-4 md:p-8">
          <SkillOrbit />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {['AI Integrations', 'Computer Vision', 'WebGL / 3D', 'Futuristic Motion'].map(
            (label) => (
              <div
                key={label}
                className="glass rounded-xl px-4 py-3 text-center font-mono text-[10px] tracking-widest text-ink-muted uppercase"
              >
                <span className="mr-2 text-[var(--color-electric)]">◈</span>
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
