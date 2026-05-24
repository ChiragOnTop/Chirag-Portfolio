import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import Magnetic from '../ui/Magnetic'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'labs', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href) => active === href.replace('#', '')

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-8"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-700 md:px-6 ${
          scrolled
            ? 'glass-holo depth-shadow py-2.5 shadow-[0_8px_40px_rgba(0,229,255,0.08)]'
            : 'bg-white/10 backdrop-blur-sm'
        }`}
        aria-label="Main navigation"
      >
        <Magnetic strength={0.25}>
          <a
            href="#hero"
            className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-electric)] opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-electric)] shadow-[0_0_10px_var(--color-electric)]" />
            </span>
            CG
          </a>
        </Magnetic>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const activeLink = isActive(link.href)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                    activeLink ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {activeLink && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white/50 shadow-[inset_0_0_20px_rgba(0,229,255,0.08)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <Magnetic strength={0.3} className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full border border-[var(--color-electric)]/25 bg-gradient-to-r from-[var(--color-electric)]/10 to-violet-500/10 px-6 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-all hover:border-[var(--color-electric)]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
          >
            Contact
          </a>
        </Magnetic>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-white/30 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span className={`absolute h-0.5 w-5 bg-ink transition-all ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-0.5 w-5 bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`absolute h-0.5 w-5 bg-ink transition-all ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="glass-holo mx-auto mt-3 max-w-7xl rounded-2xl p-6 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3.5 font-mono text-sm tracking-wider uppercase ${
                      isActive(link.href) ? 'bg-white/40 text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
