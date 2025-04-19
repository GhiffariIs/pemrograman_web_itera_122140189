import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// Create context
export const BookContext = createContext();

// Action types
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK = 'EDIT_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';

// Reducer function untuk mengelola state buku berdasarkan action
const bookReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map(book => 
          book.id === action.payload.id ? action.payload : book
        )
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      };
    default:
      return state;
  }
};

// Provider component
export const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useLocalStorage('books', []);
  const [state, dispatch] = useReducer(bookReducer, { books: storedBooks });

  // Update localStorage when books change
  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  // Action creators
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString()
    };
    dispatch({ type: ADD_BOOK, payload: newBook });
  };

  const editBook = (book) => {
    dispatch({ type: EDIT_BOOK, payload: book });
  };

  const deleteBook = (id) => {
    dispatch({ type: DELETE_BOOK, payload: id });
  };

  return (
    <BookContext.Provider value={{ 
      books: state.books, 
      addBook, 
      editBook, 
      deleteBook 
    }}>
      {children}
    </BookContext.Provider>
  );
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook for using the book context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};