import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data/properties.json';
import { formatPrice } from '../utils/utils';
import '../styles/PropertyDetails.css';

export default function PropertyDetails({ onAddFavourite, favourites }) {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [images, setImages] = useState([]);

    // Tab configuration
    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'floorplan', label: 'Floor Plan' },
        { id: 'map', label: 'Map' },
    ];

    // Load property data based on ID from URL
    useEffect(() => {
        const found = data.properties.find((p) => p.id === id);
        if (found) {
            setProperty(found);
            // Use property's images array if available, otherwise create placeholder array
            if (found.images && found.images.length > 0) {
                setImages(found.images);
            } else {
                // Fallback: duplicate main picture for gallery demo (6 images required)
                setImages(Array(6).fill(found.picture));
            }
        }
    }, [id]);

    // Check if property is already in favourites
    const isInFavourites = favourites?.some((fav) => fav.id === id);

    if (!property) {
        return <div className="container">Loading or Not Found...</div>;
    }

    return (
        <div className="property-details-page container">
            {/* Back navigation */}
            <Link to="/" className="back-link">&larr; Back to Search</Link>

            {/* Property header with location, type, and price */}
            <div className="property-header">
                <div>
                    <h1>{property.location}</h1>
                    <span className="type-badge large">
                        {property.type} - {property.bedrooms} Bedrooms
                    </span>
                </div>
                <div className="price-tag">{formatPrice(property.price)}</div>
            </div>

            {/* Image gallery with thumbnails */}
            <div className="gallery-section">
                <div className="main-image">
                    <div className="img-placeholder-large">
                        {images[activeImageIndex] ? (
                            <img src={`/${images[activeImageIndex]}`} alt={`Property view ${activeImageIndex + 1}`} />
                        ) : (
                            <span>Image {activeImageIndex + 1}</span>
                        )}
                    </div>
                </div>
                <div className="thumbnails">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                            onClick={() => setActiveImageIndex(idx)}
                        >
                            <img src={`/${img}`} alt={`Thumbnail ${idx + 1}`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Property content with actions and tabs */}
            <div className="property-content">
                <div className="actions-bar">
                    <button
                        className="btn btn-primary"
                        onClick={() => onAddFavourite(property)}
                        disabled={isInFavourites}
                    >
                        {isInFavourites ? '✓ In Favourites' : '♥ Add to Favourites'}
                    </button>
                </div>

                {/* Tab navigation */}
                <div className="tabs-container">
                    <div className="tabs-header">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="tab-content card">
                        {activeTab === 'description' && (
                            <div className="description-text">
                                <p>{property.description}</p>
                                <h3>Key Features</h3>
                                <ul>
                                    <li>{property.tenure}</li>
                                    <li>{property.bedrooms} Bedrooms</li>
                                    <li>Added: {property.added.month} {property.added.year}</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'floorplan' && (
                            <div className="placeholder-content">
                                <h3>Floor Plan</h3>
                                {property.floorplan ? (
                                    <img
                                        src={`/${property.floorplan}`}
                                        alt="Floor plan"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                ) : (
                                    <div className="placeholder-box">Floor Plan Image Would Go Here</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'map' && (
                            <div className="placeholder-content">
                                <h3>Location Map</h3>
                                <div className="map-container">
                                    <iframe
                                        title="Property Location"
                                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// PropTypes for type checking and documentation
PropertyDetails.propTypes = {
    onAddFavourite: PropTypes.func.isRequired,
    favourites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ),
};

PropertyDetails.defaultProps = {
    favourites: [],
};
