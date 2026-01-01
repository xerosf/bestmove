import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;