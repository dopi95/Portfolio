import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Education from '../models/Education'

dotenv.config()

const education = [
  {
    degree: 'BSc in Computer Science',
    institution: 'Unity University',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2022',
    endDate: 'March 2026',
    description: 'Relevant Coursework: Data Structures & Algorithms, Database Systems, AI, Web Security, Software Engineering.',
    order: 1
  },
  {
    degree: 'BA in Business Administration and Information Systems (BAIS)',
    institution: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    startDate: '2022',
    endDate: 'June 2026',
    description: 'Studied the intersection of business and technology with coursework in management, information systems, and data analysis.',
    order: 2
  }
]

const seedEducation = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected')

    await Education.deleteMany({})
    console.log('Cleared existing education')

    await Education.insertMany(education)
    console.log('Education seeded successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding education:', error)
    process.exit(1)
  }
}

seedEducation()
