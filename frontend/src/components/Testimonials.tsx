import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiStar } from 'react-icons/fi'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO, Tech Startup',
      content: 'Elyas is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills are outstanding.',
      rating: 5,
      avatar: '👨💼'
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      content: 'Working with Elyas was a pleasure. He understood our requirements perfectly and created a beautiful, functional application.',
      rating: 5,
      avatar: '👩💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, Digital Agency',
      content: 'Highly skilled full-stack developer with excellent communication. Elyas brought innovative solutions to complex challenges.',
      rating: 5,
      avatar: '👨💻'
    },
    {
      name: 'Emily Davis',
      role: 'Startup Founder',
      content: 'Elyas transformed our vision into reality. His expertise in modern web technologies is impressive and his work ethic is commendable.',
      rating: 5,
      avatar: '👩🚀'
    }
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-light-cardHover dark:bg-dark-cardHover">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Testimonials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-light-border dark:border-dark-border"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{testimonial.name}</h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-500 fill-yellow-500" size={18} />
                  ))}
                </div>
                
                <p className="text-light-textSecondary dark:text-dark-textSecondary italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
