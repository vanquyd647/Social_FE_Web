import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import { uploadImageAsync } from "../../components/uploadImage";

import './RegisterPage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !email || !password) {
            alert('Please fill all required fields');
            return;
        }

        setIsLoading(true); // Set loading to true when process starts
        try {
            console.log("Register data:", { username, email, password, avatar_url: selectedFile, bio });
            const avatarUrl = selectedFile ? await uploadImageAsync(selectedFile) : "https://firebasestorage.googleapis.com/v0/b/red89-f8933.appspot.com/o/Social_app%2Favatar.png?alt=media&token=081b5305-d9eb-4dc1-86ad-e9e106758550";
            const result = await dispatch(register({ username, email, password, avatar_url: avatarUrl, bio }));
            console.log("Register result:", result);

            if (result.error) {
                alert('Registration Failed: ' + result.error.message);
            } else {
                alert('OTP sent to your email. Verify your account.');
                navigate('/verify-otp', { state: { email } });
            }
        } catch (error) {
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state after process
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    return (
        <div className="container">
            <h1 className="title">Register</h1>
            <input
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <input
                className="input"
                placeholder="Bio (Optional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <div>
                <p>Choose Avatar</p>
                {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                <input type="file" onChange={handleFileSelect} />
            </div>
            <button className="button" onClick={handleRegister} disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
        </div>
    );
};

export default RegisterPage;
