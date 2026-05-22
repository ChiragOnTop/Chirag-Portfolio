import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'

export default function Contact() {
  const ref = useRef(null)
  const [focused, setFocused] = useState(null)

  useGSAP(
    () => {
      gsap.from('.contact-reveal', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })
    },
    { scope: ref }
  )

  return (
    <section id="contact" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          title="Initialize Contact"
          subtitle="Open a transmission channel — let's build something extraordinary."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <GlassPanel className="contact-reveal p-8 md:p-12" depth={2}>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              {[
                { id: 'name', label: 'Identity', type: 'text', placeholder: 'Your name' },
                {
                  id: 'email',
                  label: 'Frequency',
                  type: 'email',
                  placeholder: 'you@domain.com',
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className={`mt-2 w-full border-b bg-transparent py-3 font-mono text-sm outline-none transition-colors ${
                      focused === field.id
                        ? 'border-[var(--color-holo)]'
                        : 'border-ink/15'
                    }`}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase"
                >
                  Transmission
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your vision..."
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`mt-2 w-full resize-none border-b bg-transparent py-3 font-mono text-sm outline-none transition-colors ${
                    focused === 'message'
                      ? 'border-[var(--color-holo)]'
                      : 'border-ink/15'
                  }`}
                />
              </div>
              <motion.button
                type="submit"
                data-cursor
                className="w-full rounded-full bg-ink py-4 font-mono text-xs tracking-[0.3em] text-frost uppercase"
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,212,170,0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                Send Transmission
              </motion.button>
            </form>
          </GlassPanel>

          <div className="contact-reveal flex flex-col justify-between gap-8">
            <GlassPanel className="p-8 md:p-10">
              <p className="font-mono text-xs tracking-widest text-ink-muted uppercase">
                Direct Line
              </p>
              <a
                href="mailto:hello@chiraggambhir.dev"
                data-cursor
                className="mt-4 block font-display text-2xl font-bold transition-colors hover:text-[var(--color-holo)] md:text-4xl"
              >
                hello@chiraggambhir.dev
              </a>
            </GlassPanel>

            <GlassPanel className="relative overflow-hidden p-8">
              <div className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                Coordinates
              </div>
              <p className="mt-4 font-display text-xl font-semibold">India — Remote Global</p>
              <p className="mt-2 font-mono text-sm text-ink-muted">
                Available for AI products, creative technology, and experimental UI engagements.
              </p>
              <motion.div
                className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20"
                style={{
                  background:
                    'radial-gradient(circle, var(--color-violet), transparent 70%)',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
