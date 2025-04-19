import { useState } from 'react';
import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem.jsx';
import './BookList.css';

const BookList = ({ books, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  // Filter and search books
  const filteredBooks = books.filter(book => {
    const matchesFilter = filter === 'all' || book.status === filter;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  return (
    <div className="book-list-container">
      <div className="book-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-box">
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All Books</option>
            <option value="owned">Owned</option>
            <option value="reading">Currently Reading</option>
            <option value="toBuy">Want to Buy</option>
          </select>
        </div>
      </div>
      
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookItem key={book.id} book={book} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <div className="no-books">
          <p>No books found. Try adjusting your filters or add some books!</p>
        </div>
      )}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookList;