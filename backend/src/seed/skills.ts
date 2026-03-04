import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Skill from '../models/Skill'

dotenv.config()

const skills = [
  { name: 'HTML5', percent: 95, icon: 'FaHtml5', color: '#E34F26', category: 'Frontend', order: 1 },
  { name: 'CSS3', percent: 90, icon: 'FaCss3Alt', color: '#1572B6', category: 'Frontend', order: 2 },
  { name: 'JavaScript', percent: 90, icon: 'SiJavascript', color: '#F7DF1E', category: 'Frontend', order: 3 },
  { name: 'React', percent: 90, icon: 'FaReact', color: '#61DAFB', category: 'Frontend', order: 4 },
  { name: 'Next.js', percent: 85, icon: 'SiNextdotjs', color: '#000000', category: 'Frontend', order: 5 },
  { name: 'TypeScript', percent: 85, icon: 'SiTypescript', color: '#3178C6', category: 'Frontend', order: 6 },
  { name: 'Tailwind CSS', percent: 95, icon: 'SiTailwindcss', color: '#06B6D4', category: 'Frontend', order: 7 },
  { name: 'Node.js', percent: 88, icon: 'FaNodeJs', color: '#339933', category: 'Backend', order: 8 },
  { name: 'Express', percent: 90, icon: 'SiExpress', color: '#000000', category: 'Backend', order: 9 },
  { name: 'PHP', percent: 75, icon: 'FaPhp', color: '#777BB4', category: 'Backend', order: 10 },
  { name: 'MongoDB', percent: 85, icon: 'SiMongodb', color: '#47A248', category: 'Database', order: 11 },
  { name: 'PostgreSQL', percent: 80, icon: 'SiPostgresql', color: '#4169E1', category: 'Database', order: 12 },
  { name: 'MySQL', percent: 80, icon: 'SiMysql', color: '#4479A1', category: 'Database', order: 13 },
  { name: 'Java', percent: 85, icon: 'FaJava', color: '#007396', category: 'Programming Languages', order: 14 },
  { name: 'Python', percent: 88, icon: 'FaPython', color: '#3776AB', category: 'Programming Languages', order: 15 },
  { name: 'C++', percent: 80, icon: 'SiCplusplus', color: '#00599C', category: 'Programming Languages', order: 16 },
  { name: 'JavaFX', percent: 75, icon: 'FaJava', color: '#007396', category: 'Programming Languages', order: 17 },
  { name: 'Git', percent: 90, icon: 'FaGitAlt', color: '#F05032', category: 'Tools & DevOps', order: 18 },
  { name: 'Docker', percent: 75, icon: 'FaDocker', color: '#2496ED', category: 'Tools & DevOps', order: 19 },
  { name: 'VS Code', percent: 95, icon: 'VscCode', color: '#007ACC', category: 'Tools & DevOps', order: 20 },
  { name: 'AWS', percent: 70, icon: 'FaAws', color: '#FF9900', category: 'Tools & DevOps', order: 21 },
  { name: 'Vercel', percent: 90, icon: 'SiVercel', color: '#000000', category: 'Deployment', order: 22 },
  { name: 'Netlify', percent: 85, icon: 'SiNetlify', color: '#00C7B7', category: 'Deployment', order: 23 },
  { name: 'Render', percent: 80, icon: 'SiRender', color: '#46E3B7', category: 'Deployment', order: 24 }
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
