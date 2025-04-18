import PropTypes from 'prop-types'
import './BookItem.css'

function BookItem({ book, onEdit, onDelete }) {
  const getStatusColor = () => {
    switch (book.status) {
      case 'owned':
        return '#2ecc71'
      case 'reading':
        return '#f39c12'
      case 'wishlist':
        return '#e74c3c'
      default:
        return '#3498db'
    }
  }

  const getStatusText = () => {
    switch (book.status) {
      case 'owned':
        return 'Owned'
      case 'reading':
        return 'Reading'
      case 'wishlist':
        return 'Wishlist'
      default:
        return ''
    }
  }

  return (
    <div className="book-item">
      <div className="book-header">
        <h3 className="book-title">{book.title}</h3>
        <span 
          className="book-status"
          style={{ backgroundColor: getStatusColor() }}
        >
          {getStatusText()}
        </span>
      </div>
      <p className="book-author">by {book.author}</p>
      <div className="book-actions">
        <button onClick={onEdit} className="btn edit-btn">
          Edit
        </button>
        <button onClick={onDelete} className="btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  )
}

BookItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BookItem