import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Snippet from Stripe 
const StripePayment = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);
    if (error) {
      console.error(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent.amount / 100);
    }
  };

  const cardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };

  return (
    <div>
      <CardElement options={cardElementOptions} />
      <button
        onClick={handlePayment}
        disabled={!stripe || loading}
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>
    </div>
  );
};

const PaymentWrapper = ({ clientSecret, onPaymentSuccess }) => (
  <Elements stripe={stripePromise}>
    <StripePayment clientSecret={clientSecret} onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default PaymentWrapper;
