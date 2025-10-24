import axiosInstance from './axiosConfig';

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  verify: async () => {
    const response = await axiosInstance.get('/auth/verify');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};
