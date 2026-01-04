import PropTypes from 'prop-types';
import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import FavouritesList from '../components/FavouritesList';
import data from '../data/properties.json';
import { parsePropertyDate } from '../utils/utils';
import '../styles/SearchPage.css';

export default function SearchPage({
    favourites,
    onAddFavourite,
    onRemoveFavourite,
    onClearFavourites,
}) {
    const [properties] = useState(data.properties);
    const [filteredProperties, setFilteredProperties] = useState(data.properties);

    // Handle search form submission and filter properties
    const handleSearch = (filters) => {
        let results = properties;

        // Filter by property type
        if (filters.type !== 'any') {
            results = results.filter((p) => p.type === filters.type);
        }

        // Filter by price range
        results = results.filter(
            (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
        );

        // Filter by bedroom count
        results = results.filter(
            (p) => p.bedrooms >= filters.minBedrooms && p.bedrooms <= filters.maxBedrooms
        );

        // Filter by postcode area (case-insensitive)
        if (filters.postcodeArea) {
            results = results.filter((p) =>
                p.location.toLowerCase().includes(filters.postcodeArea.toLowerCase())
            );
        }

        // Filter by date added range
        if (filters.dateAddedStart && filters.dateAddedEnd) {
            results = results.filter((p) => {
                const propertyDate = parsePropertyDate(p.added);
                return propertyDate >= filters.dateAddedStart && propertyDate <= filters.dateAddedEnd;
            });
        }

        setFilteredProperties(results);
    };

    // Handle drop event on favourites sidebar
    const handleSidebarDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        if (type === 'property-card') {
            const propertyData = JSON.parse(e.dataTransfer.getData('application/json'));
            onAddFavourite(propertyData);
        }
    };

    return (
        <div className="search-page">
            <div className="container search-layout">
                {/* Main content: search form and results */}
                <div className="search-main">
                    <h1>Properties for Sale</h1>
                    <SearchForm onSearch={handleSearch} />

                    <div className="results-grid">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onAddFavourite={onAddFavourite}
                                />
                            ))
                        ) : (
                            <div className="no-results">
                                No properties found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: favourites list with drop zone */}
                <aside
                    className="search-sidebar"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleSidebarDrop}
                >
                    <FavouritesList
                        favourites={favourites}
                        onRemoveFavourite={onRemoveFavourite}
                        onClearFavourites={onClearFavourites}
                    />
                </aside>
            </div>
        </div>
    );
}

// PropTypes for type checking and documentation
SearchPage.propTypes = {
    favourites: PropTypes.array.isRequired,
    onAddFavourite: PropTypes.func.isRequired,
    onRemoveFavourite: PropTypes.func.isRequired,
    onClearFavourites: PropTypes.func.isRequired,
};