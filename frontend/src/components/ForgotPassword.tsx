import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi'

interface ForgotPasswordProps {
  onBack: () => void
}

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setStep(2)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setTimeout(() => onBack(), 2000)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-md w-full bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8"
    >
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 mb-6"
      >
        <FiArrowLeft />
        <span>Back to Login</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">
          {step === 1 ? 'Enter your email to receive OTP' : 'Enter OTP and new password'}
        </p>
      </div>

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

      {step === 1 ? (
        <form onSubmit={handleSendOTP} className="space-y-6">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
              OTP Code
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
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
              Confirm Password
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </motion.div>
  )
}

export default ForgotPassword
