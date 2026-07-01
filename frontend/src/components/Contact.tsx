import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiInstagram, FiCheckCircle } from 'react-icons/fi'
import { API_BASE_URL } from '../config'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [countryOpen, setCountryOpen] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', countryCode: '+251', countryIso: 'et', message: '' })

  const countryCodes = [
    { code: '+251', iso: 'et', name: 'Ethiopia' },
    { code: '+1', iso: 'us', name: 'United States' },
    { code: '+1', iso: 'ca', name: 'Canada' },
    { code: '+44', iso: 'gb', name: 'United Kingdom' },
    { code: '+49', iso: 'de', name: 'Germany' },
    { code: '+33', iso: 'fr', name: 'France' },
    { code: '+39', iso: 'it', name: 'Italy' },
    { code: '+34', iso: 'es', name: 'Spain' },
    { code: '+31', iso: 'nl', name: 'Netherlands' },
    { code: '+46', iso: 'se', name: 'Sweden' },
    { code: '+47', iso: 'no', name: 'Norway' },
    { code: '+45', iso: 'dk', name: 'Denmark' },
    { code: '+358', iso: 'fi', name: 'Finland' },
    { code: '+41', iso: 'ch', name: 'Switzerland' },
    { code: '+43', iso: 'at', name: 'Austria' },
    { code: '+32', iso: 'be', name: 'Belgium' },
    { code: '+351', iso: 'pt', name: 'Portugal' },
    { code: '+30', iso: 'gr', name: 'Greece' },
    { code: '+48', iso: 'pl', name: 'Poland' },
    { code: '+420', iso: 'cz', name: 'Czech Republic' },
    { code: '+36', iso: 'hu', name: 'Hungary' },
    { code: '+40', iso: 'ro', name: 'Romania' },
    { code: '+7', iso: 'ru', name: 'Russia' },
    { code: '+380', iso: 'ua', name: 'Ukraine' },
    { code: '+90', iso: 'tr', name: 'Turkey' },
    { code: '+972', iso: 'il', name: 'Israel' },
    { code: '+971', iso: 'ae', name: 'UAE' },
    { code: '+966', iso: 'sa', name: 'Saudi Arabia' },
    { code: '+974', iso: 'qa', name: 'Qatar' },
    { code: '+965', iso: 'kw', name: 'Kuwait' },
    { code: '+973', iso: 'bh', name: 'Bahrain' },
    { code: '+968', iso: 'om', name: 'Oman' },
    { code: '+962', iso: 'jo', name: 'Jordan' },
    { code: '+961', iso: 'lb', name: 'Lebanon' },
    { code: '+20', iso: 'eg', name: 'Egypt' },
    { code: '+212', iso: 'ma', name: 'Morocco' },
    { code: '+216', iso: 'tn', name: 'Tunisia' },
    { code: '+213', iso: 'dz', name: 'Algeria' },
    { code: '+218', iso: 'ly', name: 'Libya' },
    { code: '+249', iso: 'sd', name: 'Sudan' },
    { code: '+234', iso: 'ng', name: 'Nigeria' },
    { code: '+27', iso: 'za', name: 'South Africa' },
    { code: '+254', iso: 'ke', name: 'Kenya' },
    { code: '+233', iso: 'gh', name: 'Ghana' },
    { code: '+255', iso: 'tz', name: 'Tanzania' },
    { code: '+256', iso: 'ug', name: 'Uganda' },
    { code: '+250', iso: 'rw', name: 'Rwanda' },
    { code: '+252', iso: 'so', name: 'Somalia' },
    { code: '+253', iso: 'dj', name: 'Djibouti' },
    { code: '+291', iso: 'er', name: 'Eritrea' },
    { code: '+211', iso: 'ss', name: 'South Sudan' },
    { code: '+237', iso: 'cm', name: 'Cameroon' },
    { code: '+225', iso: 'ci', name: 'Ivory Coast' },
    { code: '+221', iso: 'sn', name: 'Senegal' },
    { code: '+223', iso: 'ml', name: 'Mali' },
    { code: '+226', iso: 'bf', name: 'Burkina Faso' },
    { code: '+227', iso: 'ne', name: 'Niger' },
    { code: '+228', iso: 'tg', name: 'Togo' },
    { code: '+229', iso: 'bj', name: 'Benin' },
    { code: '+240', iso: 'gq', name: 'Equatorial Guinea' },
    { code: '+241', iso: 'ga', name: 'Gabon' },
    { code: '+242', iso: 'cg', name: 'Congo' },
    { code: '+243', iso: 'cd', name: 'DR Congo' },
    { code: '+244', iso: 'ao', name: 'Angola' },
    { code: '+245', iso: 'gw', name: 'Guinea-Bissau' },
    { code: '+246', iso: 'io', name: 'British Indian Ocean' },
    { code: '+258', iso: 'mz', name: 'Mozambique' },
    { code: '+260', iso: 'zm', name: 'Zambia' },
    { code: '+261', iso: 'mg', name: 'Madagascar' },
    { code: '+263', iso: 'zw', name: 'Zimbabwe' },
    { code: '+264', iso: 'na', name: 'Namibia' },
    { code: '+265', iso: 'mw', name: 'Malawi' },
    { code: '+266', iso: 'ls', name: 'Lesotho' },
    { code: '+267', iso: 'bw', name: 'Botswana' },
    { code: '+268', iso: 'sz', name: 'Eswatini' },
    { code: '+91', iso: 'in', name: 'India' },
    { code: '+92', iso: 'pk', name: 'Pakistan' },
    { code: '+880', iso: 'bd', name: 'Bangladesh' },
    { code: '+94', iso: 'lk', name: 'Sri Lanka' },
    { code: '+977', iso: 'np', name: 'Nepal' },
    { code: '+86', iso: 'cn', name: 'China' },
    { code: '+81', iso: 'jp', name: 'Japan' },
    { code: '+82', iso: 'kr', name: 'South Korea' },
    { code: '+66', iso: 'th', name: 'Thailand' },
    { code: '+84', iso: 'vn', name: 'Vietnam' },
    { code: '+62', iso: 'id', name: 'Indonesia' },
    { code: '+60', iso: 'my', name: 'Malaysia' },
    { code: '+63', iso: 'ph', name: 'Philippines' },
    { code: '+65', iso: 'sg', name: 'Singapore' },
    { code: '+95', iso: 'mm', name: 'Myanmar' },
    { code: '+855', iso: 'kh', name: 'Cambodia' },
    { code: '+856', iso: 'la', name: 'Laos' },
    { code: '+673', iso: 'bn', name: 'Brunei' },
    { code: '+61', iso: 'au', name: 'Australia' },
    { code: '+64', iso: 'nz', name: 'New Zealand' },
    { code: '+675', iso: 'pg', name: 'Papua New Guinea' },
    { code: '+55', iso: 'br', name: 'Brazil' },
    { code: '+52', iso: 'mx', name: 'Mexico' },
    { code: '+54', iso: 'ar', name: 'Argentina' },
    { code: '+57', iso: 'co', name: 'Colombia' },
    { code: '+56', iso: 'cl', name: 'Chile' },
    { code: '+51', iso: 'pe', name: 'Peru' },
    { code: '+58', iso: 've', name: 'Venezuela' },
    { code: '+593', iso: 'ec', name: 'Ecuador' },
    { code: '+591', iso: 'bo', name: 'Bolivia' },
    { code: '+595', iso: 'py', name: 'Paraguay' },
    { code: '+598', iso: 'uy', name: 'Uruguay' },
    { code: '+53', iso: 'cu', name: 'Cuba' },
    { code: '+1', iso: 'jm', name: 'Jamaica' },
    { code: '+1', iso: 'tt', name: 'Trinidad & Tobago' },
    { code: '+509', iso: 'ht', name: 'Haiti' },
    { code: '+502', iso: 'gt', name: 'Guatemala' },
    { code: '+503', iso: 'sv', name: 'El Salvador' },
    { code: '+504', iso: 'hn', name: 'Honduras' },
    { code: '+505', iso: 'ni', name: 'Nicaragua' },
    { code: '+506', iso: 'cr', name: 'Costa Rica' },
    { code: '+507', iso: 'pa', name: 'Panama' },
  ]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone ? formData.countryCode + formData.phone : '', message: formData.message })
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', phone: '', countryCode: '+251', countryIso: 'et', message: '' })
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
      value: 'elyasyenealem@awratech.com', 
      link: 'mailto:elyasyenealem@awratech.com',
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
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">
                  Name <span className="text-red-500">*</span>
                </label>
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
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">
                  Email <span className="text-red-500">*</span>
                </label>
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
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-[#ffffff] dark:bg-[#1a1f3a] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white min-w-[90px] hover:border-orange-400 transition-colors"
                    >
                      <span className={`fi fi-${formData.countryIso} text-base rounded-sm`} style={{ width: 20, height: 15, display: 'inline-block' }} />
                      <span className="text-sm font-medium">{formData.countryCode}</span>
                      <svg className={`w-3 h-3 text-gray-400 transition-transform ${countryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {countryOpen && (
                      <div className="absolute z-50 top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl">
                        {countryCodes.map((country, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => { setPhoneError(''); setFormData({ ...formData, countryCode: country.code, countryIso: country.iso, phone: '' }); setCountryOpen(false) }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors ${
                              formData.countryIso === country.iso ? 'bg-orange-50 dark:bg-orange-900/20' : ''
                            }`}
                          >
                            <span className={`fi fi-${country.iso} rounded-sm flex-shrink-0`} style={{ width: 22, height: 16, display: 'inline-block' }} />
                            <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{country.name}</span>
                            <span className="text-sm font-semibold text-orange-500">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/[^0-9]/g, '')
                      if (formData.countryIso === 'et') {
                        if (digits.length >= 1 && digits[0] !== '9' && digits[0] !== '7') {
                          setPhoneError('Phone number must start with 7 or 9')
                          return
                        }
                        if (digits.length > 9) {
                          setPhoneError('Phone number must be exactly 9 digits')
                          return
                        }
                        setPhoneError('')
                        setFormData({ ...formData, phone: digits })
                      } else {
                        setPhoneError('')
                        setFormData({ ...formData, phone: digits })
                      }
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg bg-[#ffffff] dark:bg-[#1a1f3a] border focus:outline-none focus:ring-2 text-gray-900 dark:text-white placeholder:text-gray-500 transition-colors ${
                      phoneError
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-orange-500'
                    }`}
                    style={{ colorScheme: 'light' }}
                    placeholder={formData.countryIso === 'et' ? '9XX XXX XXX' : 'Phone number'}
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-xs text-red-500">{phoneError}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">
                  Message <span className="text-red-500">*</span>
                </label>
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
