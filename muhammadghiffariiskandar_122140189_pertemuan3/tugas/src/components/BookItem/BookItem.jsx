import { useState } from 'react';
import PropTypes from 'prop-types';
import { useBookContext } from '../../context/BookContext';

const BookItem = ({ book, onEdit }) => {
  const { deleteBook } = useBookContext();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleDelete = () => {
    if (showConfirm) {
      deleteBook(book.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirm(false);
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'owned': return 'Owned';
      case 'reading': return 'Reading';
      case 'toBuy': return 'Want to Buy';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'owned': return 'status-owned';
      case 'reading': return 'status-reading';
      case 'toBuy': return 'status-to-buy';
      default: return '';
    }
  };
  
  return (
    <div className="book-item">
      <div className="book-status-badge">
        <span className={getStatusClass(book.status)}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      
      {book.notes && (
        <div className="book-notes">
          <p>{book.notes}</p>
        </div>
      )}
      
      <div className="book-actions">
        <button 
          className="btn-edit" 
          onClick={() => onEdit(book)}
          aria-label="Edit book"
        >
          Edit
        </button>
        
        {showConfirm ? (
          <div className="confirm-delete">
            <button className="btn-cancel" onClick={cancelDelete}>
              Cancel
            </button>
            <button className="btn-confirm-delete" onClick={handleDelete}>
              Confirm
            </button>
          </div>
        ) : (
          <button 
            className="btn-delete" 
            onClick={handleDelete}
            aria-label="Delete book"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    notes: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookItem;