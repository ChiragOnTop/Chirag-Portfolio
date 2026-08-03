import { motion } from 'framer-motion'

function ProjectImage({ project, featured = false }) {
  if (!project.screenshot) return null

  return (
    <div
      className={`relative overflow-hidden border border-white/50 bg-ink shadow-[0_30px_90px_rgba(0,229,255,0.12)] ${
        featured ? 'rounded-2xl' : 'mb-6 rounded-xl'
      }`}
    >
      <img
        src={project.screenshot}
        alt={project.screenshotAlt || `${project.title} interface screenshot`}
        className={`w-full object-cover object-top opacity-95 transition duration-700 group-hover:scale-[1.04] ${
          featured ? 'aspect-[4/3]' : 'aspect-[16/10]'
        }`}
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-white/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4 font-mono text-[9px] tracking-widest text-frost uppercase">
        <span>Visual Case File</span>
        <span style={{ color: project.accent }}>Captured UI</span>
      </div>
    </div>
  )
}

export default function CaseStudyCard({ project, featured = false }) {
  if (featured) {
    return (
      <motion.div
        className="group relative overflow-hidden rounded-3xl"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-holo holo-border relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: project.accent }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase"
                  style={{
                    backgroundColor: `${project.accent}20`,
                    color: project.accent,
                    border: `1px solid ${project.accent}40`,
                  }}
                >
                  {project.tag}
                </span>
                <span className="font-mono text-xs text-ink-muted">{project.year}</span>
              </div>

              <h3 className="mb-4 font-display text-4xl font-bold">{project.title}</h3>

              <p className="mb-8 font-mono text-sm leading-relaxed text-ink-muted">
                {project.description}
              </p>

              <div className="mb-8 space-y-6">
                <div>
                  <h4 className="mb-2 font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                    Problem
                  </h4>
                  <p className="font-mono text-sm leading-relaxed text-ink-muted">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                    Solution
                  </h4>
                  <p className="font-mono text-sm leading-relaxed text-ink-muted">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="mb-3 font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.keyFeatures?.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 font-mono text-sm text-ink-muted">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-widest uppercase text-ink-muted">
                {project.highlights?.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border px-3 py-1.5"
                    style={{ borderColor: `${project.accent}55`, color: project.accent }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6">
              <ProjectImage project={project} featured />

              <div>
                <h4 className="mb-6 font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                  Tech Stack
                </h4>
                <div className="space-y-3">
                  {project.tech?.map((tech, i) => (
                    <motion.div
                      key={tech}
                      className="rounded-lg border border-ink/10 bg-white/5 px-4 py-3 font-mono text-sm font-medium transition-all hover:border-ink/20"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.article
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-holo holo-border overflow-hidden rounded-2xl p-6 md:p-8">
        <ProjectImage project={project} />

        <div
          className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ background: project.accent }}
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="rounded px-2 py-1 font-mono text-xs font-semibold uppercase"
                  style={{
                    backgroundColor: `${project.accent}20`,
                    color: project.accent,
                  }}
                >
                  {project.tag}
                </span>
                {project.year && (
                  <span className="font-mono text-xs text-ink-muted">{project.year}</span>
                )}
              </div>
              <h3 className="mb-2 font-display text-xl font-bold md:text-2xl">{project.title}</h3>
            </div>
          </div>

          <p className="mb-6 font-mono text-xs leading-relaxed text-ink-muted md:text-sm">
            {project.description}
          </p>

          {project.problem && (
            <div className="mb-4 border-b border-ink/10 pb-4">
              <p className="font-mono text-xs text-ink-muted">
                <span className="font-semibold text-ink">Problem:</span> {project.problem}
              </p>
            </div>
          )}

          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.keyFeatures.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded px-2 py-1 font-mono text-xs"
                    style={{
                      backgroundColor: `${project.accent}10`,
                      color: project.accent,
                      border: `1px solid ${project.accent}30`,
                    }}
                  >
                    {feature}
                  </span>
                ))}
                {project.keyFeatures.length > 3 && (
                  <span className="rounded px-2 py-1 font-mono text-xs text-ink-muted">
                    +{project.keyFeatures.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {project.tech && project.tech.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-ink/10 bg-ink/5 px-2 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
            Private case archive
          </div>
        </div>
      </div>
    </motion.article>
  )
}
