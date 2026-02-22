import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiX } from 'react-icons/fi'

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(true)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handler)
    
    const timer = setTimeout(() => {
      setShowPrompt(false)
    }, 20000)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('App installation is available on mobile devices or when served over HTTPS')
      return
    }
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 right-2 md:bottom-4 md:top-auto md:right-4 z-40 w-40 md:w-auto md:max-w-sm"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-2xl p-2 md:p-4 border border-orange-500">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <div className="flex items-center space-x-1 md:space-x-2">
                <div className="p-0.5 md:p-1.5 bg-orange-500 rounded">
                  <FiDownload className="text-white" size={10} />
                </div>
                <h3 className="font-bold text-[10px] md:text-sm text-light-text dark:text-dark-text">Install App</h3>
              </div>
              <button onClick={() => setShowPrompt(false)} className="p-0.5 hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded">
                <FiX size={12} />
              </button>
            </div>
            <button
              onClick={handleInstall}
              className="w-full px-1.5 py-0.5 md:px-3 md:py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold text-[10px] md:text-xs"
            >
              Install App
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InstallPrompt
