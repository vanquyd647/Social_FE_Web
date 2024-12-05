import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCommentDots, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#007BFF', color: '#fff' }}>
            <Link to="/home" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
                Newsfeed
            </Link>
            <Link to="/chats" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faCommentDots} style={{ marginRight: '8px' }} />
                Chats
            </Link>
            <Link to="/friends" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: '8px' }} />
                Friends
            </Link>
        </nav>
    );
};

export default Navbar;
