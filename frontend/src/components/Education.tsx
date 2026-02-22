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
      institution: 'University Name',
      period: '2015 - 2019',
      description: 'Focused on software engineering, algorithms, and web development. Graduated with honors.',
      achievements: ['Dean\'s List', 'Best Project Award', 'GPA: 3.8/4.0']
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      institution: 'Coding Academy',
      period: '2019',
      description: 'Intensive program covering modern web technologies and best practices.',
      achievements: ['Top Graduate', 'Capstone Project Excellence']
    }
  ]

  return (
    <section id="education" className="py-20 px-4 bg-light-cardHover dark:bg-dark-cardHover">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Education</h2>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-light-border dark:border-dark-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FiBook className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-light-text dark:text-dark-text">{edu.degree}</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">{edu.institution}</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-3">{edu.period}</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">{edu.description}</p>
                    <div className="space-y-1">
                      {edu.achievements.map((achievement) => (
                        <p key={achievement} className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                          • {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
