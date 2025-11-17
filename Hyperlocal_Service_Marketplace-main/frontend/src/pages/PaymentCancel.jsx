import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('booking');

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was cancelled and no charges were made.
          </p>

          <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold text-gray-800 mb-2">What happens next?</h2>
            <p className="text-gray-700 mb-2">
              Your booking (ID: {bookingId}) has been saved but is not confirmed yet.
              You can try the payment again or make a new booking.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate(`/booking/${bookingId}`)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Try Payment Again
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

export default PaymentCancel;