import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [])
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const addBook = (book) => {
    setBooks(prev => [...prev, { ...book, id: Date.now() }])
  }

  const editBook = (id, updatedBook) => {
    setBooks(prev => prev.map(book => book.id === id ? { ...book, ...updatedBook } : book))
  }

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id))
  }

  return (
    <BookContext.Provider value={{ 
      books, 
      addBook, 
      editBook, 
      deleteBook, 
      theme, 
      toggleTheme 
    }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  return useContext(BookContext)
}