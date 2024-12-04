import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Newsfeed from './components/Newsfeed';



const MainPage = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Newsfeed />} /> {/* Hiển thị Newsfeed */}
            </Routes>

        </>
    );
};

export default MainPage;
