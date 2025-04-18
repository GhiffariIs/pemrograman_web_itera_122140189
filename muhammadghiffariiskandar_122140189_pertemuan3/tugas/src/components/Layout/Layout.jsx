import { Link } from 'react-router-dom'
import { useBooks } from '../../context/BookContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Layout.css'

function Layout({ children }) {
  const { theme } = useBooks()

  return (
    <div className={`layout ${theme}`}>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="logo">BookTracker</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/stats">Statistics</Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>Personal Book Management App © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout