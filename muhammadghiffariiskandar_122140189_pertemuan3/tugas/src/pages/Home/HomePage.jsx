// pages/Home/HomePage.jsx
import { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import BookList from '../../components/BookList/BookList';
import BookForm from '../../components/BookForm/BookForm';
import './HomePage.css';

const HomePage = () => {
  const { books } = useBookContext();
  const [showForm, setShowForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  
  const handleAddClick = () => {
    setBookToEdit(null);
    setShowForm(true);
  };
  
  const handleEditBook = (book) => {
    setBookToEdit(book);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setBookToEdit(null);
  };
  
  return (
    <div className="home-page">
      <div className="page-header">
        <h2>My Book Collection</h2>
        <button className="btn-add" onClick={handleAddClick}>
          Add New Book
        </button>
      </div>
      
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <BookForm bookToEdit={bookToEdit} onClose={handleCloseForm} />
          </div>
        </div>
      )}
      
      <BookList books={books} onEdit={handleEditBook} />
      
      {books.length === 0 && !showForm && (
        <div className="empty-state">
          <p>Your book collection is empty. Start adding books!</p>
          <button className="btn-primary" onClick={handleAddClick}>
            Add Your First Book
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;