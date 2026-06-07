import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HolographicProfileCard({ imageUrl }) {
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current || !isHovered) return

      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const x = (e.clientY - rect.top - centerY) / 10
      const y = (e.clientX - rect.left - centerX) / -10

      setRotation({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
      }}
      style={{
        perspective: '1200px',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="relative w-full max-w-sm"
    >
      {/* Holographic background layers */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {/* Cyan glow layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated glow orb */}
        <motion.div
          className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-20"
          animate={{
            x: isHovered ? [0, 20, 0] : 0,
            y: isHovered ? [0, -20, 0] : 0,
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-cyan-400/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Image container with parallax */}
        <motion.div
          className="relative overflow-hidden h-96 sm:h-[420px]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={imageUrl}
            alt="Chirag Gambhir - AI Developer and Full Stack Engineer. Professional portrait of an AI developer wearing a black blazer and white shirt."
            loading="lazy"
            className="w-full h-full object-cover object-top"
            title="Chirag Gambhir - AI Developer"
          />

          {/* Holographic scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-transparent to-violet-400/10 pointer-events-none"
            animate={{
              backgroundPosition: ['0% 0%', '0% 100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Corner accent lights */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-400/20 to-transparent rounded-tl-full pointer-events-none" />
        </motion.div>

        {/* Content area with tech stack */}
        <div className="relative p-6 bg-gradient-to-t from-frost/95 to-frost/80 backdrop-blur-sm">
          {/* Holographic accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div>
            <h3 className="text-xl font-bold text-ink mb-1">Chirag Gambhir</h3>
            <p className="text-cyan-600 font-mono text-xs mb-4 tracking-widest">
              AI DEVELOPER • FULL STACK ENGINEER
            </p>
            <p className="text-ink-muted text-sm leading-relaxed mb-6">
              Building AI-powered products, computer vision systems, and immersive digital experiences.
            </p>

            {/* Tech stack preview */}
            <div className="flex flex-wrap gap-2">
              {['AI', 'React', 'Python', 'CV'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Holographic border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: '1px solid',
              borderColor: isHovered ? 'rgba(0, 229, 255, 0.5)' : 'rgba(0, 229, 255, 0.2)',
              boxShadow: isHovered
                ? '0 0 20px rgba(0, 229, 255, 0.3), inset 0 0 20px rgba(0, 229, 255, 0.1)'
                : '0 0 10px rgba(0, 229, 255, 0.1)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
