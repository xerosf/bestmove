import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock react-select and react-datepicker for App tests
vi.mock('react-select', () => ({
    __esModule: true,
    default: () => <div>Select Mock</div>,
}));

vi.mock('react-datepicker', () => ({
    __esModule: true,
    default: () => <div>DatePicker Mock</div>,
}));

describe('App Component', () => {
    test('renders Navbar and SearchPage on default route', () => {
        render(<App />);

        // Check navbar brand is rendered
        expect(screen.getByText('BestMove')).toBeInTheDocument();

        // Check search page heading is rendered
        expect(screen.getByText('Properties for Sale')).toBeInTheDocument();
    });
});
