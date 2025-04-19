import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import HomePage from './pages/Home/HomePage';
import StatsPage from './pages/Stats/StatsPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© {new Date().getFullYear()} Personal Book Management App</p>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;