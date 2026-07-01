import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiBriefcase, FiBook } from 'react-icons/fi'
import GitHubStats from './GitHubStats'
import { API_BASE_URL } from '../config'

const fallbackExperiences = [
  {
    title: 'University & Bootcamp Projects',
    company: 'Academic & Training Projects',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2022',
    endDate: '',
    description: 'Completed various university projects and bootcamp assignments. Collaborated with teams on full-stack applications using MERN stack technologies.',
  },
  {
    title: 'Full Stack Developer - BiruhKids Pediatric Clinic',
    company: 'Freelance Team Project',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2024',
    endDate: '2024',
    description: 'Developed a comprehensive digital healthcare platform for BiruhKids Pediatric Clinic in Addis Ababa. Handled backend development, UI/UX design, and frontend implementation.',
  },
  {
    title: 'Full Stack Developer - Bluelight Academy SMS',
    company: 'Solo Freelance Project',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2024',
    endDate: '2024',
    description: 'Built a comprehensive school management system for Bluelight Academy independently. Handled all aspects including UI/UX design, frontend development, backend architecture, and database design.',
  },
  {
    title: 'Real Estate Website Developer',
    company: 'Freelance Team Project',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2024',
    endDate: '2024',
    description: 'Developed a website for a real estate sales agent as part of a team. Contributed to UI/UX design, frontend development, and backend implementation.',
  }
]

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [experiences, setExperiences] = useState<any[]>(fallbackExperiences)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/experiences`)
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) setExperiences(data)
      }
    } catch (error) {
      console.error('Error loading experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const education = [
    {
      degree: 'BSc in Computer Science',
      institution: 'Unity University',
      location: 'Addis Ababa, Ethiopia',
      graduationDate: 'March 2026',
      description: ''
    },
    {
      degree: 'BA in Business Administration and Information System',
      institution: 'Addis Ababa University',
      location: 'Addis Ababa, Ethiopia',
      graduationDate: 'June 2026',
      description: ''
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
              <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-500 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Experience
              </h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-6 rounded-2xl shadow-xl h-full bg-light-card dark:bg-dark-card lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:p-0"
              >
                {loading ? (
                  <div className="space-y-6 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-orange-500/30 pb-6">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-light-border dark:bg-dark-border rounded-full" />
                        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-3/4 mb-2" />
                        <div className="h-3 bg-light-border dark:bg-dark-border rounded w-1/2 mb-2" />
                        <div className="h-3 bg-light-border dark:bg-dark-border rounded w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
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
                        className="absolute -left-2.5 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-light-card dark:border-dark-card lg:border-light-cardHover lg:dark:border-dark-cardHover"
                      />
                      
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base font-bold text-light-text dark:text-dark-text mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-xs text-orange-500 font-semibold mb-1">{exp.company}</p>
                          <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-2">
                            {exp.startDate} - {exp.endDate || 'Present'}
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
                )}
              </motion.div>
            </div>

            {/* Education */}
            <div id="education" className="mt-16 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-500 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Education
              </h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-6 rounded-2xl shadow-xl h-full bg-light-card dark:bg-dark-card lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:p-0"
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
                        className="absolute -left-2.5 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-light-card dark:border-dark-card lg:border-light-cardHover lg:dark:border-dark-cardHover"
                      />
                      
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base font-bold text-light-text dark:text-dark-text mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-xs text-orange-500 font-semibold mb-1">{edu.institution}</p>
                          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">
                            {edu.location}
                          </p>
                          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-2">
                            Graduation Date: {edu.graduationDate}
                          </p>
                        </div>
                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg ml-2">
                          <FiBook className="text-orange-500" size={16} />
                        </div>
                      </div>
                      
                      {edu.description && (
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                        {edu.description}
                      </p>
                      )}
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
