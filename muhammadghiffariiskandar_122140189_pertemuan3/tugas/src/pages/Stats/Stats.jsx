import { useBooks } from '../../context/BookContext'
import { useBookStats } from '../../hooks/useBookStats'
import StatsCard from '../../components/StatsCard/StatsCard'
import './Stats.css'

function Stats() {
  const { books } = useBooks()
  const stats = useBookStats(books)

  return (
    <div className="stats-page">
      <h1>Book Statistics</h1>
      
      <div className="stats-grid">
        <StatsCard 
          title="Total Books" 
          value={stats.totalBooks} 
          color="#3498db"
        />
        <StatsCard 
          title="Owned Books" 
          value={stats.ownedBooks} 
          percentage={stats.ownedPercentage}
          color="#2ecc71"
        />
        <StatsCard 
          title="Reading Now" 
          value={stats.readingBooks} 
          percentage={stats.readingPercentage}
          color="#f39c12"
        />
        <StatsCard 
          title="Wishlist" 
          value={stats.wishlistBooks} 
          percentage={stats.wishlistPercentage}
          color="#e74c3c"
        />
      </div>
    </div>
  )
}

export default Stats