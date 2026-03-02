import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiLogOut, FiUser, FiMail, FiMessageSquare, FiHome, FiSettings, FiFileText } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

interface DashboardProps {
  onLogout: () => void
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])

  const [stats, setStats] = useState({
    totalContacts: 0,
    unreadMessages: 0
  })

  useEffect(() => {
    // Verify token and get user info
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Token verification failed')
      })
      .then(data => {
        if (data.user) {
          setUser(data.user)
        } else {
          onLogout()
        }
      })
      .catch(() => onLogout())
    }

    // Mock data for demonstration
    setContacts([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Interested in your web development services',
        date: '2024-01-15',
        read: false
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Would like to discuss a project collaboration',
        date: '2024-01-14',
        read: true
      }
    ])

    setStats({
      totalContacts: 25,
      unreadMessages: 3
    })


  }, [onLogout])



  const handleLogout = () => {
    localStorage.removeItem('token')
    onLogout()
  }

  if (!user) {
    return <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
      <div className="text-orange-500">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-light-card dark:bg-dark-card shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-4 sm:py-0">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2 sm:mb-0">Dashboard</h1>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-light-text dark:text-dark-text text-sm sm:text-base">{user.email}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-1 px-3 py-2 bg-light-card dark:bg-dark-card hover:bg-light-cardHover dark:hover:bg-dark-cardHover text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg transition-colors text-sm"
                >
                  <FiHome size={14} />
                  <span className="hidden sm:inline">Home</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-2">
                <FiFileText className="text-green-500" size={20} />
              </div>
              <span className="text-sm font-medium text-light-text dark:text-dark-text">Projects</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-2">
                <FiSettings className="text-orange-500" size={20} />
              </div>
              <span className="text-sm font-medium text-light-text dark:text-dark-text">Settings</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-card dark:bg-dark-card p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs sm:text-sm">Total Contacts</p>
                <p className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text">{stats.totalContacts}</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <FiUser className="text-orange-500" size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-light-card dark:bg-dark-card p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs sm:text-sm">Unread Messages</p>
                <p className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text">{stats.unreadMessages}</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <FiMessageSquare className="text-orange-500" size={20} />
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
            {contacts.map((contact: any) => (
              <div
                key={contact.id}
                className={`p-3 sm:p-4 rounded-lg border-l-4 ${
                  contact.read 
                    ? 'border-gray-300 bg-light-cardHover dark:bg-dark-cardHover' 
                    : 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="font-semibold text-light-text dark:text-dark-text text-sm sm:text-base">{contact.name}</h3>
                  <span className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">{contact.date}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <FiMail size={12} className="text-light-textSecondary dark:text-dark-textSecondary" />
                  <span className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">{contact.email}</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs sm:text-sm">{contact.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>


    </div>
  )
}

export default Dashboard