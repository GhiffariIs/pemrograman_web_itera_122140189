import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import Home from './pages/Home/Home'
import Stats from './pages/Stats/Stats'
import Layout from './components/Layout/Layout'
import './App.css'

function App() {
  return (
    <BookProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Layout>
      </Router>
    </BookProvider>
  )
}

export default App