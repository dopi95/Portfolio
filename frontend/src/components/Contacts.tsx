import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiUser, FiClock, FiSend, FiTrash2, FiCheck, FiX } from 'react-icons/fi'

const Contacts = () => {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      setError('Error loading contacts')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:5000/api/contacts/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchContacts()
    } catch (error) {
      console.error('Error marking as read')
    }
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/contacts/${selectedContact._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ replyMessage })
      })

      if (response.ok) {
        setMessage('Reply sent successfully')
        setReplyMessage('')
        setSelectedContact(null)
        fetchContacts()
      } else {
        setError('Failed to send reply')
      }
    } catch (error) {
      setError('Error sending reply')
    } finally {
      setSending(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchContacts()
    } catch (error) {
      setError('Error deleting contact')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12">
      <div className="text-orange-500">Loading...</div>
    </div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">Contact Messages</h2>

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

      {contacts.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl">
          <FiMail className="mx-auto text-light-textSecondary dark:text-dark-textSecondary mb-4" size={48} />
          <p className="text-light-textSecondary dark:text-dark-textSecondary">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-light-card dark:bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 border-l-4 ${
                contact.read ? 'border-gray-300' : 'border-orange-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiUser className="text-orange-500" size={18} />
                    <h3 className="font-bold text-light-text dark:text-dark-text">{contact.name}</h3>
                    {!contact.read && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                        New
                      </span>
                    )}
                    {contact.replied && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                        Replied
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <FiMail className="text-light-textSecondary dark:text-dark-textSecondary" size={16} />
                    <a href={`mailto:${contact.email}`} className="text-sm text-orange-500 hover:underline">
                      {contact.email}
                    </a>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <FiClock className="text-light-textSecondary dark:text-dark-textSecondary" size={16} />
                    <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                      {new Date(contact.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-light-text dark:text-dark-text mb-4">{contact.message}</p>

                  {contact.replied && contact.replyMessage && (
                    <div className="mt-4 p-3 bg-light-cardHover dark:bg-dark-cardHover rounded-lg">
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">Your Reply:</p>
                      <p className="text-sm text-light-text dark:text-dark-text">{contact.replyMessage}</p>
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
                        Sent: {new Date(contact.repliedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col gap-2">
                  {!contact.read && (
                    <button
                      onClick={() => markAsRead(contact._id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                      title="Mark as read"
                    >
                      <FiCheck size={16} />
                      <span className="hidden sm:inline">Read</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="flex items-center space-x-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-colors"
                  >
                    <FiSend size={16} />
                    <span className="hidden sm:inline">Reply</span>
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-light-card dark:bg-dark-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold text-orange-500">Reply to {selectedContact.name}</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4 p-3 bg-light-cardHover dark:bg-dark-cardHover rounded-lg">
                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">Original Message:</p>
                <p className="text-sm text-light-text dark:text-dark-text">{selectedContact.message}</p>
              </div>

              <form onSubmit={handleReply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-light-cardHover dark:bg-dark-cardHover border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text dark:text-dark-text"
                    rows={6}
                    placeholder="Type your reply..."
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg font-semibold transition-colors"
                  >
                    <FiSend size={18} />
                    <span>{sending ? 'Sending...' : 'Send Reply'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-3 bg-light-cardHover dark:bg-dark-cardHover hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Contacts
