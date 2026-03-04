import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project'

dotenv.config()

const projects = [
  {
    title: 'BiruhKids Pediatric Clinic Platform',
    description: 'A professional freelance project completed in a team, creating a comprehensive digital healthcare platform for BiruhKids Pediatric Clinic in Addis Ababa, featuring online appointment booking, AI-powered chatbot, multi-role authentication, and bilingual support for pediatric care.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS'],
    liveUrl: 'https://www.biruhkidsclinic.com/',
    githubUrl: 'https://github.com/dopi95/BiruhKids-Pediatric-Speciality',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop',
    order: 1
  },
  {
    title: 'Ghion Homes Sales',
    description: 'A professional freelance project completed in a team, creating a sleek real estate website to showcase listings and simplify client interactions for a Ghion Homes sales representative.',
    technologies: ['HTML', 'CSS', 'Javascript', 'Node', 'Express', 'PostgreSQL'],
    liveUrl: 'https://ghionhomessales.com/',
    githubUrl: 'https://github.com/dopi95/Ghion-Homes-Sales',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop',
    order: 2
  },
  {
    title: 'Bluelight Academy SMS',
    description: 'A comprehensive full-stack school management system built for Bluelight Academy in Addis Ababa. Features complete administrative control over students, employees, payments, and system management with advanced role-based access control.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS'],
    liveUrl: '',
    githubUrl: 'https://github.com/dopi95/School-Management-System',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    order: 3
  },
  {
    title: 'Nova Studio Ethiopia',
    description: 'Premier creative production agency website in Addis Ababa, Ethiopia. Features multilingual support (English/Amharic), professional photography and videography showcase, social media management services, and digital marketing solutions with modern UI/UX.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'i18next', 'Vite', 'EmailJS'],
    liveUrl: 'https://novastudio.et',
    githubUrl: 'https://github.com/dopi95/Nova-Studio',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop',
    order: 4
  },
  {
    title: 'Beton Kegna - Real Estate Sales Website',
    description: 'A modern, responsive full-stack website for Beton Kegna real estate sales, showcasing luxury apartments, villas, and commercial properties in Addis Ababa with bilingual support, interactive galleries, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Node', 'Express', 'MongoDB', 'TailwindCSS'],
    liveUrl: 'https://betonkegna.vercel.app/',
    githubUrl: 'https://github.com/dopi95/BK',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    order: 5
  },
  {
    title: 'Kab Creative Lab',
    description: 'A full-stack web application for managing creative portfolios, projects, and client communications. Features admin panel, user dashboard, portfolio showcase with media gallery, and JWT authentication.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node', 'Express', 'MongoDB', 'TailwindCSS'],
    liveUrl: 'https://kabcreativelab.com',
    githubUrl: 'https://github.com/dopi95/Kab',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    order: 6
  },
  {
    title: 'Artisan Blend Restaurant App',
    description: 'A collaborative bootcamp project to build a dynamic and interactive web application for a fictional high-end restaurant called Artisan Blend. It features an immersive frontend experience alongside an AI-powered backend chatbot.',
    technologies: ['React', 'Vite', 'TailwindCSS', 'Python'],
    liveUrl: 'https://artisan-blend.netlify.app/',
    githubUrl: 'https://github.com/dopi95/ArtisanBlend-Restaurant-App',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    order: 7
  },
  {
    title: 'NoteDown - Modern Blogging Platform',
    description: 'A collaborative bootcamp project creating a full-stack blogging application with CRUD operations, JWT authentication, image uploads, comments system, likes functionality, and AI chatbot integration.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Javascript', 'TailwindCSS', 'Python'],
    liveUrl: 'https://notedowny.netlify.app/',
    githubUrl: 'https://github.com/Ishimweric/blogging_app',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    order: 8
  }
]

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected')

    await Project.deleteMany({})
    console.log('Cleared existing projects')

    await Project.insertMany(projects)
    console.log('Projects seeded successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding projects:', error)
    process.exit(1)
  }
}

seedProjects()
