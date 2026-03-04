import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiStar } from 'react-icons/fi'

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/testimonials/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      setError('Error loading testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (formData: any) => {
    const token = localStorage.getItem('token')
    const url = editItem 
      ? `http://localhost:5000/api/testimonials/${editItem._id}`
      : 'http://localhost:5000/api/testimonials'
    
    try {
      const response = await fetch(url, {
        method: editItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage(`Testimonial ${editItem ? 'updated' : 'created'} successfully`)
        setShowForm(false)
        setEditItem(null)
        fetchTestimonials()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Failed to save')
      }
    } catch (error) {
      setError('Error saving testimonial')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    
    const token = localStorage.getItem('token')
    try {
      await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setMessage('Testimonial deleted successfully')
      fetchTestimonials()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setError('Error deleting testimonial')
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    const token = localStorage.getItem('token')
    try {
      await fetch(`http://localhost:5000/api/testimonials/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      setMessage(`Testimonial ${status} successfully`)
      fetchTestimonials()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setError('Error updating status')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">Testimonials Manager</h2>

      {message && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        onClick={() => {
          setShowForm(true)
          setEditItem(null)
        }}
        className="mb-6 flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
      >
        <FiPlus size={18} />
        <span>Add Testimonial</span>
      </button>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((item) => (
            <div key={item._id} className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full object-cover object-center flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.avatar || item.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-light-text dark:text-dark-text">{item.name}</h3>
                    <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">{item.position}</p>
                    <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                      item.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      item.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditItem(item)
                      setShowForm(true)
                    }}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex mb-2">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <FiStar key={i} className="text-orange-500 fill-orange-500" size={14} />
                ))}
              </div>

              <p className="text-sm text-light-text dark:text-dark-text italic mb-3">"{item.message}"</p>

              <div className="flex gap-2 mt-3">
                {item.status === 'approved' ? (
                  <button
                    onClick={() => handleStatusChange(item._id, 'rejected')}
                    className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold"
                  >
                    Reject
                  </button>
                ) : item.status === 'rejected' ? (
                  <button
                    onClick={() => handleStatusChange(item._id, 'approved')}
                    className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold"
                  >
                    Approve
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleStatusChange(item._id, 'approved')}
                      className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(item._id, 'rejected')}
                      className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <TestimonialForm
          item={editItem}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false)
            setEditItem(null)
          }}
        />
      )}
    </div>
  )
}

const TestimonialForm = ({ item, onSave, onClose }: any) => {
  const [formData, setFormData] = useState(item || { rating: 5 })
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataUpload
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev: any) => ({ ...prev, photo: data.secure_url }))
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
        console.error('Upload error:', errorData)
        setUploadError(errorData.details || errorData.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload exception:', error)
      setUploadError('Network error. Please check backend logs.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-light-card dark:bg-dark-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-light-border dark:border-dark-border">
          <h3 className="text-xl font-bold text-orange-500">
            {item ? 'Edit' : 'Add'} Testimonial
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Position</label>
            <input
              type="text"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Message</label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Rating</label>
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
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Avatar (2 letters)</label>
            <input
              type="text"
              maxLength={2}
              value={formData.avatar || ''}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              placeholder="e.g., JD"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Photo</label>
            {formData.photo && (
              <div className="mb-2">
                <img src={formData.photo} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
            />
            {uploading && <p className="text-sm text-orange-500 mt-1">Uploading...</p>}
            {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FiSave size={18} />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-light-cardHover dark:bg-dark-cardHover hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default TestimonialManager
