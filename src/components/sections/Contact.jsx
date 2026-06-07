import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useToast } from '../../context/ToastContext'
import SectionHeading from '../ui/SectionHeading'

// Initialize EmailJS (replace with your public key)
emailjs.init('k8nFLZ_HYLIL0TM2Y')

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const { addToast } = useToast()
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedId, setSubmittedId] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      addToast('Please fix the errors in the form', 'error')
      return
    }

    // Prevent duplicate submissions
    const now = Date.now()
    if (submittedId && now - submittedId < 3000) {
      addToast('Please wait before submitting again', 'error')
      return
    }

    setLoading(true)

    try {
      const result = await emailjs.send(
        'service_e08mnm3',
        'template_y7kj19g',
        {
          to_email: 'cgambhir777@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        }
      )

      if (result.status === 200) {
        addToast('Message sent successfully! I will get back to you soon.', 'success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setSubmitted(true)
        setSubmittedId(now)
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      addToast('Failed to send message. Please try again or email directly.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }))
    }
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
          title="Get in Touch"
          subtitle="Have an AI project or idea? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="contact-reveal lg:col-span-7">
            <div className="glass-holo holo-border relative overflow-hidden rounded-3xl p-8 md:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4 font-mono text-[10px] tracking-widest uppercase">
                <span className="text-cyan-400">◈ Contact Form</span>
                <motion.span
                  className="text-ink-muted"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  role="status"
                  aria-live="polite"
                >
                  {loading ? 'Sending...' : 'Ready'}
                </motion.span>
              </div>

              <form 
                ref={formRef} 
                className="space-y-6" 
                onSubmit={handleSubmit}
                aria-label="Contact form to send a message"
              >
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  {
                    id: 'email',
                    label: 'Email',
                    type: 'email',
                    placeholder: 'your@email.com',
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase"
                    >
                      {field.label}
                      {errors[field.id] && (
                        <span className="ml-2 text-red-400">— {errors[field.id]}</span>
                      )}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      disabled={loading}
                      className={`mt-2 w-full border-b bg-transparent py-3 font-mono text-sm outline-none transition-all disabled:opacity-60 ${
                        errors[field.id]
                          ? 'border-red-400 text-red-400'
                          : focused === field.id
                            ? 'border-cyan-400 text-ink'
                            : 'border-ink/15 text-ink-muted'
                      }`}
                      aria-label={field.label}
                      aria-invalid={!!errors[field.id]}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase"
                  >
                    Message
                    {errors.message && (
                      <span className="ml-2 text-red-400">— {errors.message}</span>
                    )}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    disabled={loading}
                    className={`mt-2 w-full resize-none border-b bg-transparent py-3 font-mono text-sm outline-none transition-all disabled:opacity-60 ${
                      errors.message
                        ? 'border-red-400 text-red-400'
                        : focused === 'message'
                          ? 'border-cyan-400 text-ink'
                          : 'border-ink/15 text-ink-muted'
                    }`}
                    aria-label="Message"
                    aria-invalid={!!errors.message}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading || submitted}
                  data-cursor
                  className="relative w-full overflow-hidden rounded-full bg-ink py-4 font-mono text-xs tracking-[0.35em] text-frost uppercase disabled:opacity-60"
                  whileHover={!loading && !submitted ? { scale: 1.02 } : {}}
                  whileTap={!loading && !submitted ? { scale: 0.98 } : {}}
                >
                  <span className="relative z-10">
                    {loading ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                  </span>
                  {!submitted && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500"
                      initial={{ x: '-100%' }}
                      whileHover={!loading ? { x: 0 } : {}}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          <div className="contact-reveal flex flex-col gap-4 lg:col-span-5">
            <div className="glass-holo rounded-2xl p-8">
              <p className="font-mono text-[10px] tracking-widest text-ink-muted uppercase mb-4">
                Direct Email
              </p>
              <a
                href="mailto:cgambhir777@gmail.com"
                data-cursor
                className="block font-display text-xl md:text-2xl font-bold break-all transition-colors hover:text-cyan-400"
              >
                cgambhir777@gmail.com
              </a>
            </div>

            <div className="glass rounded-2xl p-8 flex-1">
              <p className="font-mono text-[10px] tracking-widest text-ink-muted uppercase mb-4">
                Location & Availability
              </p>
              <p className="font-mono text-sm leading-relaxed text-ink-muted mb-6">
                Based in <span className="text-cyan-400">India</span> • Available for remote opportunities globally
              </p>
              <p className="font-mono text-xs leading-relaxed text-ink-muted">
                Open for collaborations on AI products, computer vision projects, immersive 3D experiences, and creative technology ventures.
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[10px] tracking-widest text-ink-muted uppercase mb-4">
                Response Time
              </p>
              <p className="font-mono text-sm text-cyan-400">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
