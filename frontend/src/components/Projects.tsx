import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="projects" className="py-16 px-4 bg-light-cardHover dark:bg-dark-cardHover">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-light-cardHover dark:bg-dark-cardHover inline-block px-8 py-2 rounded-lg mb-12 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Projects
            </h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">No projects yet</div>
          ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border-l-4 border-orange-500 group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:space-x-4 mb-3">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full md:w-16 h-32 md:h-16 object-cover rounded-lg border-2 border-orange-500/20 mb-3 md:mb-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg md:text-xl font-bold text-light-text dark:text-dark-text group-hover:text-orange-500 transition-colors">
                        {project.title}
                      </h3>
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg ml-2">
                        <FiCode className="text-orange-500" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-4 border-t border-light-border dark:border-dark-border">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors text-sm font-semibold"
                    >
                      <FiExternalLink size={16} />
                      <span>Live</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 transition-colors text-sm font-semibold"
                    >
                      <FiGithub size={16} />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
