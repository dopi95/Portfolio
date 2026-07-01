import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBook } from 'react-icons/fi'

const education = [
  {
    id: 1,
    degree: 'BSc in Computer Science',
    institution: 'Unity University',
    location: 'Addis Ababa, Ethiopia',
    graduationDate: 'March 2026',
    description: 'Relevant Coursework: Data Structures & Algorithms, Database Systems, AI, Web Security, Software Engineering.'
  },
  {
    id: 2,
    degree: 'BA in Business Administration and Information System',
    institution: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    graduationDate: 'June 2026',
    description: ''
  }
]

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
            className="bg-light-card dark:bg-dark-card md:bg-transparent md:dark:bg-transparent p-6 md:p-0 rounded-2xl shadow-xl md:shadow-none"
          >
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="relative pl-8 border-l-2 border-orange-500/30 pb-8 last:pb-0"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full border-4 border-light-card dark:border-dark-card md:border-light-bg md:dark:border-dark-bg"
                  />

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold text-light-text dark:text-dark-text mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-orange-500 font-semibold mb-1">{edu.institution}</p>
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">
                        {edu.location}
                      </p>
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-3">
                        Graduation Date: {edu.graduationDate}
                      </p>
                    </div>
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg ml-4">
                      <FiBook className="text-orange-500" size={18} />
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                      {edu.description}
                    </p>
                  )}
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
