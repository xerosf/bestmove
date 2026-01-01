import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SearchPage from './pages/SearchPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation /> {/* Navigation bar visible on all pages */}
        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
