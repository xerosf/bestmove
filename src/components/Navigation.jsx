import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand-logo">
          BestMove
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Search</Link>
        </div>
      </div>
    </nav>
  );
}
