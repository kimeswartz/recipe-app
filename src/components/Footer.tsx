import { Link } from 'react-router-dom';
import '../styling/Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
