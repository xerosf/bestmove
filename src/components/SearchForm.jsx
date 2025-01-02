import PropTypes from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchForm.css';

export default function SearchForm({ onSearch }) {
    // Search filter state with sensible defaults
    const [filters, setFilters] = useState({
        type: 'any',
        minPrice: 0,
        maxPrice: 2000000,
        minBedrooms: 0,
        maxBedrooms: 10,
        dateAddedStart: null,
        dateAddedEnd: null,
        postcodeArea: '',
    });

    // Property type options for the Select widget
    const typeOptions = [
        { value: 'any', label: 'Any' },
        { value: 'House', label: 'House' },
        { value: 'Flat', label: 'Flat' },
    ];

    // Handle property type selection
    const handleTypeChange = (selectedOption) => {
        setFilters({ ...filters, type: selectedOption.value });
    };

    // Handle generic input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Handle date range selection
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setFilters({ ...filters, dateAddedStart: start, dateAddedEnd: end });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    return (
        <form className="search-form card" onSubmit={handleSubmit}>
            <div className="search-grid">
                {/* Property Type Filter */}
                <div className="form-group">
                    <label className="form-label">Property Type</label>
                    <Select
                        options={typeOptions}
                        defaultValue={typeOptions[0]}
                        onChange={handleTypeChange}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>

                {/* Postcode Area Filter */}
                <div className="form-group">
                    <label className="form-label">Postcode Area (e.g. BR1)</label>
                    <input
                        type="text"
                        name="postcodeArea"
                        className="form-input"
                        placeholder="Search Postcode..."
                        value={filters.postcodeArea}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Date Added Filter */}
                <div className="form-group">
                    <label className="form-label">Date Added</label>
                    <DatePicker
                        selectsRange={true}
                        startDate={filters.dateAddedStart}
                        endDate={filters.dateAddedEnd}
                        onChange={handleDateChange}
                        className="form-input"
                        placeholderText="Select date range"
                        isClearable={true}
                    />
                </div>

                {/* Price Range Filter */}
                <div className="form-group">
                    <label className="form-label">Price Range</label>
                    <div className="range-inputs">
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Min Price"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Max Price"
                        />
                    </div>
                </div>

                {/* Bedroom Range Filter */}
                <div className="form-group">
                    <label className="form-label">Bedrooms</label>
                    <div className="range-inputs">
                        <input
                            type="number"
                            name="minBedrooms"
                            value={filters.minBedrooms}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Min Beds"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            name="maxBedrooms"
                            value={filters.maxBedrooms}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Max Beds"
                        />
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary search-btn">
                    Search Properties
                </button>
            </div>
        </form>
    );
}

// PropTypes for type checking and documentation
SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
