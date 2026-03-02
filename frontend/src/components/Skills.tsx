import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaAws, FaHtml5, FaCss3Alt, FaPhp, FaJava, FaPython } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiVercel, SiNetlify, SiRender, SiJavascript, SiCplusplus } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML5', percent: 95, icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', percent: 90, icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', percent: 90, icon: SiJavascript, color: '#F7DF1E' },
        { name: 'React', percent: 90, icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', percent: 85, icon: SiNextdotjs, color: '#000000' },
        { name: 'TypeScript', percent: 85, icon: SiTypescript, color: '#3178C6' },
        { name: 'Tailwind CSS', percent: 95, icon: SiTailwindcss, color: '#06B6D4' },
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', percent: 88, icon: FaNodeJs, color: '#339933' },
        { name: 'Express', percent: 90, icon: SiExpress, color: '#000000' },
        { name: 'PHP', percent: 75, icon: FaPhp, color: '#777BB4' },
      ]
    },
    {
      category: 'Database',
      skills: [
        { name: 'MongoDB', percent: 85, icon: SiMongodb, color: '#47A248' },
        { name: 'PostgreSQL', percent: 80, icon: SiPostgresql, color: '#4169E1' },
        { name: 'MySQL', percent: 80, icon: SiMysql, color: '#4479A1' },
      ]
    },
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Java', percent: 85, icon: FaJava, color: '#007396' },
        { name: 'Python', percent: 88, icon: FaPython, color: '#3776AB' },
        { name: 'C++', percent: 80, icon: SiCplusplus, color: '#00599C' },
        { name: 'JavaFX', percent: 75, icon: FaJava, color: '#007396' },
      ]
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git', percent: 90, icon: FaGitAlt, color: '#F05032' },
        { name: 'Docker', percent: 75, icon: FaDocker, color: '#2496ED' },
        { name: 'VS Code', percent: 95, icon: VscCode, color: '#007ACC' },
        { name: 'AWS', percent: 70, icon: FaAws, color: '#FF9900' },
      ]
    },
    {
      category: 'Deployment',
      skills: [
        { name: 'Vercel', percent: 90, icon: SiVercel, color: '#000000' },
        { name: 'Netlify', percent: 85, icon: SiNetlify, color: '#00C7B7' },
        { name: 'Render', percent: 80, icon: SiRender, color: '#46E3B7' },
      ]
    }
  ]

  const CircularProgress = ({ percent, name, icon: Icon, color, delay }: { percent: number, name: string, icon: any, color: string, delay: number }) => {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percent / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg className="transform -rotate-90 w-28 h-28">
            {/* Background circle */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-light-border dark:text-dark-border"
            />
            {/* Progress circle */}
            <motion.circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-orange-500"
              initial={{ strokeDashoffset: circumference }}
              animate={isInView ? { strokeDashoffset: offset } : {}}
              transition={{ duration: 1.5, delay, ease: "easeOut" }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          {/* Icon and percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
              className="bg-light-card dark:bg-dark-card rounded-full p-2 shadow-md"
            >
              <Icon size={28} style={{ color }} />
            </motion.div>
            <motion.span
              className="text-xs font-bold text-orange-500 mt-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: delay + 0.5 }}
            >
              {percent}%
            </motion.span>
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold text-center text-light-text dark:text-dark-text">{name}</p>
      </div>
    )
  }

  return (
    <section id="skills" className="py-16 px-4 bg-light-cardHover dark:bg-dark-cardHover relative overflow-hidden">
      {/* Diagonal grid pattern background - same as About */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-25">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonal-grid-skills" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="40" height="40" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-grid-skills)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-500" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Technical Skills
          </h2>
          
          <div className="space-y-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {category.skills.map((skill, skillIndex) => (
                    <CircularProgress
                      key={skill.name}
                      name={skill.name}
                      percent={skill.percent}
                      icon={skill.icon}
                      color={skill.color}
                      delay={catIndex * 0.2 + skillIndex * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
