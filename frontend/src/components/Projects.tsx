import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with payment integration, user authentication, and admin dashboard.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/elyasyenealem/ecommerce'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, team collaboration, and progress tracking.',
      image: '📋',
      technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/elyasyenealem/taskmanager'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with data visualization and reporting features.',
      image: '📊',
      technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/elyasyenealem/dashboard'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather application with location-based forecasts and interactive maps.',
      image: '🌤️',
      technologies: ['React', 'API Integration', 'Geolocation'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/elyasyenealem/weather'
    },
    {
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support, comments, and user profiles.',
      image: '✍️',
      technologies: ['Next.js', 'MongoDB', 'NextAuth', 'MDX'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/elyasyenealem/blog'
    },
    {
      title: 'Chat Application',
      description: 'Real-time messaging app with group chats, file sharing, and emoji support.',
      image: '💬',
      technologies: ['React', 'Socket.io', 'Node.js', 'Redis'],
      liveLink: 'https://demo.com',
      repoLink: 'https://github.com/elyasyenealem/chat'
    }
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-light-border dark:border-dark-border"
              >
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 h-48 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">{project.title}</h3>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-light-cardHover dark:bg-dark-cardHover text-xs rounded-full border border-light-border dark:border-dark-border">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <FiExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-light-textSecondary dark:text-dark-textSecondary hover:underline"
                    >
                      <FiGithub size={16} />
                      <span className="text-sm">Code</span>
                    </a>
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

export default Projects
