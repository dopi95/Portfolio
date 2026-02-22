import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'BiruhKids Pediatric Clinic Platform',
      description: 'A professional freelance project completed in a team, creating a comprehensive digital healthcare platform for BiruhKids Pediatric Clinic in Addis Ababa, featuring online appointment booking, AI-powered chatbot, multi-role authentication, and bilingual support for pediatric care.',
      technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS'],
      liveLink: 'https://www.biruhkidsclinic.com/',
      repoLink: 'https://github.com/dopi95/BiruhKids-Pediatric-Speciality'
    },
    {
      title: 'Ghion Homes Sales',
      description: 'A professional freelance project completed in a team, creating a sleek real estate website to showcase listings and simplify client interactions for a Ghion Homes sales representative.',
      technologies: ['HTML', 'CSS', 'Javascript', 'Node', 'Express', 'PostgreSQL'],
      liveLink: 'https://ghionhomessales.com/',
      repoLink: 'https://github.com/dopi95/Ghion-Homes-Sales'
    },
    {
      title: 'Bluelight Academy SMS',
      description: 'A comprehensive full-stack school management system built for Bluelight Academy in Addis Ababa. Features complete administrative control over students, employees, payments, and system management with advanced role-based access control.',
      technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS'],
      liveLink: '',
      repoLink: 'https://github.com/dopi95/School-Management-System'
    },
    {
      title: 'Nova Studio Ethiopia',
      description: 'Premier creative production agency website in Addis Ababa, Ethiopia. Features multilingual support (English/Amharic), professional photography and videography showcase, social media management services, and digital marketing solutions with modern UI/UX.',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'i18next', 'Vite', 'EmailJS'],
      liveLink: 'https://novastudio.et',
      repoLink: 'https://github.com/dopi95/Nova-Studio'
    },
    {
      title: 'Beton Kegna - Real Estate Sales Website',
      description: 'A modern, responsive full-stack website for Beton Kegna real estate sales, showcasing luxury apartments, villas, and commercial properties in Addis Ababa with bilingual support, interactive galleries, and admin dashboard.',
      technologies: ['Next.js', 'TypeScript', 'Node', 'Express', 'MongoDB', 'TailwindCSS'],
      liveLink: 'https://betonkegna.vercel.app/',
      repoLink: 'https://github.com/dopi95/BK'
    },
    {
      title: 'Kab Creative Lab',
      description: 'A full-stack web application for managing creative portfolios, projects, and client communications. Features admin panel, user dashboard, portfolio showcase with media gallery, and JWT authentication.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Node', 'Express', 'MongoDB', 'TailwindCSS'],
      liveLink: 'https://kabcreativelab.com',
      repoLink: 'https://github.com/dopi95/Kab'
    },
    {
      title: 'Artisan Blend Restaurant App',
      description: 'A collaborative bootcamp project to build a dynamic and interactive web application for a fictional high-end restaurant called Artisan Blend. It features an immersive frontend experience alongside an AI-powered backend chatbot.',
      technologies: ['React', 'Vite', 'TailwindCSS', 'Python'],
      liveLink: 'https://artisan-blend.netlify.app/',
      repoLink: 'https://github.com/dopi95/ArtisanBlend-Restaurant-App'
    },
    {
      title: 'NoteDown - Modern Blogging Platform',
      description: 'A collaborative bootcamp project creating a full-stack blogging application with CRUD operations, JWT authentication, image uploads, comments system, likes functionality, and AI chatbot integration.',
      technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS', 'Python'],
      liveLink: 'https://notedowny.netlify.app/',
      repoLink: 'https://github.com/Ishimweric/blogging_app'
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
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors text-sm font-semibold"
                    >
                      <FiExternalLink size={16} />
                      <span>Live</span>
                    </a>
                  )}
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
