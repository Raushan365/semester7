import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const bookingId = searchParams.get('booking');

  useEffect(() => {
    const completePayment = async () => {
      try {
        if (bookingId) {
          // First, manually complete the payment (simulating webhook for local dev)
          console.log('Completing payment for booking:', bookingId);
          await axios.post(`/payment/test-complete/${bookingId}`);
          console.log('Payment completion triggered');
          
          // Then fetch updated booking details
          const { data } = await axios.get(`/bookings/${bookingId}`);
          setBooking(data);
        }
      } catch (error) {
        console.error('Error completing payment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      completePayment();
    }
  }, [bookingId, axios]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-800">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <FaCheckCircle className="text-6xl text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed and the payment was successful.
          </p>
          
          {booking && (
            <div className="bg-emerald-50 rounded-lg p-4 mb-6 text-left">
              <h2 className="font-semibold text-emerald-800 mb-2">Booking Details:</h2>
              <p className="text-gray-700">Booking ID: {booking._id}</p>
              <p className="text-gray-700">Amount Paid: ₹{booking.total}</p>
              <p className="text-gray-700">Status: {booking.status}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;