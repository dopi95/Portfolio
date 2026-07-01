import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Experience from '../models/Experience'

dotenv.config()

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Bluelight Academy – School Management System',
    location: 'Addis Ababa, Ethiopia',
    startDate: 'Mar 2026',
    endDate: '',
    current: true,
    description: 'Architected and developed a comprehensive full-stack School Management System integrating the public website and student portal into a unified platform. Built and deployed bluelight.edu.et and portal.bluelight.edu.et with role-based authentication for Administrators, Teachers, and Students using JWT. Implemented complete student, teacher, class, and academic management modules with full CRUD functionality. Designed RESTful APIs, responsive dashboards, and managed deployment and domain configuration.\n\nTechnologies: Next.js 14, TypeScript, Node.js, Express.js, MongoDB, Mongoose, JWT, Tailwind CSS, React Hook Form, Axios, bcryptjs',
    order: 1
  },
  {
    title: 'Full Stack Developer',
    company: 'MT Body Oil Boutique',
    location: 'Addis Ababa, Ethiopia',
    startDate: 'Apr 2026',
    endDate: 'Jun 2026',
    current: false,
    description: 'Architected and developed a custom full-stack e-commerce platform for a U.S.-based perfume and body oil retailer using Next.js and NestJS. Integrated Stripe for secure online payments and Shippo for shipping label generation and order fulfillment. Developed a responsive storefront with product catalog, shopping cart, customer accounts, and order management. Collaborated directly with the client throughout development and deployment.\n\nTechnologies: Next.js, NestJS, TypeScript, Tailwind CSS, Stripe, Shippo, PostgreSQL',
    order: 2
  },
  {
    title: 'Full Stack Developer',
    company: 'Biruh Kids Pediatrics Speciality Clinic',
    location: 'Addis Ababa, Ethiopia',
    startDate: 'Jun 2025',
    endDate: 'Aug 2025',
    current: false,
    description: 'Architected and developed a clinic management platform to digitize appointment scheduling and patient record management. Implemented secure role-based authentication using JWT and bcrypt. Added bilingual support (English and Amharic) for improved accessibility. Built dashboards for managing appointments, patient information, and clinic operations, automating administrative workflows.\n\nTechnologies: React, Node.js, Express, MongoDB, JWT, Tailwind CSS',
    order: 3
  },
  {
    title: 'Full Stack Developer',
    company: 'Mulugeta Ghion Homes Sales',
    location: 'Addis Ababa, Ethiopia',
    startDate: 'Jul 2024',
    endDate: 'Aug 2024',
    current: false,
    description: 'Developed a real estate website showcasing residential properties with detailed listings and image galleries. Built a custom CMS enabling administrators to manage property listings without modifying code. Implemented bilingual support (English and Amharic) and integrated customer inquiry forms.\n\nTechnologies: HTML/CSS, JavaScript, Node.js, Express, PostgreSQL',
    order: 4
  }
]

const seedExperiences = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected')

    await Experience.deleteMany({})
    console.log('Cleared existing experiences')

    await Experience.insertMany(experiences)
    console.log('Experiences seeded successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding experiences:', error)
    process.exit(1)
  }
}

seedExperiences()
