import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { aboutStats } from '../../data/portfolio'

const pillars = [
  {
    title: 'Futuristic Mindset',
    body: 'Interfaces are not screens — they are spatial experiences that anticipate intent before interaction.',
  },
  {
    title: 'Immersive Obsession',
    body: 'Every pixel, particle, and motion curve is engineered to pull visitors into another dimension of craft.',
  },
  {
    title: 'AI × Creative Engineering',
    body: 'From LLM orchestration to computer vision labs, intelligence is woven into the fabric of design.',
  },
]

export default function About() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.about-reveal', {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 68%',
        },
      })

      gsap.to('.about-float', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.4, from: 'random' },
      })
    },
    { scope: ref }
  )

  return (
    <section id="about" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="about-float pointer-events-none absolute top-20 right-[8%] h-32 w-32 rounded-full border border-[var(--color-electric)]/20 opacity-40" />
      <div className="about-float pointer-events-none absolute bottom-32 left-[5%] h-20 w-20 rounded-2xl border border-violet-400/20 opacity-30" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          title="Operating on Another Level"
          subtitle="A storyteller-engineer building the next generation of the internet."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="about-reveal lg:col-span-7">
            <GlassPanel className="glass-holo relative overflow-hidden p-8 md:p-12" depth={2}>
              <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-electric)] uppercase">
                Transmission 01 — Origin
              </p>
              <p className="mt-8 font-display text-2xl leading-snug font-semibold md:text-3xl">
                I don&apos;t build websites. I architect{' '}
                <span className="holo-text">holographic operating systems</span> for the AI era.
              </p>
              <p className="mt-6 font-mono text-sm leading-relaxed text-ink-muted">
                Chirag Gambhir — elite AI engineer, creative technologist, and futuristic
                full-stack developer. Obsessed with experimental interfaces, computer vision,
                immersive 3D, and cinematic motion that makes technology feel like magic.
              </p>

              <div className="mt-10 space-y-6">
                {pillars.map((p, i) => (
                  <motion.div
                    key={p.title}
                    className="border-l-2 border-[var(--color-electric)]/40 pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <h3 className="font-display text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-ink-muted">
                      {p.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="about-reveal flex flex-col gap-4 lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {aboutStats.map((stat) => (
                <GlassPanel key={stat.label} className="p-5 text-center" hover={false}>
                  <div className="font-display text-3xl font-bold holo-text">{stat.value}</div>
                  <div className="mt-2 font-mono text-[9px] tracking-widest text-ink-muted uppercase">
                    {stat.label}
                  </div>
                </GlassPanel>
              ))}
            </div>

            <GlassPanel className="relative flex-1 overflow-hidden p-8">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,229,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>
              <p className="relative font-mono text-[10px] tracking-[0.35em] text-ink-muted uppercase">
                Core Directive
              </p>
              <p className="relative mt-4 font-display text-xl font-medium italic leading-relaxed">
                &ldquo;Flex extreme web development, AI, and creative engineering until the
                interface feels unforgettable.&rdquo;
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
