import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/utils';
import '../styles/PropertyCard.css';

export default function PropertyCard({ property, onAddFavourite }) {
    const { id, type, bedrooms, price, description, location, picture, added } = property;

    // Handle drag start event to set data for drop
    const handleDragStart = (e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(property));
        e.dataTransfer.setData('type', 'property-card');
    };

    return (
        <div
            className="card property-card"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="card-image-container">
                {picture ? (
                    <img src={`/${picture}`} alt={`${type} in ${location}`} />
                ) : (
                    <div className="image-placeholder">{type}</div>
                )}
            </div>

            <div className="card-content">
                <div className="card-header">
                    <span className="price">{formatPrice(price)}</span>
                    <span className="type-badge">{bedrooms} Bed {type}</span>
                </div>

                <h3 className="location">{location}</h3>
                <p className="description-preview">{description.substring(0, 100)}...</p>

                <div className="card-footer">
                    <Link to={`/property/${id}`} className="btn btn-outline">View Details</Link>
                    <button className="btn btn-primary" onClick={() => onAddFavourite(property)}>
                        Save
                    </button>
                </div>

                <div className="date-added">
                    Added: {added.day} {added.month} {added.year}
                </div>
            </div>
        </div>
    );
}

// PropTypes for type checking and documentation
PropertyCard.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        bedrooms: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        picture: PropTypes.string,
        added: PropTypes.shape({
            day: PropTypes.number.isRequired,
            month: PropTypes.string.isRequired,
            year: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onAddFavourite: PropTypes.func.isRequired,
};
