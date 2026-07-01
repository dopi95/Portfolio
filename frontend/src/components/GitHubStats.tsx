import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiGitCommit } from 'react-icons/fi'
import { API_BASE_URL } from '../config'

const GitHubStats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    totalCommits: 0,
    currentStreak: 0,
    longestStreak: 0
  })

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/github/stats`)
        if (!response.ok) return
        const data = await response.json()
        setStats({
          repos: data.repos,
          followers: data.followers,
          following: 0,
          totalStars: data.totalStars,
          totalCommits: data.totalCommits,
          currentStreak: 0,
          longestStreak: 0
        })
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-xl"
    >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="bg-light-cardHover dark:bg-dark-cardHover p-4 rounded-xl text-center"
          >
            <FiGitBranch className="text-orange-500 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.repos}</p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Repositories</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-light-cardHover dark:bg-dark-cardHover p-4 rounded-xl text-center"
          >
            <FiUsers className="text-orange-500 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.followers}</p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Followers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="bg-light-cardHover dark:bg-dark-cardHover p-4 rounded-xl text-center"
          >
            <FiStar className="text-orange-500 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalStars}</p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Total Stars</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="bg-light-cardHover dark:bg-dark-cardHover p-4 rounded-xl text-center"
          >
            <FiGitCommit className="text-orange-500 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalCommits}+</p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Recent Commits</p>
          </motion.div>
        </div>

        {/* Contribution Streak */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4 text-center">Contribution Streak</h3>
          <div className="flex justify-center">
            <img 
              src="https://streak-stats.demolab.com?user=dopi95&theme=radical&hide_border=true&background=151b35&ring=f97316&fire=f97316&currStreakLabel=f97316&sideLabels=f97316&dates=e2e8f0&currStreakNum=e2e8f0&sideNums=e2e8f0"
              alt="GitHub Streak Stats"
              className="rounded-lg"
            />
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.a
            href="https://github.com/dopi95"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all transform hover:scale-105 font-semibold text-sm"
          >
            <FiGithub size={20} />
            <span>View GitHub Profile</span>
          </motion.a>
        </div>
    </motion.div>
  )
}

export default GitHubStats
