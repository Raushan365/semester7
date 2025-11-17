import { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking } from '../utils/api';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings();
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found</div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {booking.service.title}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(booking.scheduledDate).toLocaleDateString()} at{' '}
                    {booking.scheduledTime}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">Service Price:</p>
                  <p className="font-semibold">₹{booking.totalAmount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Status:</p>
                  <p className="font-semibold capitalize">{booking.paymentStatus}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Address:</p>
                <p className="text-gray-800">
                  {booking.address.street}, {booking.address.city},{' '}
                  {booking.address.state} - {booking.address.zipCode}
                </p>
              </div>
              {booking.specialInstructions && (
                <div className="mb-4">
                  <p className="text-gray-600">Special Instructions:</p>
                  <p className="text-gray-800">{booking.specialInstructions}</p>
                </div>
              )}
              {booking.status === 'pending' && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsList;