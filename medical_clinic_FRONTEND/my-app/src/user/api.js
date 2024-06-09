import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api', withCredentials: true,
});

let intervalId = null;

const startTokenRefresh = (interval = 15 * 60 * 1000) => {
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    if (loggedIn && !intervalId) {
        const refreshToken = async () => {
            try {
                const response = await api.post('/login/refresh-token');
                if (response.status === 200) {
                    console.log('Token refreshed successfully');
                } else {
                    handleTokenExpiry();
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                handleTokenExpiry();
            }
        };

        intervalId = setInterval(refreshToken, interval);
    } else if (!loggedIn && intervalId) {
        stopTokenRefresh();
    }
};

const stopTokenRefresh = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
};

const handleTokenExpiry = () => {
    stopTokenRefresh();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('loggedIn');
    window.location.href = "/login";
};

api.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        handleTokenExpiry();
    }

    return Promise.reject(error);
});

export {startTokenRefresh, stopTokenRefresh, handleTokenExpiry, api};
