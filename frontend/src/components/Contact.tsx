import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiInstagram, FiCheckCircle } from 'react-icons/fi'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const BOT_TOKEN = '7622120987:AAECTaQR0ZoWfOAxLbW6SeKtWJjeiuf2Afk'
    const CHAT_ID = '2120123278'
    const text = `🔔 New Contact Form Submission\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n💬 Message:\n${formData.message}`

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setShowSuccess(false), 4000)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      alert('Error sending message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { 
      icon: FiMail, 
      label: 'Email', 
      value: 'elyasyenealem@gmail.com', 
      link: 'mailto:elyasyenealem@gmail.com',
      color: 'text-red-500'
    },
    { 
      icon: FiPhone, 
      label: 'Phone', 
      value: '+251 978 210 810', 
      link: 'tel:+251978210810',
      color: 'text-green-500'
    },
    { 
      icon: FiMapPin, 
      label: 'Location', 
      value: 'Addis Ababa, Ethiopia', 
      link: '#',
      color: 'text-blue-500'
    }
  ]

  const socialLinks = [
    { icon: FiGithub, link: 'https://github.com/dopi95/', label: 'GitHub' },
    { icon: FiLinkedin, link: 'https://www.linkedin.com/in/elyas-yenealem-01572b359', label: 'LinkedIn' },
    { icon: FiInstagram, link: 'https://www.instagram.com/el_yas_21/', label: 'Instagram' }
  ]

  return (
    <section id="contact" className="py-16 px-4 bg-light-cardHover dark:bg-dark-cardHover">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Success Alert */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 sm:w-[90%] sm:max-w-md mx-auto"
              >
                <div className="bg-white dark:bg-dark-card border-2 border-green-500 rounded-xl shadow-2xl p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="text-white text-xl sm:text-2xl" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-black dark:text-white mb-1">Message Sent Successfully!</h3>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-light-cardHover dark:bg-dark-cardHover inline-block px-8 py-2 rounded-lg mb-12 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Get In Touch
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-4 md:order-2"
            >
              <div>
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#ffffff] dark:bg-[#1a1f3a] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white placeholder:text-gray-500"
                  style={{ colorScheme: 'light' }}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#ffffff] dark:bg-[#1a1f3a] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white placeholder:text-gray-500"
                  style={{ colorScheme: 'light' }}
                  placeholder="youremail@gmail.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[#ffffff] dark:bg-[#1a1f3a] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white placeholder:text-gray-500 resize-none"
                  style={{ colorScheme: 'light' }}
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <FiSend />
              </button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="md:order-1"
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text">
                    Let's Work Together
                  </h3>
                  <a
                    href="https://t.me/elaras21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all transform hover:scale-110 shadow-lg"
                    title="Message on Telegram"
                  >
                    <FiSend size={18} />
                  </a>
                </div>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-3">
                  I'm currently available for freelance opportunities and always excited to work on interesting projects.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-light-text dark:text-dark-text">Available for new projects</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-all group"
                  >
                    <div className={`p-3 bg-light-cardHover dark:bg-dark-cardHover rounded-lg group-hover:scale-110 transition-transform ${info.color}`}>
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">{info.label}</p>
                      <p className="font-semibold text-sm text-light-text dark:text-dark-text">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm font-semibold mb-3 text-light-text dark:text-dark-text">Follow me on:</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-light-card dark:bg-dark-card rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110 shadow-md"
                      title={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
