import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase } from 'react-icons/fi'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Led development of scalable web applications using React, Node.js, and MongoDB. Mentored junior developers and implemented best practices.',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects. Built RESTful APIs and responsive frontends.',
      technologies: ['React', 'Express', 'PostgreSQL', 'Docker']
    },
    {
      title: 'Junior Developer',
      company: 'Startup Inc',
      period: '2019 - 2020',
      description: 'Contributed to frontend development and learned backend technologies. Collaborated with cross-functional teams.',
      technologies: ['JavaScript', 'React', 'Node.js', 'Git']
    }
  ]

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Experience</h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-light-border dark:border-dark-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiBriefcase className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-light-text dark:text-dark-text">{exp.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{exp.company}</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-3">{exp.period}</p>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-light-cardHover dark:bg-dark-cardHover text-sm rounded-full border border-light-border dark:border-dark-border">
                          {tech}
                        </span>
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

export default Experience
