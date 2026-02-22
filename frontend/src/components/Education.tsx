import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBook } from 'react-icons/fi'

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Unity University',
      period: '2022 - January 2026',
      status: 'Currently 5th Year Student',
      description: 'Specializing in Software Engineering and Web Development. Completed multiple university projects and gaining hands-on experience with modern technologies.'
    },
    {
      degree: 'Bachelor of Arts in BAIS (Business Administration and Information Systems)',
      institution: 'Addis Ababa University',
      period: '2022 - January 2026',
      status: 'Currently 5th Year Student',
      description: 'Studying the intersection of business and technology, with coursework in management, information systems, and data analysis.'
    },
    {
      degree: 'Full Stack Web Development Bootcamp (MERN Stack)',
      institution: 'DirectEd Bootcamp',
      period: '',
      status: '',
      description: 'Intensive program covering MongoDB, Express.js, React, and Node.js. Working on team projects and building full-stack applications.'
    }
  ]

  return (
    <section id="education" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-light-bg dark:bg-dark-bg inline-block px-8 py-2 rounded-lg mb-12 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Education
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-light-card dark:bg-dark-card p-6 md:p-8 rounded-2xl shadow-xl"
          >
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="relative pl-8 border-l-2 border-orange-500/30 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full border-4 border-light-card dark:border-dark-card"
                  />
                  
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold text-light-text dark:text-dark-text mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-orange-500 font-semibold mb-1">{edu.institution}</p>
                      {edu.period && (
                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">
                          {edu.period}
                        </p>
                      )}
                      {edu.status && (
                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-3 italic">
                          {edu.status}
                        </p>
                      )}
                    </div>
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg ml-4">
                      <FiBook className="text-orange-500" size={18} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
