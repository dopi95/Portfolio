import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import InstallPrompt from './components/InstallPrompt'
import { FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }
    return false
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Apply dark mode based on system preference
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    // Track visitor
    trackVisitor()
  }, [])

  const trackVisitor = async () => {
    try {
      const userAgent = navigator.userAgent
      const browser = getBrowserName(userAgent)
      const os = getOSName(userAgent)
      
      // Check if user already provided name
      let visitorName = localStorage.getItem('visitorName')
      if (!visitorName) {
        visitorName = prompt('Enter your name (optional):') || 'Anonymous'
        localStorage.setItem('visitorName', visitorName)
      }
      
      await fetch('http://localhost:5000/api/visitors/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: visitorName,
          userAgent,
          browser,
          os,
          country: 'Unknown',
          city: 'Unknown'
        })
      })
    } catch (error) {
      console.log('Error tracking visitor:', error)
    }
  }

  const getBrowserName = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    return 'Unknown'
  }

  const getOSName = (userAgent: string) => {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }

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
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <InstallPrompt />
      
      {/* Dashboard Button for logged in users */}
      {isLoggedIn && (
        <button
          onClick={() => navigate('/private')}
          className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          <FiSettings size={16} />
          <span className="hidden sm:inline">Dashboard</span>
        </button>
      )}
    </div>
  )
}

export default App
