import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className={`fixed w-full bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-lg z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button - Left on mobile */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-orange-500">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-orange-500"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Elyas Yenealem
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="cursor-pointer text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg bg-light-cardHover dark:bg-dark-cardHover hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all transform hover:scale-110"
            >
              {darkMode ? (
                <FiSun size={20} className="text-yellow-400" />
              ) : (
                <FiMoon size={20} className="text-orange-600" />
              )}
            </motion.button>
          </div>

          {/* Dark mode toggle - Right on mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-lg bg-light-cardHover dark:bg-dark-cardHover"
            >
              {darkMode ? (
                <FiSun size={20} className="text-yellow-400" />
              ) : (
                <FiMoon size={20} className="text-orange-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block cursor-pointer text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-2 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
