import { Link } from 'react-router-dom';
import '/home/user/Documents/react/Shopping/src/styles/Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
        <div className="footer-copyright">
          2025 Shopping App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;