import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiArrowUp, FiPhone, FiSend } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { icon: FiGithub, link: 'https://github.com/dopi95/', label: 'GitHub' },
    { icon: FiLinkedin, link: 'https://www.linkedin.com/in/elyas-yenealem-01572b359', label: 'LinkedIn' },
    { icon: FiInstagram, link: 'https://www.instagram.com/el_yas_21/', label: 'Instagram' },
    { icon: FiSend, link: 'https://t.me/elaras21', label: 'Telegram' }
  ]

  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Elyas Yenealem
            </h3>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
              Full Stack Developer passionate about creating modern web applications and turning ideas into reality.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-light-text dark:text-dark-text">Available for freelance</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">Connect</h4>
            <div className="space-y-3 mb-4">
              <a
                href="mailto:elyasyenealem@gmail.com"
                className="flex items-center space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 transition-colors"
              >
                <FiMail size={16} />
                <span>elyasyenealem@gmail.com</span>
              </a>
              <a
                href="tel:+251978210810"
                className="flex items-center space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-orange-500 transition-colors"
              >
                <FiPhone size={16} />
                <span>+251 978 210 810</span>
              </a>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-light-cardHover dark:bg-dark-cardHover rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110"
                  title={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border flex flex-col items-center space-y-4">
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary text-center">
            © 2024 Elyas Yenealem. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all transform hover:scale-110 shadow-lg"
            title="Back to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
