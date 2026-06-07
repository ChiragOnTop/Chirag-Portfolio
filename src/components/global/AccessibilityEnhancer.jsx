import { useEffect, useRef } from 'react'

export default function AccessibilityEnhancer() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Add keyboard navigation support
    const handleKeyDown = (e) => {
      // Skip navigation if focused on input
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return
      }

      switch (e.key) {
        case 'g':
          // Jump to GitHub
          window.open('https://github.com/ChiragOnTop', '_blank')
          break
        case 'c':
          // Jump to contact
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'p':
          // Jump to projects
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Add focus visible style for keyboard navigation
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      /* Focus visible for keyboard navigation */
      a:focus-visible,
      button:focus-visible {
        outline: 2px solid #00e5ff;
        outline-offset: 2px;
      }

      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: more) {
        body {
          font-weight: 500;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        :focus-visible {
          outline-color: #00e5ff;
        }
      }
    `
    document.head.appendChild(style)

    return () => document.head.removeChild(style)
  }, [])

  return null
}
