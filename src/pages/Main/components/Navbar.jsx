import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#007BFF', color: '#fff' }}>
            <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>Newsfeed</Link>
            <Link to="/chats" style={{ color: '#fff', textDecoration: 'none' }}>Chats</Link>
            <Link to="/friends" style={{ color: '#fff', textDecoration: 'none' }}>Friends</Link>
        </nav>
    );
};

export default Navbar;
