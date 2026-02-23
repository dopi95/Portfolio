import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiFileText } from 'react-icons/fi'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="about" className="py-16 px-4 relative overflow-hidden">
      {/* Diagonal grid square background like hero */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-25">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonal-grid-about" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="40" height="40" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-grid-about)" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full">
                {/* Developer coding illustration */}
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="/images/elabout.png" 
                    alt="Developer coding"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none"></div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-base md:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                I'm a <span className="font-bold text-orange-500">software developer</span> based in Ethiopia, specializing in <span className="font-bold text-orange-500">full-stack web development</span>. I create scalable applications using modern technologies including React, TypeScript, Next.js, Node.js, Express, MongoDB, PostgreSQL, and TailwindCSS.
              </p>
              
              <p className="text-base md:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                My expertise spans across <span className="font-bold text-orange-500">modern frameworks and technologies</span>, from building responsive frontends with React and Vite to developing robust backends with Node.js and Express. I'm passionate about creating <span className="font-bold text-orange-500">clean, scalable, and user-centric</span> digital solutions.
              </p>
              
              <p className="text-base md:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                I've successfully delivered <span className="font-bold text-orange-500">freelance projects</span> including healthcare platforms, school management systems, and real estate websites, working both independently and in collaborative teams to bring innovative solutions to life.
              </p>
              
              <p className="text-base md:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                I'm currently open to <span className="font-bold text-orange-500">freelance projects or full-time roles</span> where I can grow and contribute with purpose. Feel free to explore my work or reach out — I'm always ready for a <span className="font-bold text-orange-500">meaningful challenge</span>!
              </p>

              {/* Motto */}
              <div className="pt-4 border-t border-light-border dark:border-dark-border">
                <p className="text-base md:text-lg font-semibold text-orange-500 italic">
                  "Code with passion, build with purpose."
                </p>
              </div>

              {/* CV Button */}
              <div className="pt-4">
                <a 
                  href="/assets/Elyas_Yenealem_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open('/assets/Elyas_Yenealem_CV.pdf', '_blank')
                  }}
                  className="inline-flex px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all items-center space-x-2 font-semibold text-sm"
                >
                  <FiFileText size={18} />
                  <span>Preview CV</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
