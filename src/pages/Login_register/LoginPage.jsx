import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';

import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth); // Access loading and error from the auth slice

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }

        const result = await dispatch(login({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            alert('Login successful!');
            navigate('/home'); // Redirect to the dashboard or another page
        } else {
            alert('Login failed: ' + result.payload);
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to the registration page
    }


    return (
        <div className="container">
            <h1 className="title">Login</h1>
            <input
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <input
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button className="button" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error">{error}</p>}
            <p>
                Don't have an account? <button className="button" onClick={handleRegister}>Register</button>
            </p>
        </div>
    );
};

export default LoginPage;
