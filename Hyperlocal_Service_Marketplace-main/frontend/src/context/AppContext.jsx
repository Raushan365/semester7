import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { io as ioClient } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Start as true while checking auth
  const navigate = useNavigate();

  // Create axios instance with base URL and credentials
  const API_BASE = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
  : 'http://localhost:5000/api';

  const axiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosInstance.get('/user/is-auth');
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Authentication check failed:", error.message);
      } finally {
        setLoading(false); // Always set loading to false after check completes
      }
    };
    checkAuth();
  }, []);

  // socket
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
    const s = ioClient(SOCKET_URL, { withCredentials: true });
    setSocket(s);

    s.on('connect', () => {
      // join admins room if user is admin
      if (user && user.isAdmin) {
        s.emit('join-user-room', { userId: user._id });
        // notify server to add to admins room by special event
        s.emit('join-admins-room');
      }
      // join personal room for user notifications
      if (user && user._id) {
        s.emit('join-user-room', { userId: user._id });
      }
    });

    // expose to window for simpler listeners in some components
    window.__APP_SOCKET__ = s;

    return () => {
      if (window.__APP_SOCKET__ === s) window.__APP_SOCKET__ = null;
      s.disconnect();
    };
  }, [user]);

  const updateProfile = async (formData) => {
    try {
      const { data } = await axios.put('/user/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/register', {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success('Registration successful! Please login to continue.');
        navigate('/login', { 
          state: { 
            registrationSuccess: true,
            email: email 
          }
        });
      } else {
        // Handle unsuccessful registration
        toast.error(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/login', {
        email,
        password,
      });
      if (data.success) {
        setUser(data.user);
        toast.success('Logged in successfully');
        navigate('/');
      } else {
        // Handle unsuccessful login (wrong credentials, etc.)
        toast.error(data.message || 'Login failed');
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/user/logout');
      if (data.success) {
        setUser(null);
        toast.success('Logged out successfully');
        navigate('/');
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Logout failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load cart from backend
  const loadCart = async () => {
    try {
      if (user) {
        const { data } = await axiosInstance.get('/cart');
        // Normalize cart items from backend: backend returns items with `.service` populated
        const normalized = (data.items || []).map((item) => {
          const svc = item.service || item; // support both shapes
          return {
            _id: svc._id || svc.id,
            title: svc.title || svc.name || '',
            description: svc.description || '',
            price: typeof svc.price === 'number' ? svc.price : Number(svc.price) || 0,
            duration: svc.duration || '',
            image: svc.image || '',
            category: svc.category || '',
            quantity: item.quantity || 1,
          };
        });

        setCart(normalized);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Failed to load cart');
    }
  };

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]); // Clear cart when user logs out
    }
  }, [user]);

  // Cart functions
  const addToCart = async (service) => {
    try {
      if (!user) {
        toast.error('Please login to add items to cart');
        navigate('/login');
        return;
      }

      const { data } = await axiosInstance.post('/cart/add', {
        serviceId: service._id,
        quantity: 1
      });

      // Normalize cart items from backend response
      const normalized = (data.items || []).map((item) => {
        const svc = item.service || item;
        return {
          _id: svc._id || svc.id,
          title: svc.title || svc.name || '',
          description: svc.description || '',
          price: typeof svc.price === 'number' ? svc.price : Number(svc.price) || 0,
          duration: svc.duration || '',
          image: svc.image || '',
          category: svc.category || '',
          quantity: item.quantity || 1,
        };
      });
      setCart(normalized);
      toast.success(`${service.title} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (serviceId) => {
    try {
      if (!user) return;

      const { data } = await axiosInstance.delete(`/cart/remove/${serviceId}`);
      // Normalize cart items from backend response
      const normalized = (data.items || []).map((item) => {
        const svc = item.service || item;
        return {
          _id: svc._id || svc.id,
          title: svc.title || svc.name || '',
          description: svc.description || '',
          price: typeof svc.price === 'number' ? svc.price : Number(svc.price) || 0,
          duration: svc.duration || '',
          image: svc.image || '',
          category: svc.category || '',
          quantity: item.quantity || 1,
        };
      });
      setCart(normalized);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (serviceId, newQuantity) => {
    try {
      if (!user) return;

      if (newQuantity < 1) {
        await removeFromCart(serviceId);
        return;
      }

      const { data } = await axiosInstance.put('/cart/update', {
        serviceId,
        quantity: newQuantity
      });

      // Normalize cart items from backend response
      const normalized = (data.items || []).map((item) => {
        const svc = item.service || item;
        return {
          _id: svc._id || svc.id,
          title: svc.title || svc.name || '',
          description: svc.description || '',
          price: typeof svc.price === 'number' ? svc.price : Number(svc.price) || 0,
          duration: svc.duration || '',
          image: svc.image || '',
          category: svc.category || '',
          quantity: item.quantity || 1,
        };
      });
      setCart(normalized);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const clearCart = async () => {
    try {
      if (!user) return;

      await axiosInstance.delete('/cart/clear');
      setCart([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Booking functions
  const createBooking = async (bookingData) => {
    try {
      const { data } = await axiosInstance.post('/bookings', bookingData);
      if (data.success) {
        toast.success('Booking request created successfully');
        navigate('/my-bookings');
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
      throw error;
    }
  };

  const getMyBookings = async () => {
    try {
      const { data } = await axiosInstance.get('/bookings/user');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch bookings');
      throw error;
    }
  };

  // Create Stripe payment session
  const createPaymentSession = async (bookingId, amount) => {
    try {
      const { data } = await axiosInstance.post('/payment/create-session', {
        bookingId,
        amount
      });
      
      if (data.url) {
        window.location.href = data.url;
      }
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment session creation failed');
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        searchQuery,
        setSearchQuery,
        axios: axiosInstance,
        socket,
        loading,
        register,
        login,
        logout,
        updateProfile,
        createPaymentSession,
        createBooking,
        getMyBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);