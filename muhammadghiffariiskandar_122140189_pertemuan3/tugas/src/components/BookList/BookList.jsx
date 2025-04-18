import { useState } from 'react'
import PropTypes from 'prop-types'
import BookItem from '../BookItem/BookItem'
import './BookList.css'

function BookList({ books, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null)

  const handleEditClick = (id) => {
    setEditingId(id)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p className="no-books">No books found. Add some books to get started!</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {editingId === book.id ? (
                <BookForm 
                  initialData={book}
                  onSubmit={(updatedBook) => {
                    onEdit(book.id, updatedBook)
                    setEditingId(null)
                  }}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <BookItem 
                  book={book}
                  onEdit={() => handleEditClick(book.id)}
                  onDelete={() => onDelete(book.id)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BookList