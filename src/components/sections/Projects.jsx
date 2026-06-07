import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import SectionHeading from '../ui/SectionHeading'
import CaseStudyCard from '../projects/CaseStudyCard'
import { featuredProjects, projects } from '../../data/portfolio'

export default function Projects() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from('.project-featured', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })

      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 80%',
        },
      })
    },
    { scope: ref }
  )

  return (
    <section id="projects" ref={ref} className="relative px-4 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          title="Featured Projects"
          subtitle="Case studies of AI systems, computer vision labs, and immersive digital experiences."
        />

        {/* Featured Projects */}
        <div className="space-y-12 mb-20">
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-featured">
              <CaseStudyCard project={project} featured={true} />
            </div>
          ))}
        </div>

        {/* Regular Project Cards */}
        <div>
          <h3 className="font-mono text-xs tracking-widest text-ink-muted uppercase mb-8">
            Other Notable Projects
          </h3>
          <div className="project-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <CaseStudyCard project={project} featured={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
