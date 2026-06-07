import { Suspense, lazy, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Lazy load heavy sections
const SkillsLazy = lazy(() => import('./sections/Skills'))
const ProjectsLazy = lazy(() => import('./sections/Projects'))
const LabsLazy = lazy(() => import('./sections/Labs'))

// Fallback loader component
function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32 md:py-48 px-4">
      <div className="text-center">
        <motion.div
          className="inline-block w-3 h-3 rounded-full bg-cyan-400 mx-1.5"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="inline-block w-3 h-3 rounded-full bg-cyan-400 mx-1.5"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="inline-block w-3 h-3 rounded-full bg-cyan-400 mx-1.5"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  )
}

// HOC wrapper for lazy sections with intersection observer
export function LazySection({ component: Component, ...props }) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '100px' }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref])

  return (
    <div ref={setRef}>
      {isVisible ? (
        <Suspense fallback={<SectionFallback />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <SectionFallback />
      )}
    </div>
  )
}

export { SkillsLazy, ProjectsLazy, LabsLazy }
