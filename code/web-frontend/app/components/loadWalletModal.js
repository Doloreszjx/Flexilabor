import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { usePaymentContext } from '@/context/paymentContext';
import axios from 'axios';
import PaymentWrapper from './StripePayment';
import { useRouter } from 'next/navigation';

function LoadWalletModal({ isOpen, onClose }) {
  const [formValue, setFormValue] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const { updatePaymentAmount } = usePaymentContext();
  const user = auth.currentUser;
  const router = useRouter();

  const addMoney = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(formValue) * 100,
        user: { email: user.email },
      }),
    });

    const data = await response.json();
    if (data.clientSecret) {
      setClientSecret(data.clientSecret);
    }
  };

  const handlePaymentSuccess = async (amount) => {
    updatePaymentAmount(amount);
    onClose();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction`,
        {
          uid: JSON.parse(sessionStorage.getItem('userInfo')).uid,
          amount: amount,
          transactionType: 'CREDIT',
          createdAt: new Date()
        }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      router.refresh();
    } catch (error) {
      console.error("Error with stripe:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8 w-full max-w-lg border rounded-xl shadow-lg bg-white">
        <button
          className="absolute top-0 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &nbsp;<svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        </button>

        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Load Wallet</h2>
          <div className="mb-6">
            {!clientSecret ? (
              <form onSubmit={addMoney} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700">Amount to be added (AUD)</label>
                  <input
                    type="number"
                    name="credit"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full p-2 border rounded-lg border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!formValue}
                  className="w-full py-2.5 rounded-lg bg-[#01ABF0] text-white font-medium text-lg hover:bg-blue-700 transition duration-200"
                >
                  Add Money
                </button>
              </form>
            ) : (
              <PaymentWrapper
                clientSecret={clientSecret}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadWalletModal;
