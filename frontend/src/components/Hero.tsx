import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi'
import { TypeAnimation } from 'react-type-animation'

const Hero = () => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center px-4 pt-20 md:pt-0 relative overflow-hidden">
      {/* Diagonal grid square background like exercise book */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-25">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonal-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="40" height="40" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
          {/* Image - First on mobile */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:order-2"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-orange-500 shadow-xl">
                <img 
                  src="/images/ela.png" 
                  alt="Elyas Yenealem" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content - Second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left md:order-1"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Hi, I'm <span className="text-orange-500">Elyas Yenealem</span>
            </h1>

            <div className="text-lg md:text-2xl lg:text-3xl text-light-textSecondary dark:text-dark-textSecondary mb-4 font-semibold h-8 md:h-10 flex items-center justify-center md:justify-start">
              <TypeAnimation
                sequence={[
                  'Software Developer',
                  2000,
                  'Full Stack Developer',
                  2000,
                  'Frontend Developer',
                  2000,
                  'Backend Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-orange-500"
              />
            </div>

            <p className="text-sm md:text-base text-light-textSecondary dark:text-dark-textSecondary mb-6">
              Building modern, scalable web applications with cutting-edge technologies
            </p>

            <div className="flex justify-center md:justify-start space-x-3 mb-6">
              <a href="https://github.com/dopi95/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-light-cardHover dark:bg-dark-cardHover rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/elyas-yenealem-01572b359" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-light-cardHover dark:bg-dark-cardHover rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                <FiLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/el_yas_21/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-light-cardHover dark:bg-dark-cardHover rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                <FiInstagram size={20} />
              </a>
              <a href="mailto:elyasyenealem@gmail.com" className="p-2.5 bg-light-cardHover dark:bg-dark-cardHover rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                <FiMail size={20} />
              </a>
            </div>

            <div className="flex justify-center md:justify-start">
              <button 
                onClick={scrollToProjects}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2 font-semibold text-sm group"
              >
                <span>View Projects</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
