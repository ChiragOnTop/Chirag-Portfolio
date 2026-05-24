import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT = [
  'NEURAL CORE ONLINE',
  'HOLOGRAPHIC ENGINE SYNC',
  'PARTICLE FIELD ACTIVE',
  'INTERFACE READY',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [line, setLine] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete?.()
      return
    }

    const duration = 2800
    const start = performance.now()

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(p * 100)
      setLine(Math.min(BOOT.length - 1, Math.floor(p * BOOT.length)))

      if (p < 1) requestAnimationFrame(tick)
      else {
        setDone(true)
        setTimeout(() => onComplete?.(), 500)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#f5f2ec]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[var(--color-electric)]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
              />
            ))}
          </div>

          <p className="relative font-mono text-[10px] tracking-[0.5em] text-ink-muted uppercase">
            System Boot
          </p>

          <motion.h1
            className="relative mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="holo-text">CHIRAG GAMBHIR</span>
          </motion.h1>

          <div className="relative mt-10 h-1 w-64 overflow-hidden rounded-full bg-ink/5 md:w-80">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-electric)] via-violet-500 to-[var(--color-holo)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="relative mt-4 font-mono text-xs text-[var(--color-electric)]">
            {Math.round(progress)}%
          </p>

          <div className="relative mt-8 min-h-[4rem] font-mono text-[10px] tracking-widest text-ink-muted uppercase">
            {BOOT.slice(0, line + 1).map((l) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
              >
                › {l}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
