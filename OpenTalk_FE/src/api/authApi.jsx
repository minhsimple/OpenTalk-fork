import axiosClient from './axiosClient';

const authApi = {
    login: (data) => axiosClient.post('/auth/login', data),
    register: (data) => axiosClient.post('/auth/register', data),
    logout: (token) => axiosClient.post('/auth/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
    refresh: (refreshToken) => axiosClient.post('/auth/refresh', {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    })
};

export default authApi;