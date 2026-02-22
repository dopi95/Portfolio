import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with payment integration, user authentication, and admin dashboard. Built with modern technologies for seamless shopping experience.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/dopi95/ecommerce'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, team collaboration features, and progress tracking. Designed for efficient project management.',
      technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/dopi95/taskmanager'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with data visualization, reporting features, and real-time insights for better decision making.',
      technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/dopi95/dashboard'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and detailed weather information for multiple cities.',
      technologies: ['React', 'API Integration', 'Geolocation'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/dopi95/weather'
    },
    {
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support, comments system, user profiles, and content management features for writers.',
      technologies: ['Next.js', 'MongoDB', 'NextAuth', 'MDX'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/dopi95/blog'
    },
    {
      title: 'Chat Application',
      description: 'Real-time messaging app with group chats, file sharing, emoji support, and end-to-end encryption for secure communication.',
      technologies: ['React', 'Socket.io', 'Node.js', 'Redis'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/dopi95/chat'
    }
  ]

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
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border-l-4 border-orange-500 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-light-text dark:text-dark-text group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <FiCode className="text-orange-500" size={20} />
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
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors text-sm font-semibold"
                  >
                    <FiExternalLink size={16} />
                    <span>Live</span>
                  </a>
                  <a 
                    href={project.repoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 transition-colors text-sm font-semibold"
                  >
                    <FiGithub size={16} />
                    <span>View Code</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
