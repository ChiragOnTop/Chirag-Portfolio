import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Labs from './components/sections/Labs'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="relative min-h-screen overflow-x-hidden bg-frost text-ink">
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,212,170,0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(124,58,237,0.06), transparent)',
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
  )
}
