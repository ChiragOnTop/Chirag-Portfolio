import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpaceIntroScene from './SpaceIntroScene'
import ParticleName from './ParticleName'
import { useIntro } from '../../context/IntroContext'
import { bootLines } from '../../data/portfolio'
import heroImage from '../../assets/hero.png'

const PHASES = {
  SPACE: 'space',
  ZOOM: 'zoom',
  EARTH: 'earth',
  BURST: 'burst',
  PARTICLES: 'particles',
  REVEAL: 'reveal',
  BOOT: 'boot',
}

export default function CinematicIntro() {
  const { completeIntro, skipIntro } = useIntro()
  const [phase, setPhase] = useState(PHASES.SPACE)
  const [bootIndex, setBootIndex] = useState(0)
  const [visible, setVisible] = useState(() => !skipIntro)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const schedule = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms))
  }

  useEffect(() => {
    if (skipIntro) return

    schedule(() => setPhase(PHASES.ZOOM), 3500)
    schedule(() => setPhase(PHASES.EARTH), 6500)
    schedule(() => setPhase(PHASES.BURST), 9000)
    schedule(() => setPhase(PHASES.PARTICLES), 9400)

    return clearTimers
  }, [skipIntro])

  const handleParticlesDone = () => {
    schedule(() => setPhase(PHASES.REVEAL), 400)
    schedule(() => setPhase(PHASES.BOOT), 2800)
  }

  useEffect(() => {
    if (phase !== PHASES.BOOT) return

    const interval = setInterval(() => {
      setBootIndex((i) => {
        if (i >= bootLines.length - 1) {
          clearInterval(interval)
          schedule(() => {
            setVisible(false)
            completeIntro()
          }, 600)
          return i
        }
        return i + 1
      })
    }, 450)

    return () => clearInterval(interval)
  }, [phase, completeIntro])

  const handleSkip = () => {
    clearTimers()
    setVisible(false)
    completeIntro()
  }

  if (!visible) return null

  const showSpace = [PHASES.SPACE, PHASES.ZOOM, PHASES.EARTH, PHASES.BURST].includes(phase)

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden bg-[#020208]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-[210] rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white"
      >
        Skip Intro
      </button>

      {showSpace && (
        <div className="absolute inset-0">
          <SpaceIntroScene phase={phase === PHASES.BURST ? PHASES.EARTH : phase} />
        </div>
      )}

      <AnimatePresence>
        {phase === PHASES.BURST && (
          <motion.div
            className="absolute inset-0 z-30 bg-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0.95, 0], scale: [0.8, 1.2, 1.5, 2] }}
            transition={{ duration: 1.2, times: [0, 0.15, 0.4, 1] }}
          />
        )}
      </AnimatePresence>

      {[PHASES.PARTICLES, PHASES.REVEAL, PHASES.BOOT].includes(phase) && (
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#f5f2ec] via-[#f0ede8] to-[#ebe6de]">
          <ParticleName
            active={phase === PHASES.PARTICLES}
            onComplete={handleParticlesDone}
          />

          <AnimatePresence>
            {(phase === PHASES.REVEAL || phase === PHASES.BOOT) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-8 rounded-full opacity-40 blur-3xl"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(0,229,255,0.4), rgba(139,92,246,0.2), transparent)',
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.img
                    src={heroImage}
                    alt="Chirag Gambhir"
                    className="relative z-10 h-[min(55vh,420px)] w-auto max-w-[90vw] rounded-2xl object-cover"
                    style={{
                      boxShadow: '0 0 80px rgba(0,229,255,0.25)',
                    }}
                    initial={{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      filter: 'blur(0px) saturate(1.1)',
                    }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-30"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.08) 2px, rgba(0,229,255,0.08) 4px)',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === PHASES.BOOT && (
            <motion.div
              className="absolute bottom-[12%] left-1/2 w-full max-w-lg -translate-x-1/2 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="glass rounded-2xl p-6 font-mono text-xs">
                {bootLines.slice(0, bootIndex + 1).map((line, i) => (
                  <motion.p
                    key={line}
                    className={`tracking-widest uppercase ${i === bootIndex ? 'text-[var(--color-electric)]' : 'text-ink-muted'}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="text-[var(--color-holo)]">›</span> {line}
                  </motion.p>
                ))}
                <motion.span
                  className="ml-2 inline-block h-3 w-2 bg-[var(--color-electric)]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
