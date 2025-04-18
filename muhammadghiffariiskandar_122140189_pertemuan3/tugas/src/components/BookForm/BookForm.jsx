import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './BookForm.css'

function BookForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'owned'
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.author.trim()) newErrors.author = 'Author is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit(formData)
    if (!initialData) {
      setFormData({ title: '', author: '', status: 'owned' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="owned">Owned</option>
          <option value="reading">Currently Reading</option>
          <option value="wishlist">Wishlist</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn primary">
          {initialData ? 'Update Book' : 'Add Book'}
        </button>
        {initialData && (
          <button type="button" className="btn secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist'])
  }),
  onCancel: PropTypes.func
}

export default BookForm