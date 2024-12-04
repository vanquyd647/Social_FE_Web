import axios from 'axios';
import { getToken, setToken, getRefreshToken, setRefreshToken } from './storage';


const apiClient = axios.create({
    baseURL: 'https://social-be-hyzv.onrender.com/api/', // API backend
    headers: { 'Content-Type': 'application/json' },
});

// **Handle expired token and refresh it**
const handleExpiredToken = async (error, apiClient) => {
    const originalRequest = error.config;

    // Check if error is due to an expired token and retry hasn't been attempted
    if (
        (error.response?.status === 403 || error.response?.status === 401) &&
        error.response?.data?.message === 'Invalid or expired token.' &&
        !originalRequest._retry
    ) {
        originalRequest._retry = true; // Mark request as retried
        const refreshToken = getRefreshToken(); // Retrieve refresh token

        if (refreshToken) {
            try {
                // Use userApi.refreshToken to refresh tokens
                const response = await userApi.refreshToken({ refreshToken });

                if (response.data?.token) {
                    // Store the new access token and refresh token
                    setToken(response.data.token);
                    setRefreshToken(response.data.refreshToken);

                    // Update the original request headers with the new token
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;

                    // Retry the original request
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError.message);
                return Promise.reject({ ...refreshError, message: 'Session expired. Please log in again.' });
            }
        }
    }

    return Promise.reject(error);
};

// **Interceptor for Requests**
apiClient.interceptors.request.use((config) => {
    const token = getToken(); // Retrieve access token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
});

// **Interceptor for Responses**
apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => handleExpiredToken(error, apiClient) // Handle expired token errors
);

// **User API**
const userApi = {
    register: (userData) => apiClient.post('users/register', userData),
    verifyOtp: (otpData) => apiClient.post('users/verify-otp', otpData),
    login: (loginData) => apiClient.post('users/login', loginData),
    getUser: () => apiClient.get('users/user'),
    logout: (logoutData) => apiClient.post('users/logout', logoutData),
    refreshToken: (data) => apiClient.post('users/refresh-token', data),
    sendResetPasswordOtp: (emailData) => apiClient.post('users/send-reset-password-otp', emailData),
    resetPasswordWithOtp: (resetData) => apiClient.post('users/reset-password', resetData),
};

// **Post API**
const postApi = {
    createPost: (postData) => apiClient.post('posts', postData),
    getPosts: () => apiClient.get('posts'),
    likePost: (postId, userId) => apiClient.post(`posts/${postId}/like`, { user_id: userId }),
    addComment: (postId, commentData) => apiClient.post(`posts/${postId}/comment`, commentData),
};

// **Friend API**
const friendApi = {
    searchUsers: (query) => apiClient.get('friendships/search', { params: { query } }),
    sendFriendRequest: (data) => apiClient.post('friendships/send', data),
    acceptFriendRequest: (data) => apiClient.post('friendships/accept', data),
    removeFriend: (data) => apiClient.delete('friendships/remove', { data }),
    getFriendsList: () => apiClient.get('friendships/list'),
    getSentRequests: () => apiClient.get('friendships/requests'),
    getReceivedRequests: () => apiClient.get('friendships/pending'),
};

// **Chat API**
const chatApi = {
    createChatRoom: (chatData) => apiClient.post('chats/create', chatData),
    getUserChats: () => apiClient.get('chats/chatrooms'),
};

// **Message API**
const messageApi = {
    sendMessage: (roomId, messageData) => apiClient.post(`/messages/${roomId}/send`, messageData),
    getMessagesInRoom: (roomId) => apiClient.get(`/messages/${roomId}/messages`),
};

export { userApi, postApi, friendApi, chatApi, messageApi };
