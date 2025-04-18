import { renderHook, act } from '@testing-library/react-hooks'
import { BookProvider, useBooks } from './BookContext'

describe('BookContext', () => {
  it('provides books and functions', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    expect(result.current).toEqual({
      books: expect.any(Array),
      addBook: expect.any(Function),
      editBook: expect.any(Function),
      deleteBook: expect.any(Function),
      theme: 'light',
      toggleTheme: expect.any(Function)
    })
  })

  it('adds a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    act(() => {
      result.current.addBook({ title: 'New Book', author: 'Author', status: 'owned' })
    })
    
    expect(result.current.books).toHaveLength(1)
    expect(result.current.books[0]).toMatchObject({
      title: 'New Book',
      author: 'Author',
      status: 'owned'
    })
  })

  it('edits a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    act(() => {
      result.current.addBook({ title: 'Original', author: 'Author', status: 'owned' })
    })
    
    const bookId = result.current.books[0].id
    
    act(() => {
      result.current.editBook(bookId, { title: 'Updated' })
    })
    
    expect(result.current.books[0].title).toBe('Updated')
  })

  it('deletes a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    act(() => {
      result.current.addBook({ title: 'To Delete', author: 'Author', status: 'owned' })
    })
    
    const bookId = result.current.books[0].id
    expect(result.current.books).toHaveLength(1)
    
    act(() => {
      result.current.deleteBook(bookId)
    })
    
    expect(result.current.books).toHaveLength(0)
  })

  it('toggles theme', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    expect(result.current.theme).toBe('light')
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe('dark')
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe('light')
  })
})