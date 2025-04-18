import { useBooks } from '../../context/BookContext'
import './ThemeToggle.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useBooks()

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle