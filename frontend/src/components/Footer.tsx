import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-light-cardHover dark:bg-dark-cardHover py-8 px-4 border-t border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-light-textSecondary dark:text-dark-textSecondary flex items-center justify-center md:justify-start space-x-1">
              <span>Made with</span>
              <FiHeart className="text-red-500 fill-red-500" />
              <span>by Elyas Yenealem</span>
            </p>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/elyasyenealem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/elyasyenealem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiLinkedin size={20} />
            </a>
            <a 
              href="mailto:elyas@example.com"
              className="p-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
