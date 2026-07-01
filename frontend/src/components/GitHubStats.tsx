import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiGithub, FiStar, FiGitBranch, FiUsers } from 'react-icons/fi'

const GITHUB_USERNAME = 'dopi95'
const FALLBACK = { repos: 52, followers: 13, totalStars: 0 }

const GitHubStats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [stats, setStats] = useState(FALLBACK)

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: { 'User-Agent': 'portfolio' } }).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, { headers: { 'User-Agent': 'portfolio' } }).then(r => r.json()),
    ]).then(([user, repos]) => {
      if (user.public_repos) {
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
          : 0
        setStats({ repos: user.public_repos, followers: user.followers, totalStars })
      }
    }).catch(() => {})
  }, [])

  const statCards = [
    { icon: FiGitBranch, value: stats.repos, label: 'Repositories' },
    { icon: FiUsers, value: stats.followers, label: 'Followers' },
    { icon: FiStar, value: stats.totalStars, label: 'Total Stars' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="max-w-4xl mx-auto bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-xl"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-light-cardHover dark:bg-dark-cardHover p-4 rounded-xl text-center"
          >
            <s.icon className="text-orange-500 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{s.value}</p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Contribution Streak */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-base font-bold text-light-text dark:text-dark-text mb-3 text-center">Contribution Streak</h3>
        <div className="flex justify-center">
          <img
            src={`https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=radical&hide_border=true&background=151b35&ring=f97316&fire=f97316&currStreakLabel=f97316&sideLabels=f97316&dates=e2e8f0&currStreakNum=e2e8f0&sideNums=e2e8f0`}
            alt="GitHub Streak Stats"
            className="rounded-lg max-w-full h-auto"
            style={{ maxHeight: 200 }}
          />
        </div>
      </motion.div>

      {/* Contribution Activity Calendar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <h3 className="text-base font-bold text-light-text dark:text-dark-text mb-3 text-center">Contribution Activity</h3>
        <div className="overflow-x-auto rounded-xl bg-[#0d1117] p-3">
          <img
            src={`https://ghchart.rshah.org/216e39/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Calendar"
            className="w-full h-auto rounded"
            style={{ minWidth: 600, maxWidth: '100%' }}
          />
        </div>
      </motion.div>

      {/* Button */}
      <div className="flex justify-center">
        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all transform hover:scale-105 font-semibold text-sm"
        >
          <FiGithub size={18} />
          <span>View GitHub Profile</span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default GitHubStats
