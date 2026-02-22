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
      name: 'Dr. Fasil Menbere',
      position: 'Pediatric Specialist, CEO & Founder at BiruhKids Pediatric Speciality',
      message: 'Elyas delivered an exceptional healthcare platform for our clinic. His technical expertise and understanding of our needs resulted in a comprehensive system that has transformed how we serve our patients.',
      rating: 5,
      avatar: 'FM',
      photo: ''
    },
    {
      name: 'Mulugeta D.',
      position: 'Real Estate Sales Consultant at Ghion Homes',
      message: 'Working with Elyas was a great experience. He created a professional and sleek website that perfectly showcases our property listings and has significantly improved our client interactions.',
      rating: 5,
      avatar: 'MD',
      photo: ''
    },
    {
      name: 'Yenealem A.',
      position: 'Founder & CEO at Bluelight Academy',
      message: 'Elyas built an outstanding school management system for our academy. His dedication and technical skills resulted in a comprehensive platform that streamlined our entire administrative process.',
      rating: 5,
      avatar: 'YA',
      photo: ''
    },
  ]

  const TestimonialCard = ({ testimonial, index }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      className="bg-light-card dark:bg-dark-card p-6 md:p-8 rounded-xl shadow-lg h-[400px] md:h-[380px] flex flex-col items-center"
    >
      {testimonial.photo ? (
        <img 
          src={testimonial.photo} 
          alt={testimonial.name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-4"
        />
      ) : (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl md:text-2xl mb-4">
          {testimonial.avatar}
        </div>
      )}
      
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FiStar key={i} className="text-orange-500 fill-orange-500" size={16} />
        ))}
      </div>
      
      <p className="text-sm md:text-base text-light-textSecondary dark:text-dark-textSecondary italic leading-relaxed text-center flex-1 overflow-y-auto mb-4">
        "{testimonial.message}"
      </p>

      <div className="text-center">
        <h3 className="font-bold text-base md:text-lg text-light-text dark:text-dark-text">{testimonial.name}</h3>
        <p className="text-xs md:text-sm text-light-textSecondary dark:text-dark-textSecondary">{testimonial.position}</p>
      </div>
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
