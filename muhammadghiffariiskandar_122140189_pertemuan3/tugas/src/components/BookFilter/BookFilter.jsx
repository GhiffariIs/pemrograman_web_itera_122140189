import { useState } from 'react'
import PropTypes from 'prop-types'
import './BookFilter.css'

function BookFilter({ onFilter, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  const handleStatusChange = (e) => {
    const status = e.target.value
    setStatusFilter(status)
    onFilter(status)
  }

  return (
    <div className="book-filter">
      <div className="filter-group">
        <label htmlFor="search">Search Books:</label>
        <input
          type="text"
          id="search"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="status">Filter by Status:</label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">All Books</option>
          <option value="owned">Owned</option>
          <option value="reading">Currently Reading</option>
          <option value="wishlist">Wishlist</option>
        </select>
      </div>
    </div>
  )
}

BookFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default BookFilter