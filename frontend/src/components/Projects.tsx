import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi'
import { API_BASE_URL } from '../config'

const fallbackProjects = [
  {
    title: 'BiruhKids Pediatric Clinic Platform',
    description: 'A professional freelance project completed in a team, creating a comprehensive digital healthcare platform for BiruhKids Pediatric Clinic in Addis Ababa, featuring online appointment booking, AI-powered chatbot, multi-role authentication, and bilingual support for pediatric care.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS'],
    liveUrl: 'https://www.biruhkidsclinic.com/',
    githubUrl: 'https://github.com/dopi95/BiruhKids-Pediatric-Speciality',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop',
  },
  {
    title: 'Ghion Homes Sales',
    description: 'A professional freelance project completed in a team, creating a sleek real estate website to showcase listings and simplify client interactions for a Ghion Homes sales representative.',
    technologies: ['HTML', 'CSS', 'Javascript', 'Node', 'Express', 'PostgreSQL'],
    liveUrl: 'https://ghionhomessales.com/',
    githubUrl: 'https://github.com/dopi95/Ghion-Homes-Sales',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop',
  },
  {
    title: 'Bluelight Academy SMS',
    description: 'A comprehensive full-stack school management system built for Bluelight Academy in Addis Ababa. Features complete administrative control over students, employees, payments, and system management with advanced role-based access control.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS'],
    liveUrl: '',
    githubUrl: 'https://github.com/dopi95/School-Management-System',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
  },
  {
    title: 'Nova Studio Ethiopia',
    description: 'Premier creative production agency website in Addis Ababa, Ethiopia. Features multilingual support (English/Amharic), professional photography and videography showcase, social media management services, and digital marketing solutions with modern UI/UX.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'i18next', 'Vite', 'EmailJS'],
    liveUrl: 'https://novastudio.et',
    githubUrl: 'https://github.com/dopi95/Nova-Studio',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop',
  },
  {
    title: 'Beton Kegna - Real Estate Sales Website',
    description: 'A modern, responsive full-stack website for Beton Kegna real estate sales, showcasing luxury apartments, villas, and commercial properties in Addis Ababa with bilingual support, interactive galleries, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Node', 'Express', 'MongoDB', 'TailwindCSS'],
    liveUrl: 'https://betonkegna.vercel.app/',
    githubUrl: 'https://github.com/dopi95/BK',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
  },
  {
    title: 'Kab Creative Lab',
    description: 'A full-stack web application for managing creative portfolios, projects, and client communications. Features admin panel, user dashboard, portfolio showcase with media gallery, and JWT authentication.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node', 'Express', 'MongoDB', 'TailwindCSS'],
    liveUrl: 'https://kabcreativelab.com',
    githubUrl: 'https://github.com/dopi95/Kab',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    title: 'Artisan Blend Restaurant App',
    description: 'A collaborative bootcamp project to build a dynamic and interactive web application for a fictional high-end restaurant called Artisan Blend. It features an immersive frontend experience alongside an AI-powered backend chatbot.',
    technologies: ['React', 'Vite', 'TailwindCSS', 'Python'],
    liveUrl: 'https://artisan-blend.netlify.app/',
    githubUrl: 'https://github.com/dopi95/ArtisanBlend-Restaurant-App',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  },
  {
    title: 'NoteDown - Modern Blogging Platform',
    description: 'A collaborative bootcamp project creating a full-stack blogging application with CRUD operations, JWT authentication, image uploads, comments system, likes functionality, and AI chatbot integration.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS', 'Python'],
    liveUrl: 'https://notedowny.netlify.app/',
    githubUrl: 'https://github.com/Ishimweric/blogging_app',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
  }
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [projects, setProjects] = useState<any[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`)
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) setProjects(data)
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
            <div className="grid md:grid-cols-2 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-light-card dark:bg-dark-card rounded-xl p-6 border-l-4 border-orange-500/30">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="w-16 h-16 rounded-lg bg-light-border dark:bg-dark-border shrink-0" />
                    <div className="flex-1">
                      <div className="h-5 bg-light-border dark:bg-dark-border rounded w-3/4 mb-2" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-light-border dark:bg-dark-border rounded w-full" />
                    <div className="h-3 bg-light-border dark:bg-dark-border rounded w-5/6" />
                  </div>
                  <div className="flex gap-2 mb-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-16 bg-light-border dark:bg-dark-border rounded-full" />
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-light-border dark:border-dark-border">
                    <div className="h-4 w-12 bg-light-border dark:bg-dark-border rounded" />
                    <div className="h-4 w-20 bg-light-border dark:bg-dark-border rounded" />
                  </div>
                </div>
              ))}
            </div>
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
                  {project.technologies.map((tech: string) => (
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
