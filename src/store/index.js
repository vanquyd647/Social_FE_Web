import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import friendReducer from './slices/friendSlice';
import chatReducer from './slices/chatSlice';
import messageReducer from './slices/messageSlice';

// Cấu hình Redux Store
const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        friends: friendReducer,
        chats: chatReducer,
        messages: messageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false, // Vẫn giữ nguyên để tránh cảnh báo không cần thiết
            serializableCheck: false, // Dùng khi cần lưu trữ dữ liệu không tuần tự
        }),
    devTools: process.env.NODE_ENV !== 'production', // Bật Redux DevTools ở môi trường phát triển
});

export default store;
