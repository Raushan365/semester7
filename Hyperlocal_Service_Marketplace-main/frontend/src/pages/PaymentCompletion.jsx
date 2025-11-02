import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStripe } from '../context/StripeContext';

const PaymentCompletion = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (!clientSecret) {
      navigate('/');
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setStatus('success');
          setMessage('Payment successful! Your booking has been confirmed.');
          break;
        case 'processing':
          setStatus('processing');
          setMessage('Your payment is processing. We\'ll update you when payment is received.');
          break;
        case 'requires_payment_method':
          setStatus('failed');
          setMessage('Payment failed. Please try another payment method.');
          break;
        default:
          setStatus('failed');
          setMessage('Something went wrong with your payment.');
          break;
      }
    });
  }, [stripe]);

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'processing':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleContinue = () => {
    if (status === 'success') {
      navigate('/my-orders');
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        {/* Status Icon */}
        <div className={`mb-6 ${getStatusColor()}`}>
          {status === 'success' && (
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {status === 'processing' && (
            <svg className="w-16 h-16 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {status === 'failed' && (
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Status Message */}
        <h2 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {status === 'success' && 'Payment Successful!'}
          {status === 'processing' && 'Processing Payment'}
          {status === 'failed' && 'Payment Failed'}
        </h2>
        
        <p className="text-gray-600 mb-8">{message}</p>

        {/* Action Button */}
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          {status === 'success' ? 'View My Orders' : 'Return to Services'}
        </button>
      </div>
    </div>
  );
};

export default PaymentCompletion;