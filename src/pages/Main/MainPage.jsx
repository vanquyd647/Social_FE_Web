import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Newsfeed from './components/Newsfeed';



const MainPage = () => {
    return (
        <>
            <Routes>
                <Route path="${process.env.REACT_APP_API_URL}/" element={<Newsfeed />} /> {/* Hiển thị Newsfeed */}
            </Routes>

        </>
    );
};

export default MainPage;
