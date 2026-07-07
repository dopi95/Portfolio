import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { API_BASE_URL } from '../config'

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState('skills')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems()
  }, [activeSection])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/${activeSection}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      setError('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (formData: any) => {
    const token = localStorage.getItem('token')
    const url = editItem 
      ? `${API_BASE_URL}/api/${activeSection}/${editItem._id}`
      : `${API_BASE_URL}/api/${activeSection}`
    
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
        setMessage(`${activeSection.slice(0, -1)} ${editItem ? 'updated' : 'created'} successfully`)
        setShowForm(false)
        setEditItem(null)
        fetchItems()
      } else {
        setError('Failed to save')
      }
    } catch (error) {
      setError('Error saving data')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_BASE_URL}/api/${activeSection}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setMessage('Deleted successfully')
      fetchItems()
    } catch (error) {
      setError('Error deleting')
    }
  }

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return
    
    const newItems = [...items]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    
    // Update order values
    const updatedItems = newItems.map((item, idx) => ({ ...item, order: idx + 1 }))
    setItems(updatedItems)
    
    // Save to backend using reorder endpoint
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_BASE_URL}/api/${activeSection}/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: updatedItems.map(({ _id, order }) => ({ _id, order })) })
      })
      setMessage('Order updated successfully')
    } catch (error) {
      setError('Error updating order')
      fetchItems()
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">Content Manager</h2>

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

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['skills', 'projects', 'experiences'].map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section)
              setShowForm(false)
              setEditItem(null)
            }}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
              activeSection === section
                ? 'bg-orange-500 text-white'
                : 'bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setShowForm(true)
          setEditItem(null)
        }}
        className="mb-4 flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
      >
        <FiPlus size={18} />
        <span>Add {activeSection.slice(0, -1)}</span>
      </button>

      {/* Items List */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {items.map((item, index) => (
            <div key={item._id} className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleReorder(index, index - 1)}
                      disabled={index === 0}
                      className="p-1 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <FiArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => handleReorder(index, index + 1)}
                      disabled={index === items.length - 1}
                      className="p-1 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <FiArrowDown size={14} />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-orange-500 min-w-[30px]">
                    #{item.order || index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  {activeSection === 'skills' && (
                    <>
                      <h3 className="font-bold text-light-text dark:text-dark-text">{item.name}</h3>
                      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        {item.category} · {item.icon} · <span style={{ color: item.color }}>{item.color}</span>
                      </p>
                    </>
                  )}
                  {activeSection === 'projects' && (
                    <>
                      <h3 className="font-bold text-light-text dark:text-dark-text">{item.title}</h3>
                      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{item.description}</p>
                    </>
                  )}
                  {activeSection === 'experiences' && (
                    <>
                      <h3 className="font-bold text-light-text dark:text-dark-text">{item.title}</h3>
                      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        {item.company} - {item.startDate} to {item.endDate || 'Present'}
                      </p>
                    </>
                  )}
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
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <FormModal
          section={activeSection}
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

const FormModal = ({ section, item, onSave, onClose }: any) => {
  const [formData, setFormData] = useState(item || {})
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
      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataUpload
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev: any) => ({ ...prev, image: data.secure_url }))
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
        setUploadError(errorData.details || errorData.error || 'Failed to upload image')
      }
    } catch (error) {
      setUploadError('Network error')
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
            {item ? 'Edit' : 'Add'} {section.slice(0, -1)}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {section === 'skills' && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="text"
                placeholder="Icon (e.g., FaReact)"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="text"
                placeholder="Color (e.g., #61DAFB)"
                value={formData.color || ''}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="number"
                placeholder="Display Order (optional)"
                value={formData.order || ''}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
            </>
          )}

          {section === 'projects' && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                rows={3}
                required
              />
              <input
                type="number"
                placeholder="Display Order (optional)"
                value={formData.order || ''}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Project Image</label>
                {formData.image && (
                  <div className="mb-2">
                    <img src={formData.image} alt="Preview" className="w-32 h-24 object-cover rounded-lg" />
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
                {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
              </div>
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={formData.technologies?.join(', ') || ''}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map((t: string) => t.trim()) })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="Live URL"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
            </>
          )}

          {section === 'experiences' && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                required
              />
              <input
                type="text"
                placeholder="End Date (leave empty if current)"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
                rows={3}
                required
              />
              <input
                type="number"
                placeholder="Display Order (optional)"
                value={formData.order || ''}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text"
              />
            </>
          )}

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

export default ContentManager
