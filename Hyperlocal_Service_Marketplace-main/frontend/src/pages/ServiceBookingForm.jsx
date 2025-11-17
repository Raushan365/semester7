import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const ServiceBookingForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { axios, createBooking } = useAppContext();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    scheduledDate: '',
    scheduledTime: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    specialInstructions: ''
  });

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`/services/${serviceId}`);
        setService(data);
      } catch (error) {
        toast.error('Error fetching service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  // Get available time slots
  const getTimeSlots = () => {
    return [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00'
    ];
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({
        service: serviceId,  // Changed from serviceId to service to match backend model
        ...bookingData,
        scheduledDate: new Date(bookingData.scheduledDate), // Convert string to Date object
        totalAmount: service.price
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Service not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <span className="flex items-center">
              <FaClock className="mr-2" />
              Duration: {service.duration} minutes
            </span>
            <span className="font-semibold text-emerald-600 text-lg">
              ₹{service.price}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={bookingData.scheduledDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select
                  name="scheduledTime"
                  value={bookingData.scheduledTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select a time slot</option>
                  {getTimeSlots().map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-emerald-600" />
                Service Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={bookingData.address.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={bookingData.address.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={bookingData.address.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={bookingData.address.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                name="specialInstructions"
                value={bookingData.specialInstructions}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Any specific requirements or instructions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
            >
              Request Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingForm;