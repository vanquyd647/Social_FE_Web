const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setRefreshToken = (token) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);
