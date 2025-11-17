import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services
export const getServices = () => api.get('/services');
export const getServicesByCategory = (category) => api.get(`/services/category/${category}`);
export const getServiceById = (id) => api.get(`/services/${id}`);

// Bookings
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getUserBookings = () => api.get('/bookings/user');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const updatePaymentStatus = (id, paymentStatus, paymentId) => 
  api.put(`/bookings/${id}/payment`, { paymentStatus, paymentId });
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Payments
export const createPaymentIntent = (amount) => api.post('/payment/create-payment-intent', { amount });

// Authentication
export const register = (userData) => api.post('/user/register', userData);
export const login = (credentials) => api.post('/user/login', credentials);
export const getUserProfile = () => api.get('/user/profile');
export const updateUserProfile = (userData) => api.put('/user/profile', userData);

export default api;