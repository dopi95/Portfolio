import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Testimonial from '../models/Testimonial'

dotenv.config()

const testimonials = [
  {
    name: 'Dr. Fasil Menbere',
    position: 'Pediatric Specialist, CEO & Founder at BiruhKids Pediatric Speciality',
    message: 'Elyas delivered an exceptional healthcare platform for our clinic. His technical expertise and understanding of our needs resulted in a comprehensive system that has transformed how we serve our patients.',
    rating: 5,
    avatar: 'FM',
    photo: ''
  },
  {
    name: 'Mulugeta D.',
    position: 'Real Estate Sales Consultant at Ghion Homes',
    message: 'Working with Elyas was a great experience. He created a professional and sleek website that perfectly showcases our property listings and has significantly improved our client interactions.',
    rating: 5,
    avatar: 'MD',
    photo: ''
  },
  {
    name: 'Yenealem A.',
    position: 'Founder & CEO at Bluelight Academy',
    message: 'Elyas built an outstanding school management system for our academy. His dedication and technical skills resulted in a comprehensive platform that streamlined our entire administrative process.',
    rating: 5,
    avatar: 'YA',
    photo: ''
  }
]

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected')

    await Testimonial.deleteMany({})
    console.log('Cleared existing testimonials')

    await Testimonial.insertMany(testimonials)
    console.log('Testimonials seeded successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding testimonials:', error)
    process.exit(1)
  }
}

seedTestimonials()
