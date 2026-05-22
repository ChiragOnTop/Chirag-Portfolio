import { socials } from '../../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ink/5 px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl font-bold tracking-tight">
            CHIRAG <span className="holo-text">GAMBHIR</span>
          </p>
          <p className="mt-2 font-mono text-xs text-ink-muted">
            © {year} — Crafted with intelligence & motion
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6">
          {socials.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="font-mono text-xs tracking-widest text-ink-muted uppercase transition-colors hover:text-[var(--color-holo)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase">
          v2.0.26
        </p>
      </div>
    </footer>
  )
}
