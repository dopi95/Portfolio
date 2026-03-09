import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiStar, FiX } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { API_BASE_URL } from '../config'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials`)
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error loading testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

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
              Client Testimonials
            </h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">Loading...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">No testimonials yet</div>
          ) : (
            <>
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
            </>
          )}
        </motion.div>

        {/* Share Experience Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            Share Your Experience
          </button>
        </div>
      </div>

      {showForm && <TestimonialSubmitForm onClose={() => setShowForm(false)} />}

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

const TestimonialSubmitForm = ({ onClose }: any) => {
  const [formData, setFormData] = useState<any>({ rating: 5 })
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/public`, {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev: any) => ({ ...prev, photo: data.secure_url }))
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage('Thank you! Your testimonial has been submitted for review.')
        setTimeout(() => onClose(), 2000)
      } else {
        setMessage('Failed to submit. Please try again.')
      }
    } catch (error) {
      setMessage('Error submitting testimonial')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-light-card dark:bg-dark-card rounded-xl max-w-md w-full"
      >
        <div className="flex justify-between items-center p-4 border-b border-light-border dark:border-dark-border">
          <h3 className="text-xl font-bold text-orange-500">Share Your Experience</h3>
          <button onClick={onClose} className="p-2 hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Name *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Position/Company *</label>
            <input
              type="text"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Your Experience *</label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Rating *</label>
            <select
              value={formData.rating || 5}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Photo (Optional)</label>
            {formData.photo && (
              <div className="mb-2">
                <img src={formData.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer text-sm"
            />
            {uploading && <p className="text-sm text-orange-500 mt-1">Uploading...</p>}
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.includes('Thank') ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Testimonials



