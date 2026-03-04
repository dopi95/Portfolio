import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiLogOut, FiUser, FiMail, FiMessageSquare, FiHome, FiSettings, FiFileText, FiStar } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import Contacts from './Contacts'
import ContentManager from './ContentManager'
import TestimonialManager from './TestimonialManager'

interface DashboardProps {
  onLogout: () => void
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    totalContacts: 0,
    unreadMessages: 0,
    totalProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [onLogout])

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      onLogout()
      return
    }

    try {
      // Fetch user profile
      const profileRes = await fetch('http://localhost:5000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (profileRes.ok) {
        const profileData = await profileRes.json()
        setUser(profileData)
      } else {
        onLogout()
        return
      }

      // Fetch contacts
      const contactsRes = await fetch('http://localhost:5000/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(contactsData.slice(0, 5))
        const unreadCount = contactsData.filter((c: any) => !c.read).length

        // Fetch projects
        const projectsRes = await fetch('http://localhost:5000/api/projects')
        const projectsData = projectsRes.ok ? await projectsRes.json() : []

        // Fetch skills
        const skillsRes = await fetch('http://localhost:5000/api/skills')
        const skillsData = skillsRes.ok ? await skillsRes.json() : []

        // Fetch experiences
        const experiencesRes = await fetch('http://localhost:5000/api/experiences')
        const experiencesData = experiencesRes.ok ? await experiencesRes.json() : []

        // Fetch testimonials
        const testimonialsRes = await fetch('http://localhost:5000/api/testimonials/admin/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const testimonialsData = testimonialsRes.ok ? await testimonialsRes.json() : []
        const pendingCount = testimonialsData.filter((t: any) => t.status === 'pending').length
        
        setStats({
          totalContacts: contactsData.length,
          unreadMessages: unreadCount,
          totalProjects: projectsData.length,
          totalSkills: skillsData.length,
          totalExperiences: experiencesData.length,
          totalTestimonials: testimonialsData.length,
          pendingTestimonials: pendingCount
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }



  const handleLogout = () => {
    localStorage.removeItem('token')
    onLogout()
  }

  if (!user || loading) {
    return <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
      <div className="text-orange-500">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-light-card dark:bg-dark-card shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 py-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-lg sm:text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-right">
                {user.name && (
                  <p className="text-light-text dark:text-dark-text text-sm font-semibold">{user.name}</p>
                )}
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-1 px-2 sm:px-3 py-2 bg-light-card dark:bg-dark-card hover:bg-light-cardHover dark:hover:bg-dark-cardHover text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg transition-colors text-sm"
                >
                  <FiHome size={14} />
                  <span className="hidden sm:inline">Home</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-2 sm:px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
                >
                  <FiLogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
        {activeTab === 'dashboard' ? (
          <>
        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('contacts')}
              className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2">
                <FiUser className="text-blue-500" size={20} />
              </div>
              <span className="text-sm font-medium text-light-text dark:text-dark-text">Contacts</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('content')}
              className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-2">
                <FiFileText className="text-green-500" size={20} />
              </div>
              <span className="text-sm font-medium text-light-text dark:text-dark-text">Content</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('testimonials')}
              className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-2">
                <FiStar className="text-purple-500" size={20} />
              </div>
              <span className="text-sm font-medium text-light-text dark:text-dark-text">Testimonials</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('profile')}
              className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-2">
                <FiSettings className="text-orange-500" size={20} />
              </div>
              <span className="text-sm font-medium text-light-text dark:text-dark-text">Profile</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Total Contacts</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalContacts}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FiUser className="text-blue-500" size={18} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Unread Messages</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.unreadMessages}</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <FiMessageSquare className="text-orange-500" size={18} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Total Projects</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalProjects}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FiFileText className="text-green-500" size={18} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Total Skills</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalSkills}</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FiStar className="text-purple-500" size={18} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Experiences</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalExperiences}</p>
              </div>
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <FiFileText className="text-indigo-500" size={18} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Testimonials</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.totalTestimonials}</p>
              </div>
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                <FiStar className="text-pink-500" size={18} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs">Pending Reviews</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{stats.pendingTestimonials}</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <FiMessageSquare className="text-yellow-500" size={18} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text mb-4 sm:mb-6">Recent Contacts</h2>
          <div className="space-y-3 sm:space-y-4">
            {contacts.length === 0 ? (
              <p className="text-center text-light-textSecondary dark:text-dark-textSecondary py-8">No contacts yet</p>
            ) : (
              contacts.map((contact: any) => (
              <div
                key={contact._id}
                className={`p-3 sm:p-4 rounded-lg border-l-4 ${
                  contact.read 
                    ? 'border-gray-300 bg-light-cardHover dark:bg-dark-cardHover' 
                    : 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="font-semibold text-light-text dark:text-dark-text text-sm sm:text-base">{contact.name}</h3>
                  <span className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <FiMail size={12} className="text-light-textSecondary dark:text-dark-textSecondary" />
                  <span className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">{contact.email}</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs sm:text-sm">{contact.message}</p>
              </div>
              ))
            )}
          </div>
        </motion.div>
          </>
        ) : activeTab === 'profile' ? (
          <Profile />
        ) : activeTab === 'contacts' ? (
          <Contacts />
        ) : activeTab === 'content' ? (
          <ContentManager />
        ) : (
          <TestimonialManager />
        )}
      </main>


    </div>
  )
}

export default Dashboard