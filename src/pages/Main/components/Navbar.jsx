import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#007BFF', color: '#fff' }}>
            <Link to="${process.env.REACT_APP_API_URL}/home" style={{ color: '#fff', textDecoration: 'none' }}>Newsfeed</Link>
            <Link to="${process.env.REACT_APP_API_URL}/chats" style={{ color: '#fff', textDecoration: 'none' }}>Chats</Link>
            <Link to="${process.env.REACT_APP_API_URL}/friends" style={{ color: '#fff', textDecoration: 'none' }}>Friends</Link>
        </nav>
    );
};

export default Navbar;
