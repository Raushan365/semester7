import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProviderTracking from '../components/Map/ProviderTracking';
import axios from 'axios';

const TrackService = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/bookings/${bookingId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setBooking(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch booking details');
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Service Confirmed';
      case 'in_progress':
        return 'Service in Progress';
      case 'completed':
        return 'Service Completed';
      case 'cancelled':
        return 'Service Cancelled';
      default:
        return 'Unknown Status';
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!booking) return <div className="text-center py-8">Booking not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Track Your Service</h2>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Booking Status</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-medium">{booking._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled Date</span>
              <span className="font-medium">
                {new Date(booking.scheduledDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled Time</span>
              <span className="font-medium">{booking.scheduledTime}</span>
            </div>
          </div>
        </div>

        {/* Provider Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-4">Service Provider</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="font-medium">{booking.provider.name}</p>
              <p className="text-gray-600">{booking.provider.phone}</p>
            </div>
            <a
              href={`tel:${booking.provider.phone}`}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Call Provider
            </a>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-4">Booked Services</h3>
          <div className="space-y-3">
            {booking.services.map(service => (
              <div key={service._id} className="flex justify-between">
                <span>{service.name}</span>
                <span className="font-medium">₹{service.price}</span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{booking.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Tracking */}
        {booking.status === 'in_progress' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Live Tracking</h3>
            <ProviderTracking
              bookingId={bookingId}
              initialUserLocation={booking.userLocation}
              initialProviderLocation={booking.providerLocation}
            />
          </div>
        )}

        {/* Cancel Button */}
        {booking.status === 'confirmed' && (
          <button
            onClick={() => {/* Handle cancellation */}}
            className="w-full mt-6 py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Cancel Service
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackService;