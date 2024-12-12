import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';  
import store from './store';  

import RegisterPage from './pages/Login_register/RegisterPage';
import LoginPage from './pages/Login_register/LoginPage';
import VerifyOtpPage from './pages/Login_register/VerifyOtpPage';
import ChatList from '../src/pages/Main/components/ChatList';
import FriendList from '../src/pages/Main/components/FriendList';
import MainPage from '../src/pages/Main/MainPage';
import ChatRoom from '../src/pages/Chat/ChatRoom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path="/chat-room/:chatRoomId/:userId" element={<ChatRoom />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
