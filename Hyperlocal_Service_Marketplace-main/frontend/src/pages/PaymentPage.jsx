import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStripe } from '../context/StripeContext';
import PaymentForm from '../components/Payment/PaymentForm';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createPaymentIntent, loading, error } = useStripe();
  const [clientSecret, setClientSecret] = useState('');

  const booking = location.state?.booking;
  
  useEffect(() => {
    if (!booking) {
      navigate('/services');
      return;
    }

    const initializePayment = async () => {
      try {
        const clientSecret = await createPaymentIntent(booking.total * 100); // Stripe expects amount in cents
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Payment initialization failed:', err);
      }
    };

    initializePayment();
  }, [booking]);

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Update booking status with payment information
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bookings/${booking._id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          status: 'paid',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Navigate to booking confirmation page
      navigate(`/track/${booking._id}`);
    } catch (err) {
      console.error('Failed to update booking:', err);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Complete Your Payment</h2>

        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Service Provider</span>
              <span>{booking.provider.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{new Date(booking.scheduledDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{booking.scheduledTime}</span>
            </div>
            
            {/* Services List */}
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Services</h4>
              {booking.services.map(service => (
                <div key={service._id} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span>₹{service.price}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{booking.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Payment Details</h3>
          {clientSecret ? (
            <PaymentForm
              amount={booking.total}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          ) : (
            <div className="text-center py-4">
              {loading ? (
                <div>Initializing payment...</div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : (
                <div>Loading payment form...</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;