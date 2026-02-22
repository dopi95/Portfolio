import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Message sent! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'elyas@example.com', link: 'mailto:elyas@example.com' },
    { icon: FiPhone, label: 'Phone', value: '+1 234 567 8900', link: 'tel:+12345678900' },
    { icon: FiMapPin, label: 'Location', value: 'Your City, Country', link: '#' }
  ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">Let's work together</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 bg-light-cardHover dark:bg-dark-cardHover rounded-lg hover:shadow-lg transition-all border border-light-border dark:border-dark-border"
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <info.icon className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{info.label}</p>
                      <p className="font-semibold text-light-text dark:text-dark-text">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500 text-light-text dark:text-dark-text"
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
                  className="w-full px-4 py-3 rounded-lg bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500 text-light-text dark:text-dark-text"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-light-text dark:text-dark-text">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500 text-light-text dark:text-dark-text"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2 font-semibold"
              >
                <span>Send Message</span>
                <FiSend />
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
