import { motion } from 'framer-motion'

export default function GlassPanel({
  children,
  className = '',
  depth = 1,
  hover = true,
  ...props
}) {
  const depthClass =
    depth === 2
      ? 'depth-shadow'
      : depth === 3
        ? 'depth-shadow scale-[1.02]'
        : ''

  return (
    <motion.div
      className={`glass rounded-2xl ${depthClass} ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow:
                '0 8px 32px rgba(0, 212, 170, 0.08), 0 24px 48px rgba(10, 10, 15, 0.06)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
