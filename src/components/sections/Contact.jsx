import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

export default function Contact() {
  const ref = useRef(null)
  const [focused, setFocused] = useState(null)
  const [transmissionLog, setTransmissionLog] = useState([])

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

  const logLine = (msg) => {
    setTransmissionLog((prev) => [...prev.slice(-4), msg])
  }

  return (
    <section id="contact" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.1), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          title="Communication Terminal"
          subtitle="Open a secure transmission channel to initiate collaboration."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="contact-reveal lg:col-span-7">
            <div className="glass-holo holo-border relative overflow-hidden rounded-3xl p-8 md:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4 font-mono text-[10px] tracking-widest uppercase">
                <span className="text-[var(--color-electric)]">◈ Terminal v3.0</span>
                <motion.span
                  className="text-ink-muted"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Secure Channel Ready
                </motion.span>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  logLine('TRANSMISSION QUEUED — AWAITING RESPONSE')
                }}
              >
                {[
                  { id: 'name', label: 'Sender ID', type: 'text', placeholder: 'Identify yourself' },
                  {
                    id: 'email',
                    label: 'Frequency Address',
                    type: 'email',
                    placeholder: 'signal@domain.dev',
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
                      onFocus={() => {
                        setFocused(field.id)
                        logLine(`INPUT FOCUS: ${field.label}`)
                      }}
                      onBlur={() => setFocused(null)}
                      className={`mt-2 w-full border-b bg-transparent py-3 font-mono text-sm outline-none transition-all ${
                        focused === field.id
                          ? 'border-[var(--color-electric)] text-ink'
                          : 'border-ink/15 text-ink-muted'
                      }`}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase"
                  >
                    Message Payload
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Encode your vision..."
                    onFocus={() => {
                      setFocused('message')
                      logLine('PAYLOAD BUFFER OPEN')
                    }}
                    onBlur={() => setFocused(null)}
                    className={`mt-2 w-full resize-none border-b bg-transparent py-3 font-mono text-sm outline-none transition-all ${
                      focused === 'message'
                        ? 'border-[var(--color-electric)]'
                        : 'border-ink/15'
                    }`}
                  />
                </div>
                <motion.button
                  type="submit"
                  data-cursor
                  className="relative w-full overflow-hidden rounded-full bg-ink py-4 font-mono text-xs tracking-[0.35em] text-frost uppercase"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Transmit Signal</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric)] to-violet-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </form>
            </div>
          </div>

          <div className="contact-reveal flex flex-col gap-4 lg:col-span-5">
            <div className="glass rounded-2xl p-6 font-mono text-[10px]">
              <p className="tracking-widest text-ink-muted uppercase">System Log</p>
              <div className="mt-4 min-h-[120px] space-y-2">
                {transmissionLog.length === 0 && (
                  <p className="text-ink-muted/50">Awaiting input...</p>
                )}
                {transmissionLog.map((line, i) => (
                  <motion.p
                    key={`${line}-${i}`}
                    className="text-[var(--color-electric)]"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    › {line}
                  </motion.p>
                ))}
              </div>
            </div>

            <div className="glass-holo flex-1 rounded-2xl p-8">
              <p className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                Direct Frequency
              </p>
              <a
                href="cgambhir777@gmail.com"
              
                data-cursor
                className="mt-4 block font-display text-2xl font-bold transition-colors hover:text-[var(--color-electric)] md:text-3xl"
              >
                hello@chiraggambhir.dev
              </a>
              <p className="mt-6 font-mono text-xs leading-relaxed text-ink-muted">
                India — Remote Global. Open for AI products, computer vision labs, immersive 3D,
                and experimental interface engagements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
