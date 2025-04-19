// hooks/useBookStats.js
import { useMemo } from 'react';
import { useBookContext } from '../context/BookContext';

const useBookStats = () => {
  const { books } = useBookContext();
  
  const stats = useMemo(() => {
    const owned = books.filter(book => book.status === 'owned').length;
    const reading = books.filter(book => book.status === 'reading').length;
    const toBuy = books.filter(book => book.status === 'toBuy').length;
    
    // Get authors count
    const authors = new Set(books.map(book => book.author));
    
    // Most frequent author
    const authorCount = {};
    books.forEach(book => {
      authorCount[book.author] = (authorCount[book.author] || 0) + 1;
    });
    
    let mostFrequentAuthor = { name: '', count: 0 };
    Object.entries(authorCount).forEach(([author, count]) => {
      if (count > mostFrequentAuthor.count) {
        mostFrequentAuthor = { name: author, count };
      }
    });

    return {
      total: books.length,
      owned,
      reading,
      toBuy,
      uniqueAuthors: authors.size,
      mostFrequentAuthor: mostFrequentAuthor.name 
        ? `${mostFrequentAuthor.name} (${mostFrequentAuthor.count})` 
        : 'None'
    };
  }, [books]);
  
  return stats;
};

export default useBookStats;