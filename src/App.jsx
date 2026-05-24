import { useState, useEffect } from 'react'
import { useIntro, IntroProvider } from './context/IntroContext'
import { useActiveSection } from './hooks/useActiveSection'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import GlobalAmbience from './components/global/GlobalAmbience'
import LoadingScreen from './components/global/LoadingScreen'
import CinematicIntro from './components/intro/CinematicIntro'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Labs from './components/sections/Labs'
import Contact from './components/sections/Contact'

const sectionMeta = {
  hero: 'Chirag Gambhir — Futuristic AI Engineer',
  about: 'About — Chirag Gambhir',
  skills: 'Skills — Chirag Gambhir',
  projects: 'Projects — Chirag Gambhir',
  labs: 'Experimental Labs — Chirag Gambhir',
  contact: 'Contact — Chirag Gambhir',
}

function Portfolio() {
  const { introComplete } = useIntro()
  const [bootComplete, setBootComplete] = useState(false)
  const active = useActiveSection(Object.keys(sectionMeta))

  useEffect(() => {
    document.title = sectionMeta[active] || sectionMeta.hero
  }, [active])

  return (
    <>
      {!bootComplete && <LoadingScreen onComplete={() => setBootComplete(true)} />}
      {bootComplete && !introComplete && <CinematicIntro />}

      <SmoothScroll enabled={introComplete && bootComplete}>
        <CustomCursor />
        <div
          className={`relative min-h-screen overflow-x-hidden bg-frost text-ink transition-opacity duration-1000 ${
            introComplete && bootComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
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

          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Labs />
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
    <IntroProvider>
      <Portfolio />
    </IntroProvider>
  )
}
