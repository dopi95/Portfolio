import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaAws, FaHtml5, FaCss3Alt, FaPhp, FaJava, FaPython, FaFigma, FaDatabase } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiVercel, SiNetlify, SiRender, SiJavascript, SiCplusplus, SiGithub, SiGooglecloud } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { BiCodeAlt } from 'react-icons/bi'
import { API_BASE_URL } from '../config'

const iconMap: any = {
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaAws, FaHtml5, FaCss3Alt, FaPhp, FaJava, FaPython,
  FaFigma, FaDatabase,
  SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiMysql,
  SiVercel, SiNetlify, SiRender, SiJavascript, SiCplusplus, SiGithub, SiGooglecloud,
  VscCode, BiCodeAlt
}

const fallbackSkills = [
  { name: 'HTML5',       icon: 'FaHtml5',      color: '#E34F26', category: 'Frontend' },
  { name: 'CSS3',        icon: 'FaCss3Alt',    color: '#1572B6', category: 'Frontend' },
  { name: 'JavaScript',  icon: 'SiJavascript', color: '#F7DF1E', category: 'Frontend' },
  { name: 'TypeScript',  icon: 'SiTypescript', color: '#3178C6', category: 'Frontend' },
  { name: 'React',       icon: 'FaReact',      color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js',     icon: 'SiNextdotjs',  color: '#ffffff', category: 'Frontend' },
  { name: 'Tailwind CSS',icon: 'SiTailwindcss',color: '#06B6D4', category: 'Frontend' },
  { name: 'Node.js',     icon: 'FaNodeJs',     color: '#339933', category: 'Backend' },
  { name: 'Express',     icon: 'SiExpress',    color: '#ffffff', category: 'Backend' },
  { name: 'PHP',         icon: 'FaPhp',        color: '#777BB4', category: 'Backend' },
  { name: 'Python',      icon: 'FaPython',     color: '#3776AB', category: 'Backend' },
  { name: 'Java',        icon: 'FaJava',       color: '#007396', category: 'Backend' },
  { name: 'MongoDB',     icon: 'SiMongodb',    color: '#47A248', category: 'Database' },
  { name: 'PostgreSQL',  icon: 'SiPostgresql', color: '#4169E1', category: 'Database' },
  { name: 'MySQL',       icon: 'SiMysql',      color: '#4479A1', category: 'Database' },
  { name: 'C++',         icon: 'SiCplusplus',  color: '#00599C', category: 'Languages' },
  { name: 'Git',         icon: 'FaGitAlt',     color: '#F05032', category: 'Tools' },
  { name: 'Docker',      icon: 'FaDocker',     color: '#2496ED', category: 'Tools' },
  { name: 'VS Code',     icon: 'VscCode',      color: '#007ACC', category: 'Tools' },
  { name: 'AWS',         icon: 'FaAws',        color: '#FF9900', category: 'Tools' },
  { name: 'GitHub',      icon: 'SiGithub',     color: '#ffffff', category: 'Tools' },
  { name: 'Vercel',      icon: 'SiVercel',     color: '#ffffff', category: 'Deployment' },
  { name: 'Netlify',     icon: 'SiNetlify',    color: '#00C7B7', category: 'Deployment' },
  { name: 'Render',      icon: 'SiRender',     color: '#46E3B7', category: 'Deployment' },
]

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [skills, setSkills] = useState<any[]>(fallbackSkills)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/skills`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length) setSkills(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const grouped = skills.reduce((acc: any, s: any) => {
    ;(acc[s.category] = acc[s.category] || []).push(s)
    return acc
  }, {})

  return (
    <section id="skills" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-skills" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="40" height="40" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-skills)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-500" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Technical Skills
          </h2>

          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="h-5 w-32 bg-light-card dark:bg-dark-card rounded" />
                  <div className="flex flex-wrap gap-3">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-9 w-24 bg-light-card dark:bg-dark-card rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {Object.keys(grouped).map((category, ci) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: ci * 0.15 }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {grouped[category].map((skill: any, si: number) => {
                      const Icon = iconMap[skill.icon] || BiCodeAlt
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: ci * 0.15 + si * 0.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full shadow-sm hover:border-orange-500 hover:shadow-md transition-all group"
                        >
                          <Icon size={16} style={{ color: skill.color }} />
                          <span className="text-sm font-medium text-light-text dark:text-dark-text group-hover:text-orange-500 transition-colors">
                            {skill.name}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
