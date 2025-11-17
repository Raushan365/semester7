import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaClock, FaCheckCircle, FaMoneyBill } from 'react-icons/fa';

const MyBookings = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Listen for real-time booking updates
  useEffect(() => {
    if (!axios) return;
    const socket = window.__APP_SOCKET__;
    if (!socket && axios && axios.defaults) {
      // try to access socket from context (passed through AppContext)
    }
    // Prefer using socket from global if available (AppContext provides it)
    const s = window.__APP_SOCKET__ || null;
    if (s) {
      s.on('booking:update', (payload) => {
        // If the update is for this user's bookings, refresh
        if (payload?.booking?.user && payload.booking.user.toString() === (axios?.defaults?.headers?.common?.['x-user-id'] || '')) {
          fetchBookings();
        } else {
          // just reload to be safe
          fetchBookings();
        }
      });
    }

    return () => {
      if (s) s.off('booking:update');
    };
  }, [axios]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/bookings/user');
      console.log('Fetched bookings:', data.map(b => ({ id: b._id, status: b.status, paymentStatus: b.paymentStatus })));
      setBookings(data);
    } catch (error) {
      toast.error('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const booking = bookings.find(b => b._id === bookingId);
      if (!booking) {
        toast.error('Booking not found');
        return;
      }

      console.log('Initiating payment for booking:', bookingId, 'amount:', booking.totalAmount);

      const { data } = await axios.post('/payment/create-session', {
        bookingId,
        amount: booking.totalAmount
      });
      
      console.log('Payment session response:', data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('No payment URL returned');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Error initiating payment';
      toast.error(errorMessage);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'requested':
        return <FaClock className="text-yellow-500" />;
      case 'accepted':
        return <FaClock className="text-blue-500" />;
      case 'work_completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'payment_completed':
        return <FaMoneyBill className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'work_completed':
        return 'bg-green-100 text-green-800';
      case 'payment_completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No bookings found</p>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{booking.service.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTime}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 
                  ${getStatusBadgeColor(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">₹{booking.totalAmount}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Debug - Status: "{booking.status}" | Payment: "{booking.paymentStatus}"
                </div>

                {/* Always show buttons for debugging */}
                {(booking.status === 'work_completed' || booking.status === 'accepted') && booking.paymentStatus !== 'completed' && (
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Pay Now clicked for booking:', booking._id, 'status:', booking.status);
                        handlePayment(booking._id);
                      }}
                      disabled={booking.status !== 'work_completed'}
                      className={`w-full mt-4 py-2 px-4 rounded transition duration-300 cursor-pointer ${
                        booking.status === 'work_completed' 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                      type="button"
                      style={{ pointerEvents: 'auto', zIndex: 10 }}
                    >
                      {booking.status === 'work_completed' ? 'Pay Now' : `Wait for Work Completion (${booking.status})`}
                    </button>
                  </div>
                )}

                {booking.status === 'payment_completed' && (
                  <div className="mt-4 text-center text-green-600 font-semibold">
                    Payment Completed
                  </div>
                )}

                {booking.workCompletionNotes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">{booking.workCompletionNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;