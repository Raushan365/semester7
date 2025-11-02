import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Check for payment completion status when returning from Stripe redirect
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          onSuccess && onSuccess(paymentIntent);
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          onError && onError('Payment failed. Please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          onError && onError('Something went wrong with the payment.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-completion`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
      onError && onError(error.message);
    } else {
      setMessage('An unexpected error occurred.');
      onError && onError('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <PaymentElement id="payment-element" />
      </div>
      
      <button
        disabled={isLoading || !stripe || !elements}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <span>
          {isLoading ? 'Processing...' : `Pay ₹${amount}`}
        </span>
      </button>

      {message && (
        <div className={`mt-4 text-center ${
          message.includes('succeeded') ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;