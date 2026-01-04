import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../components/PropertyCard';
import { BrowserRouter } from 'react-router-dom';

// Mock property data for testing
const mockProperty = {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 500000,
    description: 'A lovely house with spacious rooms and a beautiful garden.',
    location: 'London BR1',
    picture: 'images/prop1pic1.jpg',
    added: { day: 1, month: 'January', year: 2025 },
};

// Helper function to render components with Router context
const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('PropertyCard Component', () => {
    test('renders property details correctly', () => {
        renderWithRouter(<PropertyCard property={mockProperty} onAddFavourite={() => { }} />);

        expect(screen.getByText('London BR1')).toBeInTheDocument();
        expect(screen.getByText('3 Bed House')).toBeInTheDocument();
        expect(screen.getByText('£500,000')).toBeInTheDocument();
    });

    test('calls onAddFavourite when Save button is clicked', () => {
        const handleAdd = vi.fn();
        renderWithRouter(<PropertyCard property={mockProperty} onAddFavourite={handleAdd} />);

        fireEvent.click(screen.getByText('Save'));

        expect(handleAdd).toHaveBeenCalledTimes(1);
        expect(handleAdd).toHaveBeenCalledWith(mockProperty);
    });
});
