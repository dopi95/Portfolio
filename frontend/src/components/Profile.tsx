import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiSave, FiX } from 'react-icons/fi'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [passwordMode, setPasswordMode] = useState(false)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data)
        setName(data.name || '')
        setEmail(data.email)
      }
    } catch (error) {
      setError('Error loading profile')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setMessage('Profile updated successfully')
        setEditMode(false)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Error updating profile')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Password changed successfully')
        setPasswordMode(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Error changing password')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-orange-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg p-4 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">My Profile</h2>

        {message && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Profile Info */}
        {!editMode && !passwordMode && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text">
                  {user?.name || 'Admin User'}
                </h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-semibold">
                  {user?.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-light-border dark:border-dark-border">
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                <FiUser size={18} />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setPasswordMode(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-light-cardHover dark:bg-dark-cardHover hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-colors"
              >
                <FiLock size={18} />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        )}

        {/* Edit Profile Form */}
        {editMode && (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                <FiSave size={18} />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false)
                  setName(user?.name || '')
                  setEmail(user?.email)
                  setError('')
                }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-light-cardHover dark:bg-dark-cardHover hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-colors"
              >
                <FiX size={18} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}

        {/* Change Password Form */}
        {passwordMode && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Current Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                <FiSave size={18} />
                <span>Change Password</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasswordMode(false)
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setError('')
                }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-light-cardHover dark:bg-dark-cardHover hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-colors"
              >
                <FiX size={18} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default Profile
