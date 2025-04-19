// components/BookForm/BookForm.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBookContext } from '../../context/BookContext';
import './BookForm.css';

const BookForm = ({ bookToEdit, onClose }) => {
  const { addBook, editBook } = useBookContext();
  const [error, setError] = useState({});
  
  const initialFormState = {
    id: '',
    title: '',
    author: '',
    status: 'owned',
    notes: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    }
  }, [bookToEdit]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (error[name]) {
      setError({ ...error, [name]: '' });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (bookToEdit) {
      editBook(formData);
    } else {
      addBook(formData);
    }
    
    setFormData(initialFormState);
    onClose();
  };
  
  return (
    <div className="book-form-container">
      <h2>{bookToEdit ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={error.title ? 'error' : ''}
          />
          {error.title && <span className="error-text">{error.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={error.author ? 'error' : ''}
          />
          {error.author && <span className="error-text">{error.author}</span>}
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
            <option value="toBuy">Want to Buy</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {bookToEdit ? 'Save Changes' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
    notes: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

BookForm.defaultProps = {
  bookToEdit: null
};

export default BookForm;