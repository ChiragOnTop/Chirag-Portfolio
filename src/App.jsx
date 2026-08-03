import { useEffect } from 'react'
import { IntroProvider } from './context/IntroContext'
import { useActiveSection } from './hooks/useActiveSection'
import { ToastProvider } from './context/ToastContext'
import ErrorBoundary from './components/global/ErrorBoundary'
import AccessibilityEnhancer from './components/global/AccessibilityEnhancer'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import GlobalAmbience from './components/global/GlobalAmbience'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import { LazySection, SkillsLazy, ProjectsLazy, LabsLazy } from './components/LazySections'
import Contact from './components/sections/Contact'

const sectionMeta = {
  hero: 'Chirag Gambhir — AI Developer, Full Stack Engineer',
  about: 'About — Chirag Gambhir',
  skills: 'Skills — Chirag Gambhir',
  projects: 'Projects — Chirag Gambhir',
  labs: 'Experimental Labs — Chirag Gambhir',
  contact: 'Contact — Chirag Gambhir',
}

function Portfolio() {
  const [activeSection] = useActiveSection(Object.keys(sectionMeta))

  useEffect(() => {
    document.title = sectionMeta[activeSection] || sectionMeta.hero
  }, [activeSection])

  return (
    <>
      <AccessibilityEnhancer />
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
      <SmoothScroll enabled={true}>
        <CustomCursor />
        <div
          className={`relative min-h-screen overflow-x-hidden bg-frost text-ink transition-opacity duration-500`}
        >
          <GlobalAmbience />

          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse 90% 60% at 50% -5%, rgba(0,229,255,0.14), transparent 55%),
                radial-gradient(ellipse 50% 40% at 100% 30%, rgba(139,92,246,0.08), transparent),
                radial-gradient(ellipse 40% 30% at 0% 70%, rgba(56,189,248,0.06), transparent),
                linear-gradient(180deg, #f8f5f0 0%, #f2eee8 40%, #ece6de 100%)
              `,
            }}
          />

          <Navbar />

          <main id="main-content" className="relative z-10" role="main">
            <Hero />
            <About />
            <LazySection component={SkillsLazy} />
            <LazySection component={ProjectsLazy} />
            <LazySection component={LabsLazy} />
            <Contact />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <IntroProvider>
        <ToastProvider>
          <Portfolio />
        </ToastProvider>
      </IntroProvider>
    </ErrorBoundary>
  )
}
