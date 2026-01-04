import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/utils';
import '../styles/FavouritesList.css';

export default function FavouritesList({ favourites, onRemoveFavourite, onClearFavourites }) {
    const navigate = useNavigate();
    const [isTrashActive, setIsTrashActive] = useState(false);

    // Handle drag over event to allow drop
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    // Handle drag start for favourite item
    const handleFavDragStart = (e, fav) => {
        e.dataTransfer.setData('application/json', JSON.stringify(fav));
        e.dataTransfer.setData('type', 'favourite-item');
    };

    // Handle drop event in trash zone to remove favourite
    const handleTrashDrop = (e) => {
        e.preventDefault();
        setIsTrashActive(false);
        const type = e.dataTransfer.getData('type');
        if (type === 'favourite-item') {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            onRemoveFavourite(data.id);
        }
    };

    const handleTrashDragEnter = (e) => {
        e.preventDefault();
        setIsTrashActive(true);
    };

    const handleTrashDragLeave = (e) => {
        e.preventDefault();
        setIsTrashActive(false);
    };

    return (
        <div className="favourites-sidebar card" onDragOver={handleDragOver}>
            {/* Header with title and clear button */}
            <div className="fav-header">
                <h3>Favourites ({favourites.length})</h3>
                {favourites.length > 0 && (
                    <button className="btn-text" onClick={onClearFavourites}>
                        Clear All
                    </button>
                )}
            </div>

            {/* Favourites list */}
            <div className="fav-list">
                {favourites.length === 0 ? (
                    <p className="empty-msg">Drag properties here or click ♥ Save to add.</p>
                ) : (
                    favourites.map((fav) => (
                        <div
                            key={fav.id}
                            className="fav-item"
                            draggable
                            onDragStart={(e) => handleFavDragStart(e, fav)}
                        >
                            <img src={`/${fav.picture}`} alt={fav.type} className="fav-thumb" />
                            <div className="fav-info" onClick={() => navigate(`/property/${fav.id}`)}>
                                <h4>{fav.location}</h4>
                                <span className="fav-price">{formatPrice(fav.price)}</span>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFavourite(fav.id);
                                }}
                                title="Remove property"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Trash zone for drag-to-remove */}
            <div
                className={`trash-zone ${isTrashActive ? 'drag-active' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleTrashDrop}
                onDragEnter={handleTrashDragEnter}
                onDragLeave={handleTrashDragLeave}
            >
                🗑️ Drop here to remove
            </div>
        </div>
    );
}

// PropTypes for type checking and documentation
FavouritesList.propTypes = {
    favourites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            location: PropTypes.string.isRequired,
            picture: PropTypes.string,
        })
    ).isRequired,
    onRemoveFavourite: PropTypes.func.isRequired,
    onClearFavourites: PropTypes.func.isRequired,
};
