import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiFileText, FiDownload, FiX } from 'react-icons/fi'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showCV, setShowCV] = useState(false)

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
                <button 
                  onClick={() => setShowCV(true)}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2 font-semibold text-sm"
                >
                  <FiFileText size={18} />
                  <span>Preview CV</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CV Preview Modal */}
      {showCV && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCV(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-light-card dark:bg-dark-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold text-orange-500">My Resume</h3>
              <div className="flex space-x-2">
                <a
                  href="/assets/Elyas_Yenealem_CV.pdf"
                  download
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center space-x-2 text-sm"
                >
                  <FiDownload size={16} />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setShowCV(false)}
                  className="p-2 hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <object
                data="/assets/Elyas_Yenealem_CV.pdf"
                type="application/pdf"
                className="w-full h-[600px] rounded-lg"
              >
                <embed
                  src="/assets/Elyas_Yenealem_CV.pdf"
                  type="application/pdf"
                  className="w-full h-[600px] rounded-lg"
                />
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default About
