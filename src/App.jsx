import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import './index.css';

function App() {
  // Global favourites state - persists across route changes
  const [favourites, setFavourites] = useState([]);

  // Add a property to favourites
  const handleAddFavourite = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    } else {
      alert('Property already in favourites!');
    }
  };

  // Remove a property from favourites
  const handleRemoveFavourite = (propertyId) => {
    setFavourites(favourites.filter((fav) => fav.id !== propertyId));
  };

  // Clear all favourites
  const handleClearFavourites = () => {
    setFavourites([]);
  };

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  favourites={favourites}
                  onAddFavourite={handleAddFavourite}
                  onRemoveFavourite={handleRemoveFavourite}
                  onClearFavourites={handleClearFavourites}
                />
              }
            />
            <Route
              path="/property/:id"
              element={
                <PropertyDetails
                  onAddFavourite={handleAddFavourite}
                  favourites={favourites}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;