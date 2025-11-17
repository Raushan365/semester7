import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ServiceBooking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { createPaymentSession } = useAppContext();
  const [provider, setProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/providers/${providerId}`);
        setProvider(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch provider details');
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, [providerId]);

  const getAvailableTimeSlots = () => {
    // This would typically come from the backend
    return [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const calculateTotal = () => {
    if (!provider) return 0;
    return selectedServices.reduce((total, serviceId) => {
      const service = provider.services.find(s => s._id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const handleBooking = async () => {
    try {
      setIsProcessing(true);
      const total = calculateTotal();
      
      // First create the booking
      const bookingData = {
        providerId,
        services: selectedServices,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        total
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings`,
        bookingData,
        {
          withCredentials: true
        }
      );

      // Create payment session and redirect to Stripe
      await createPaymentSession(response.data.bookingId, total);
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create booking');
      setError('Failed to create booking');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!provider) return <div className="text-center py-8">Provider not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Book Service with {provider.name}</h2>
        
        {/* Provider Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-2">Provider Information</h3>
          <p className="text-gray-600">{provider.description}</p>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Rating: </span>
            <span className="font-medium">{provider.rating} ⭐</span>
          </div>
        </div>

        {/* Service Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-4">Available Services</h3>
          <div className="space-y-3">
            {provider.services.map(service => (
              <div key={service._id} className="flex items-center justify-between">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service._id)}
                    onChange={() => handleServiceToggle(service._id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{service.name}</span>
                </label>
                <span className="font-medium">₹{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-4">Schedule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a time slot</option>
                {getAvailableTimeSlots().map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-2">
            {selectedServices.map(serviceId => {
              const service = provider.services.find(s => s._id === serviceId);
              return (
                <div key={serviceId} className="flex justify-between">
                  <span>{service.name}</span>
                  <span>₹{service.price}</span>
                </div>
              );
            })}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime || selectedServices.length === 0 || isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium
            ${(!selectedDate || !selectedTime || selectedServices.length === 0 || isProcessing)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isProcessing ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default ServiceBooking;