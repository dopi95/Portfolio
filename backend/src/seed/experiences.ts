import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Experience from '../models/Experience'

dotenv.config()

const experiences = [
  {
    title: 'University & Bootcamp Projects',
    company: 'Academic & Training Projects',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2022',
    endDate: '',
    description: 'Completed various university projects and bootcamp assignments. Collaborated with teams on full-stack applications using MERN stack technologies.',
    order: 1
  },
  {
    title: 'Full Stack Developer - BiruhKids Pediatric Clinic',
    company: 'Freelance Team Project',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2024',
    endDate: '2024',
    description: 'Developed a comprehensive digital healthcare platform for BiruhKids Pediatric Clinic in Addis Ababa. Handled backend development, UI/UX design, and frontend implementation.',
    order: 2
  },
  {
    title: 'Full Stack Developer - Bluelight Academy SMS',
    company: 'Solo Freelance Project',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2024',
    endDate: '2024',
    description: 'Built a comprehensive school management system for Bluelight Academy independently. Handled all aspects including UI/UX design, frontend development, backend architecture, and database design.',
    order: 3
  },
  {
    title: 'Real Estate Website Developer',
    company: 'Freelance Team Project',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2024',
    endDate: '2024',
    description: 'Developed a website for a real estate sales agent as part of a team. Contributed to UI/UX design, frontend development, and backend implementation.',
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
