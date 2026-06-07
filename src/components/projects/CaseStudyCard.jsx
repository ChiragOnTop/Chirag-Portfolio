import { motion } from 'framer-motion'

// Simple SVG icons
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6m-11-1 7 7" />
  </svg>
)

export default function CaseStudyCard({ project, featured = false }) {
  if (featured) {
    return (
      <motion.div
        className="group relative overflow-hidden rounded-3xl"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-holo holo-border relative overflow-hidden rounded-3xl p-8 md:p-12">
          {/* Accent glow */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: project.accent }}
          />

          {/* Content grid */}
          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase"
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

              <h3 className="font-display text-4xl font-bold mb-4">{project.title}</h3>

              <p className="font-mono text-sm leading-relaxed text-ink-muted mb-8">
                {project.description}
              </p>

              {/* Problem & Solution */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-mono text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
                    Problem
                  </h4>
                  <p className="font-mono text-sm text-ink-muted leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
                    Solution
                  </h4>
                  <p className="font-mono text-sm text-ink-muted leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="font-mono text-xs font-semibold text-ink mb-3 uppercase tracking-wider">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.keyFeatures?.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 font-mono text-sm text-ink-muted">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.gitHub && project.gitHub !== '#' && (
                  <motion.a
                    href={project.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ink/5 hover:bg-ink/10 border border-ink/20 hover:border-ink/40 transition-all font-mono text-xs font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    <GithubIcon />
                    GitHub
                  </motion.a>
                )}
                {project.liveDemo && project.liveDemo !== '#' && (
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: `${project.accent}15`,
                      borderColor: project.accent,
                      color: project.accent,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExternalLinkIcon />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>

            {/* Right side - Tech Stack */}
            <div className="flex flex-col justify-center">
              <h4 className="font-mono text-xs font-semibold text-ink mb-6 uppercase tracking-wider">
                Tech Stack
              </h4>
              <div className="space-y-3">
                {project.tech?.map((tech, i) => (
                  <motion.div
                    key={tech}
                    className="px-4 py-3 rounded-lg bg-white/5 border border-ink/10 hover:border-ink/20 transition-all font-mono text-sm font-medium"
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
      </motion.div>
    )
  }

  // Non-featured case study card
  return (
    <motion.article
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-holo holo-border overflow-hidden rounded-2xl p-6 md:p-8">
        {/* Accent glow */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ background: project.accent }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-1 rounded text-xs font-mono font-semibold uppercase"
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
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
            </div>
          </div>

          {/* Description */}
          <p className="font-mono text-xs md:text-sm leading-relaxed text-ink-muted mb-6">
            {project.description}
          </p>

          {/* Problem & Solution (condensed) */}
          {project.problem && (
            <div className="mb-4 pb-4 border-b border-ink/10">
              <p className="font-mono text-xs text-ink-muted">
                <span className="font-semibold text-ink">Problem:</span> {project.problem}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.keyFeatures.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 rounded text-xs font-mono"
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
                  <span className="px-2 py-1 rounded text-xs font-mono text-ink-muted">
                    +{project.keyFeatures.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded text-xs font-mono bg-ink/5 text-ink-muted border border-ink/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {project.gitHub && project.gitHub !== '#' && (
              <motion.a
                href={project.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold bg-ink/5 hover:bg-ink/10 border border-ink/20 hover:border-ink/40 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <GithubIcon />
                Code
              </motion.a>
            )}
            {project.liveDemo && project.liveDemo !== '#' && (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: `${project.accent}10`,
                  borderColor: project.accent,
                  color: project.accent,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <ExternalLinkIcon />
                Live
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
