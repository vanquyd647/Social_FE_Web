import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider từ react-redux
import store from './store';  // Đảm bảo bạn import đúng store

import RegisterPage from './pages/Login_register/RegisterPage';
import LoginPage from './pages/Login_register/LoginPage';
import VerifyOtpPage from './pages/Login_register/VerifyOtpPage';
import ChatList from '../src/pages/Main/components/ChatList';
import FriendList from '../src/pages/Main/components/FriendList';
import MainPage from '../src/pages/Main/MainPage';
import ChatRoom from '../src/pages/Chat/ChatRoom';

function App() {
  return (
    // Bọc toàn bộ ứng dụng trong Provider và truyền store vào
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="${process.env.REACT_APP_API_URL}/" element={<LoginPage />} />
          <Route path="${process.env.REACT_APP_API_URL}/register" element={<RegisterPage />} />
          <Route path="${process.env.REACT_APP_API_URL}/verify-otp" element={<VerifyOtpPage />} />
          <Route path="${process.env.REACT_APP_API_URL}/home" element={<MainPage />} />
          <Route path="${process.env.REACT_APP_API_URL}/chats" element={<ChatList />} />
          <Route path="${process.env.REACT_APP_API_URL}/friends" element={<FriendList />} />
          <Route path="${process.env.REACT_APP_API_URL}/chat-room/:chatRoomId/:userId" element={<ChatRoom />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
