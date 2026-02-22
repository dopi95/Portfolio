import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiUsers, FiUser, FiBook } from 'react-icons/fi'
import GitHubStats from './GitHubStats'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      title: 'University & Bootcamp Projects',
      subtitle: 'Academic & Training Projects',
      status: 'Ongoing',
      description: 'Completed various university projects and bootcamp assignments. Collaborated with teams on full-stack applications using MERN stack technologies.',
      type: 'team'
    },
    {
      title: 'Full Stack Developer - BiruhKids Pediatric Clinic',
      subtitle: 'Freelance Team Project',
      status: 'Backend, UI/UX & Frontend Developer',
      description: 'Developed a comprehensive digital healthcare platform for BiruhKids Pediatric Clinic in Addis Ababa. Handled backend development, UI/UX design, and frontend implementation.',
      type: 'team'
    },
    {
      title: 'Full Stack Developer - Bluelight Academy SMS',
      subtitle: 'Solo Freelance Project',
      status: 'Complete Development (Solo)',
      description: 'Built a comprehensive school management system for Bluelight Academy independently. Handled all aspects including UI/UX design, frontend development, backend architecture, and database design.',
      type: 'solo'
    },
    {
      title: 'Real Estate Website Developer',
      subtitle: 'Freelance Team Project',
      status: 'Team Project',
      description: 'Developed a website for a real estate sales agent as part of a team. Contributed to UI/UX design, frontend development, and backend implementation.',
      type: 'team'
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Unity University',
      period: '2022 - April 2026',
      status: 'Graduated',
      description: 'Specialized in Software Engineering and Web Development. Completed multiple university projects and gained hands-on experience with modern technologies.'
    },
    {
      degree: 'Bachelor of Arts in BAIS',
      institution: 'Addis Ababa University',
      period: '2022 - July 2026',
      status: 'Currently 5th Year Student',
      description: 'Studying the intersection of business and technology, with coursework in management, information systems, and data analysis.'
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      institution: 'DirectEd Bootcamp',
      period: '',
      status: '',
      description: 'Intensive program covering MongoDB, Express.js, React, and Node.js. Working on team projects and building full-stack applications.'
    }
  ]

  return (
    <section id="experience" className="py-16 px-4 bg-light-cardHover dark:bg-dark-cardHover">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Experience */}
            <div>
              <div className="bg-light-cardHover dark:bg-dark-cardHover inline-block px-6 py-2 rounded-lg mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Experience
                </h2>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-xl h-full"
              >
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative pl-6 border-l-2 border-orange-500/30 pb-6 last:pb-0"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="absolute -left-2.5 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-light-card dark:border-dark-card"
                      />
                      
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base font-bold text-light-text dark:text-dark-text mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-xs text-orange-500 font-semibold mb-1">{exp.subtitle}</p>
                          <div className="flex items-center space-x-2 text-xs text-light-textSecondary dark:text-dark-textSecondary mb-2">
                            {exp.type === 'solo' ? <FiUser size={12} /> : <FiUsers size={12} />}
                            <span>{exp.status}</span>
                          </div>
                        </div>
                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg ml-2">
                          <FiBriefcase className="text-orange-500" size={16} />
                        </div>
                      </div>
                      
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Education */}
            <div id="education">
              <div className="bg-light-cardHover dark:bg-dark-cardHover inline-block px-6 py-2 rounded-lg mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Education
                </h2>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-xl h-full"
              >
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative pl-6 border-l-2 border-orange-500/30 pb-6 last:pb-0"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="absolute -left-2.5 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-light-card dark:border-dark-card"
                      />
                      
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base font-bold text-light-text dark:text-dark-text mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-xs text-orange-500 font-semibold mb-1">{edu.institution}</p>
                          {edu.period && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">
                              {edu.period}
                            </p>
                          )}
                          {edu.status && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-2 italic">
                              {edu.status}
                            </p>
                          )}
                        </div>
                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg ml-2">
                          <FiBook className="text-orange-500" size={16} />
                        </div>
                      </div>
                      
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* GitHub Stats Section */}
          <div style={{ marginTop: '8.25rem' }}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                GitHub Stats
              </h2>
            </div>
            <GitHubStats />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
