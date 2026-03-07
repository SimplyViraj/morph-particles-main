import { useEffect, useRef, useState } from 'react'
import Preloader from './components/Preloader'
import PlayButton from './components/PlayButton'
import Canvas3D from './components/Canvas3D'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const experienceRef = useRef(null)

  useEffect(() => {
    // Dynamically import so the Experience singleton initializes after DOM is ready
    import('./Experience/Experience.js').then(({ default: Experience }) => {
      const canvas = document.querySelector('canvas.webgl')
      if (canvas && !experienceRef.current) {
        experienceRef.current = new Experience(canvas)
      }
    })
  }, [])

  return (
    <>
      <Preloader />
      <PlayButton />
      <Canvas3D />

      <div id="fake-scroll" className="absolute inset-0 w-full h-full overflow-hidden overflow-y-auto">
        <div className="wrapper">
          <div className="smooth">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </div>

        <div className="w-full" style={{ height: '400dvh' }} />
      </div>
    </>
  )
}
