import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Apply dark mode by default
    document.documentElement.classList.add('dark')
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
