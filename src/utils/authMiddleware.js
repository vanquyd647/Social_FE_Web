
/**
 * Handle expired or invalid token errors by refreshing the token or logging out the user.
 * @param {Object} error - The error object from the HTTP client (e.g., Axios).
 * @param {Function} apiClient - The HTTP client instance used to resend requests (e.g., Axios instance).
 * @returns {Promise} - A resolved or rejected promise based on the token refresh attempt.
 */
const handleExpiredToken = async (error, apiClient, refreshTokenFn) => {
    const originalRequest = error.config;

    if (
        error.response?.status === 403 &&
        error.response?.data?.message === 'Invalid or expired token.' &&
        !originalRequest._retry
    ) {
        originalRequest._retry = true;

        try {
            const result = await refreshTokenFn();

            if (result.token) {
                originalRequest.headers['Authorization'] = `Bearer ${result.token}`;
                return apiClient(originalRequest);
            }
        } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError.message);
            return Promise.reject({
                ...refreshError,
                message: 'Session expired. Please log in again.',
            });
        }
    }

    return Promise.reject(error);
};

export default handleExpiredToken;

