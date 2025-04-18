import { renderHook } from '@testing-library/react-hooks'
import { useBookStats } from './useBookStats'

describe('useBookStats', () => {
  it('calculates correct stats with empty books array', () => {
    const { result } = renderHook(() => useBookStats([]))
    
    expect(result.current).toEqual({
      totalBooks: 0,
      ownedBooks: 0,
      readingBooks: 0,
      wishlistBooks: 0,
      ownedPercentage: 0,
      readingPercentage: 0,
      wishlistPercentage: 0
    })
  })

  it('calculates correct stats with books', () => {
    const books = [
      { id: 1, status: 'owned' },
      { id: 2, status: 'owned' },
      { id: 3, status: 'reading' },
      { id: 4, status: 'wishlist' },
      { id: 5, status: 'wishlist' }
    ]
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current).toEqual({
      totalBooks: 5,
      ownedBooks: 2,
      readingBooks: 1,
      wishlistBooks: 2,
      ownedPercentage: 40,
      readingPercentage: 20,
      wishlistPercentage: 40
    })
  })

  it('memoizes the result', () => {
    const books = [
      { id: 1, status: 'owned' },
      { id: 2, status: 'reading' }
    ]
    
    const { result, rerender } = renderHook(
      ({ books }) => useBookStats(books),
      { initialProps: { books } }
    )
    
    const firstResult = result.current
    rerender({ books })
    
    expect(result.current).toBe(firstResult)
    
    const newBooks = [...books, { id: 3, status: 'wishlist' }]
    rerender({ books: newBooks })
    
    expect(result.current).not.toBe(firstResult)
  })
})