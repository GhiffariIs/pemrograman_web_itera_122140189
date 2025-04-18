import { useMemo } from 'react'

export function useBookStats(books) {
  return useMemo(() => {
    const totalBooks = books.length
    const ownedBooks = books.filter(book => book.status === 'owned').length
    const readingBooks = books.filter(book => book.status === 'reading').length
    const wishlistBooks = books.filter(book => book.status === 'wishlist').length

    return {
      totalBooks,
      ownedBooks,
      readingBooks,
      wishlistBooks,
      ownedPercentage: totalBooks ? Math.round((ownedBooks / totalBooks) * 100) : 0,
      readingPercentage: totalBooks ? Math.round((readingBooks / totalBooks) * 100) : 0,
      wishlistPercentage: totalBooks ? Math.round((wishlistBooks / totalBooks) * 100) : 0
    }
  }, [books])
}