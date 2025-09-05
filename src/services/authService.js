import axios from 'axios';
const API_BASE_URL = 'https://mercartbackend.vercel.app';


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    async register(userData) {
    try {
        const response = await api.post('/api/register', userData);
        return response.data;
        } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en el registro');
        }
},

async login(credentials) {
    try {
        const response = await api.post('/api/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en el login');
    }
},

async googleAuth(accessToken) {
    try {
        const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const response = await api.post('/google-auth', userInfo.data);
        return response.data;
        } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en autenticación con Google');
    }
},

logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
},

isAuthenticated() {
    return !!localStorage.getItem('authToken');
},

getToken() {
    return localStorage.getItem('authToken');
    }
};