import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiStar } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const testimonials = [
    {
      name: 'John Smith',
      position: 'CEO, Tech Startup',
      message: 'Elyas is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills are outstanding.',
      rating: 5,
      avatar: 'JS',
      photo: '' // Add photo URL here if available
    },
    {
      name: 'Sarah Johnson',
      position: 'Product Manager',
      message: 'Working with Elyas was a pleasure. He understood our requirements perfectly and created a beautiful, functional application.',
      rating: 5,
      avatar: 'SJ',
      photo: ''
    },
    {
      name: 'Michael Chen',
      position: 'CTO, Digital Agency',
      message: 'Highly skilled full-stack developer with excellent communication. Elyas brought innovative solutions to complex challenges.',
      rating: 5,
      avatar: 'MC',
      photo: ''
    },
    {
      name: 'Emily Davis',
      position: 'Startup Founder',
      message: 'Elyas transformed our vision into reality. His expertise in modern web technologies is impressive and his work ethic is commendable.',
      rating: 5,
      avatar: 'ED',
      photo: ''
    }
  ]

  const TestimonialCard = ({ testimonial, index }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg h-full"
    >
      <div className="flex items-center mb-6">
        {testimonial.photo ? (
          <img 
            src={testimonial.photo} 
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl mr-4">
            {testimonial.avatar}
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{testimonial.name}</h3>
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{testimonial.position}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FiStar key={i} className="text-orange-500 fill-orange-500" size={18} />
        ))}
      </div>
      
      <p className="text-base text-light-textSecondary dark:text-dark-textSecondary italic leading-relaxed">
        "{testimonial.message}"
      </p>
    </motion.div>
  )

  return (
    <section id="testimonials" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-light-bg dark:bg-dark-bg inline-block px-8 py-2 rounded-lg mb-12 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Testimonials
            </h2>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active-custom'
              }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard testimonial={testimonial} index={0} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>

      <style>{`
        .testimonial-swiper {
          padding-bottom: 40px;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          background: #f97316;
          opacity: 0.5;
        }
        .testimonial-swiper .swiper-pagination-bullet-active-custom {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
