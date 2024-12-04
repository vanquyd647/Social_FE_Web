import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../store/slices/authSlice';

import './VerifyOtpPage.css';


const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const handleVerifyOtp = async () => {
        if (!otp) {
            alert('Please enter the OTP.');
            return;
        }

        const result = await dispatch(verifyOtp({ email, otp }));
        if (result.payload.success) {
            alert('OTP verified. You can now log in.');
            navigate('/login');
        } else {
            alert('Verification Failed: ' + result.payload.message);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Verify OTP</h1>
            <input
                className="input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
            />
            <button className="button" onClick={handleVerifyOtp}>Verify</button>
        </div>
    );
};

export default VerifyOtpPage;
