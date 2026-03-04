import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiHome } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'

interface LoginProps {
  onLogin: (token: string) => void
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate()
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        onLogin(data.token)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4">
      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Admin Login</h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Access your portfolio dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
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
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                placeholder="Enter your password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-light-card dark:bg-dark-card hover:bg-light-cardHover dark:hover:bg-dark-cardHover text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-colors"
          >
            <FiHome size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </motion.div>
      )}
    </div>
  )
}

export default Login