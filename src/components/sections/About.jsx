import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'

export default function About() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.about-reveal', {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
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
    <section id="about" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          title="Engineering the Future"
          subtitle="Where artificial intelligence meets spatial interface design."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="about-reveal lg:col-span-5">
            <GlassPanel depth={2} className="relative overflow-hidden p-8 md:p-10">
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-30"
                style={{
                  background:
                    'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)',
                }}
              />
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-holo)] uppercase">
                Profile
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink md:text-xl">
                I build systems that feel alive — blending{' '}
                <span className="font-semibold text-ink">machine intelligence</span>,{' '}
                <span className="font-semibold text-ink">full-stack architecture</span>, and{' '}
                <span className="font-semibold text-ink">cinematic interaction design</span>{' '}
                into cohesive digital experiences.
              </p>
              <p className="mt-6 font-mono text-sm leading-relaxed text-ink-muted">
                From LLM orchestration to WebGL environments, every project is a lab for
                pushing what interfaces can feel like when AI is native to the canvas.
              </p>
            </GlassPanel>
          </div>

          <div className="about-reveal flex flex-col gap-6 lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { n: '05+', l: 'Years Crafting' },
                { n: '40+', l: 'Shipped Builds' },
                { n: '∞', l: 'Experiments' },
              ].map((item) => (
                <GlassPanel key={item.l} className="p-6 text-center" hover={false}>
                  <div className="font-display text-3xl font-bold holo-text md:text-4xl">
                    {item.n}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                    {item.l}
                  </div>
                </GlassPanel>
              ))}
            </div>

            <GlassPanel className="p-8">
              <div className="flex flex-wrap gap-3">
                {['AI Systems', 'Creative Code', 'Product Design', 'R&D'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/8 bg-white/30 px-4 py-2 font-mono text-[10px] tracking-widest uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote className="mt-8 border-l-2 border-[var(--color-holo)] pl-6 font-display text-xl font-medium italic md:text-2xl">
                &ldquo;The best interfaces don&apos;t explain — they resonate.&rdquo;
              </blockquote>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
