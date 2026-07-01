import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Skill from '../models/Skill'

dotenv.config()

const skills = [
  // Frontend
  { name: 'React', percent: 92, icon: 'FaReact', color: '#61DAFB', category: 'Frontend', order: 1 },
  { name: 'Next.js', percent: 92, icon: 'SiNextdotjs', color: '#000000', category: 'Frontend', order: 2 },
  { name: 'TypeScript', percent: 88, icon: 'SiTypescript', color: '#3178C6', category: 'Frontend', order: 3 },
  { name: 'Tailwind CSS', percent: 95, icon: 'SiTailwindcss', color: '#06B6D4', category: 'Frontend', order: 4 },
  { name: 'HTML5', percent: 95, icon: 'FaHtml5', color: '#E34F26', category: 'Frontend', order: 5 },
  { name: 'CSS3', percent: 90, icon: 'FaCss3Alt', color: '#1572B6', category: 'Frontend', order: 6 },
  { name: 'Redux Toolkit', percent: 82, icon: 'SiRedux', color: '#764ABC', category: 'Frontend', order: 7 },
  // Backend
  { name: 'Node.js', percent: 90, icon: 'FaNodeJs', color: '#339933', category: 'Backend', order: 8 },
  { name: 'Express', percent: 90, icon: 'SiExpress', color: '#000000', category: 'Backend', order: 9 },
  { name: 'NestJS', percent: 80, icon: 'SiNestjs', color: '#E0234E', category: 'Backend', order: 10 },
  { name: 'REST APIs', percent: 92, icon: 'SiPostman', color: '#FF6C37', category: 'Backend', order: 11 },
  { name: 'JWT / OAuth', percent: 88, icon: 'SiJsonwebtokens', color: '#000000', category: 'Backend', order: 12 },
  // Databases
  { name: 'MongoDB', percent: 88, icon: 'SiMongodb', color: '#47A248', category: 'Database', order: 13 },
  { name: 'PostgreSQL', percent: 82, icon: 'SiPostgresql', color: '#4169E1', category: 'Database', order: 14 },
  { name: 'MySQL', percent: 80, icon: 'SiMysql', color: '#4479A1', category: 'Database', order: 15 },
  // Integrations
  { name: 'Stripe', percent: 82, icon: 'SiStripe', color: '#635BFF', category: 'Integrations', order: 16 },
  { name: 'Cloudinary', percent: 85, icon: 'SiCloudinary', color: '#3448C5', category: 'Integrations', order: 17 },
  // Programming Languages
  { name: 'JavaScript', percent: 92, icon: 'SiJavascript', color: '#F7DF1E', category: 'Programming Languages', order: 18 },
  { name: 'Java', percent: 82, icon: 'FaJava', color: '#007396', category: 'Programming Languages', order: 19 },
  { name: 'Python', percent: 85, icon: 'FaPython', color: '#3776AB', category: 'Programming Languages', order: 20 },
  { name: 'PHP', percent: 75, icon: 'FaPhp', color: '#777BB4', category: 'Programming Languages', order: 21 },
  // Tools & DevOps
  { name: 'Git / GitHub', percent: 92, icon: 'FaGitAlt', color: '#F05032', category: 'Tools & DevOps', order: 22 },
  { name: 'Docker', percent: 75, icon: 'FaDocker', color: '#2496ED', category: 'Tools & DevOps', order: 23 },
  { name: 'Jest', percent: 78, icon: 'SiJest', color: '#C21325', category: 'Tools & DevOps', order: 24 },
  { name: 'Playwright', percent: 75, icon: 'SiPlaywright', color: '#2EAD33', category: 'Tools & DevOps', order: 25 },
  // Deployment
  { name: 'Vercel', percent: 92, icon: 'SiVercel', color: '#000000', category: 'Deployment', order: 26 },
  { name: 'Netlify', percent: 88, icon: 'SiNetlify', color: '#00C7B7', category: 'Deployment', order: 27 },
  { name: 'Render', percent: 82, icon: 'SiRender', color: '#46E3B7', category: 'Deployment', order: 28 }
]

const seedSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected')

    await Skill.deleteMany({})
    console.log('Cleared existing skills')

    await Skill.insertMany(skills)
    console.log('Skills seeded successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding skills:', error)
    process.exit(1)
  }
}

seedSkills()
