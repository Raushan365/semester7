import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Create axios instance with base URL and credentials
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
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
      }
    };
    checkAuth();
  }, []);

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
        setUser(data.user);
        toast.success('Account created successfully');
        navigate('/');
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

  // Cart functions (same as before)
  const addToCart = (service) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === service.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== serviceId));
  };

  const updateQuantity = (serviceId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(serviceId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === serviceId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
        loading,
        register,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);