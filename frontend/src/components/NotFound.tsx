import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-orange-500 mb-4">404</h1>
          
          {/* Animated illustration */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative mx-auto w-64 h-64 mb-8"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Computer screen */}
              <rect x="40" y="60" width="120" height="80" rx="8" fill="currentColor" className="text-light-card dark:text-dark-card" stroke="currentColor" strokeWidth="2"/>
              <rect x="45" y="65" width="110" height="60" fill="currentColor" className="text-light-cardHover dark:text-dark-cardHover"/>
              
              {/* Screen content - broken page */}
              <text x="100" y="90" textAnchor="middle" fontSize="12" fill="currentColor" className="text-orange-500 font-bold">ERROR</text>
              <line x1="55" y1="100" x2="85" y2="100" stroke="currentColor" strokeWidth="2" className="text-light-textSecondary dark:text-dark-textSecondary"/>
              <line x1="115" y1="100" x2="145" y2="100" stroke="currentColor" strokeWidth="2" className="text-light-textSecondary dark:text-dark-textSecondary"/>
              <line x1="55" y1="110" x2="75" y2="110" stroke="currentColor" strokeWidth="2" className="text-light-textSecondary dark:text-dark-textSecondary"/>
              
              {/* Computer base */}
              <rect x="85" y="140" width="30" height="15" fill="currentColor" className="text-light-card dark:text-dark-card"/>
              <rect x="70" y="155" width="60" height="8" rx="4" fill="currentColor" className="text-light-card dark:text-dark-card"/>
              
              {/* Floating elements */}
              <motion.circle
                cx="30"
                cy="40"
                r="4"
                fill="currentColor"
                className="text-orange-500"
                animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.circle
                cx="170"
                cy="50"
                r="3"
                fill="currentColor"
                className="text-orange-400"
                animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle
                cx="20"
                cy="120"
                r="2"
                fill="currentColor"
                className="text-orange-300"
                animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Don't worry, let's get you back on track!
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <FiHome size={20} />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-light-card dark:bg-dark-card hover:bg-light-cardHover dark:hover:bg-dark-cardHover text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            <FiArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full opacity-60"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-3 h-3 bg-orange-400 rounded-full opacity-40"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
      </div>
    </div>
  )
}

export default NotFound