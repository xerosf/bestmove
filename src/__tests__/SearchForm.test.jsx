import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

// Mock react-select and react-datepicker for Jest
vi.mock('react-select', () => ({
    __esModule: true,
    default: ({ options, onChange }) => (
        <select
            data-testid="type-select"
            onChange={(e) => onChange(options.find((o) => o.value === e.target.value))}
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    ),
}));

vi.mock('react-datepicker', () => ({
    __esModule: true,
    default: (props) => (
        <input
            data-testid="date-picker"
            onChange={(e) => props.onChange([new Date(e.target.value), new Date(e.target.value)])}
        />
    ),
}));

describe('SearchForm Component', () => {
    test('renders all form inputs correctly', () => {
        render(<SearchForm onSearch={() => { }} />);

        expect(screen.getByText('Property Type')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search Postcode...')).toBeInTheDocument();
        expect(screen.getByText('Price Range')).toBeInTheDocument();
        expect(screen.getByText('Bedrooms')).toBeInTheDocument();
    });

    test('calls onSearch with correct filters when submitted', () => {
        const handleSearch = vi.fn();
        render(<SearchForm onSearch={handleSearch} />);

        // Update postcode filter
        fireEvent.change(screen.getByPlaceholderText('Search Postcode...'), {
            target: { value: 'BR1' },
        });

        // Update min price filter
        fireEvent.change(screen.getByPlaceholderText('Min Price'), {
            target: { name: 'minPrice', value: '200000' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Search Properties'));

        expect(handleSearch).toHaveBeenCalledTimes(1);
        expect(handleSearch).toHaveBeenCalledWith(
            expect.objectContaining({
                postcodeArea: 'BR1',
                minPrice: '200000',
            })
        );
    });
});
