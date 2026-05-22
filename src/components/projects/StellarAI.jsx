import { motion } from 'framer-motion'

export default function StellarAI({ project }) {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${project.accent}44, transparent 50%),
            radial-gradient(ellipse at 80% 80%, #7c3aed22, transparent 40%)`,
        }}
      />

      <div className="relative grid h-full grid-cols-1 gap-8 p-8 md:grid-cols-2 md:p-12">
        <div className="flex flex-col justify-center">
          <span
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: project.accent }}
          >
            {project.tag}
          </span>
          <h3 className="mt-4 font-display text-4xl font-bold md:text-5xl">{project.title}</h3>
          <p className="mt-4 font-mono text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-ink/8 bg-white/40 px-3 py-1 font-mono text-[10px] uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center perspective-[1200px]">
          <motion.div
            className="relative h-[340px] w-[180px] rounded-[2rem] border border-white/50 bg-gradient-to-b from-white/60 to-white/20 p-2 shadow-2xl"
            style={{
              boxShadow: `0 40px 80px ${project.accent}22, 0 0 60px ${project.accent}15`,
              transformStyle: 'preserve-3d',
            }}
            animate={{ y: [0, -12, 0], rotateY: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, rotateY: 0, z: 40 }}
          >
            <div className="h-full w-full overflow-hidden rounded-[1.6rem] bg-ink">
              <div className="border-b border-white/10 p-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-holo)]" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                </div>
                <p className="mt-2 font-mono text-[8px] tracking-widest text-white/50 uppercase">
                  Stellar AI — Live
                </p>
              </div>
              <div className="space-y-3 p-3">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="rounded-lg bg-white/5 p-2"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  >
                    <div className="h-1 w-full rounded bg-gradient-to-r from-[var(--color-electric)] to-violet-500" />
                    <p className="mt-2 font-mono text-[7px] text-white/60">
                      Neural stream {i} active...
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-1/4 hidden h-32 w-32 rounded-2xl border border-[var(--color-electric)]/30 bg-white/20 p-3 backdrop-blur-xl md:block"
            animate={{ x: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="font-mono text-[8px] text-ink-muted uppercase">Data Stream</p>
            <div className="mt-2 space-y-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 rounded-full bg-gradient-to-r from-[var(--color-electric)] to-transparent"
                  style={{ width: `${60 + i * 8}%` }}
                />
              ))}
            </div>
          </motion.div>

          {project.highlights?.map((h, i) => (
            <motion.span
              key={h}
              className="absolute font-mono text-[9px] tracking-widest uppercase"
              style={{
                color: project.accent,
                top: `${20 + i * 22}%`,
                left: i % 2 === 0 ? '-8%' : 'auto',
                right: i % 2 === 1 ? '-5%' : 'auto',
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            >
              ◈ {h}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}
