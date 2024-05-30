import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
});

const refreshToken = async () => {
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
        try {
            const response = await api.post('/login/refresh-token', { refreshToken });
            if (response.status === 200) {
                localStorage.setItem('jwtToken', response.data.jwtToken);
                localStorage.setItem('jwtTokenExpiry', Date.now() + 15 * 60000); // Assuming the access token expires in 60 seconds
                console.log('Token refreshed successfully');
                return response.data.jwtToken;
            } else {
                handleTokenExpiry();
                return null;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            handleTokenExpiry();
            return null;
        }
    } else {
        console.log('No refresh token available');
        handleTokenExpiry();
        return null;
    }
};

const handleTokenExpiry = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtTokenExpiry');
    Cookies.remove('refreshToken');
    window.location.href = '/login';
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("debug1")
            originalRequest._retry = true;
            const newToken = await refreshToken();
            if (newToken) {
                console.log("debug2")
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } else {
                console.log("debug3")
                if (error.response.data === "Refresh token expired") {
                    console.log("debug4")
                    window.location.href = "/login";
                } else {
                    console.log("debug5")
                    console.error("Error:", error);
                }
            }
        } else {
            console.log("debug6")
            console.error("Error:", error);
        }
        return Promise.reject(error);
    }
);


export default api;
export { refreshToken };
