import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCommentDots, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav style={navbarStyle}>
            <Link to="/home" style={linkStyle}>
                <FontAwesomeIcon icon={faHome} style={iconStyle} />
                Newsfeed
            </Link>
            <Link to="/chats" style={linkStyle}>
                <FontAwesomeIcon icon={faCommentDots} style={iconStyle} />
                Chats
            </Link>
            <Link to="/friends" style={linkStyle}>
                <FontAwesomeIcon icon={faUserFriends} style={iconStyle} />
                Friends
            </Link>
        </nav>
    );
};

// Styles
const navbarStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    padding: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    flexWrap: 'wrap', // Allow wrapping for small screens
};

// Media queries for responsive design
const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px', // Add space between items on small screens
};

// Icon style
const iconStyle = {
    marginRight: '8px',
};

// Responsive design using CSS-in-JS (Optional for advanced setup)
const styles = `
  @media (max-width: 768px) {
    nav {
        flex-direction: column; /* Stack links vertically */
        align-items: center;
    }
    a {
        margin-bottom: 15px; /* Spacing for mobile view */
    }
  }
`;

// Insert the CSS directly into the page (optional method)
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Navbar;
