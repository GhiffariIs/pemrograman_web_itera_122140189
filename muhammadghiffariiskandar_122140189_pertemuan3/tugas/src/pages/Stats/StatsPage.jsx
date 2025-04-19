// pages/Stats/StatsPage.jsx
import useBookStats from '../../hooks/useBookStats';
import './StatsPage.css';

const StatsPage = () => {
  const stats = useBookStats();
  
  return (
    <div className="stats-page">
      <h2>Book Collection Statistics</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        
        <div className="stat-card">
          <h3>Owned Books</h3>
          <p className="stat-number">{stats.owned}</p>
        </div>
        
        <div className="stat-card">
          <h3>Currently Reading</h3>
          <p className="stat-number">{stats.reading}</p>
        </div>
        
        <div className="stat-card">
          <h3>Wish List</h3>
          <p className="stat-number">{stats.toBuy}</p>
        </div>
        
        <div className="stat-card">
          <h3>Unique Authors</h3>
          <p className="stat-number">{stats.uniqueAuthors}</p>
        </div>
        
        <div className="stat-card">
          <h3>Top Author</h3>
          <p className="stat-text">{stats.mostFrequentAuthor}</p>
        </div>
      </div>
      
      {stats.total === 0 && (
        <div className="empty-stats">
          <p>No data available yet. Add some books to see statistics!</p>
        </div>
      )}
    </div>
  );
};

export default StatsPage;