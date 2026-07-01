import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project'

dotenv.config()

const projects = [
  {
    title: 'Bluelight Academy – School Management System',
    description: 'A comprehensive full-stack School Management System integrating the public website and student portal into a unified platform. Features role-based authentication for Administrators, Teachers, and Students, complete academic management modules, RESTful APIs, and responsive dashboards.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    liveUrl: 'https://bluelight.edu.et',
    githubUrl: 'https://github.com/dopi95/School-Management-System',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    featured: true,
    order: 1
  },
  {
    title: 'MT Body Oil Boutique',
    description: 'A custom full-stack e-commerce platform for a U.S.-based perfume and body oil retailer. Features Stripe payment integration, Shippo shipping automation, responsive storefront with product catalog, shopping cart, customer accounts, and order management.',
    technologies: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Shippo', 'PostgreSQL'],
    liveUrl: '',
    githubUrl: '',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    featured: true,
    order: 2
  },
  {
    title: 'Fresh Corner E-Commerce Platform',
    description: 'A full-stack e-commerce platform for grocery shopping with secure authentication, product management, shopping cart, order tracking, and payment integration. Features JWT authentication, Cloudinary image uploads, and Chapa/Telebirr payments for the Ethiopian market.',
    technologies: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Chapa'],
    liveUrl: '',
    githubUrl: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    featured: true,
    order: 3
  },
  {
    title: 'Biruh Kids Pediatric Clinic Platform',
    description: 'A clinic management platform digitizing appointment scheduling and patient record management. Features secure role-based authentication, bilingual support (English/Amharic), dashboards for appointments and patient information, and automated administrative workflows.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    liveUrl: 'https://www.biruhkidsclinic.com/',
    githubUrl: 'https://github.com/dopi95/BiruhKids-Pediatric-Speciality',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop',
    featured: false,
    order: 4
  },
  {
    title: 'AAU E-Learning System',
    description: 'A full-stack e-learning platform supporting course management, assignments, exams, attendance, and real-time communication. Features JWT authentication, role-based access control, payment integration, and AI-powered chatbot using Groq AI (LLaMA 3.3).',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Groq AI', 'Cloudinary', 'Chapa'],
    liveUrl: '',
    githubUrl: '',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',
    featured: false,
    order: 5
  },
  {
    title: 'Ghion Homes Sales',
    description: 'A real estate website showcasing residential properties with detailed listings and image galleries. Features a custom CMS for administrators, bilingual support (English/Amharic), and customer inquiry forms.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    liveUrl: 'https://ghionhomessales.com/',
    githubUrl: 'https://github.com/dopi95/Ghion-Homes-Sales',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop',
    featured: false,
    order: 6
  },
  {
    title: 'NoteDown Blogging Platform',
    description: 'A modern full-stack blogging platform with authentication, blog management, comments, likes, and image uploads. Features secure REST APIs with JWT, AI-powered writing assistance, API rate limiting with Upstash Redis, and dark/light mode.',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Multer', 'Upstash Redis'],
    liveUrl: 'https://notedowny.netlify.app/',
    githubUrl: 'https://github.com/Ishimweric/blogging_app',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    featured: false,
    order: 7
  },
  {
    title: 'Kab Creative Lab',
    description: 'A full-stack web application for managing creative portfolios, projects, and client communications. Features admin panel, user dashboard, portfolio showcase with media gallery, and JWT authentication.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://kabcreativelab.com',
    githubUrl: 'https://github.com/dopi95/Kab',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    featured: false,
    order: 8
  },
  {
    title: 'Nova Studio Ethiopia',
    description: 'Premier creative production agency website in Addis Ababa. Features multilingual support (English/Amharic), professional photography and videography showcase, social media management services, and digital marketing solutions.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'i18next', 'Vite', 'EmailJS'],
    liveUrl: 'https://novastudio.et',
    githubUrl: 'https://github.com/dopi95/Nova-Studio',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop',
    featured: false,
    order: 9
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
