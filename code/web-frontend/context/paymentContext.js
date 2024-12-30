import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePaymentContext = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const openWalletModal = () => setWalletModalOpen(true);
  const closeWalletModal = () => setWalletModalOpen(false);

  const updatePaymentAmount = (amount) => setPaymentAmount(amount);

  return (
    <PaymentContext.Provider
      value={{
        isWalletModalOpen,
        openWalletModal,
        closeWalletModal,
        paymentAmount,
        updatePaymentAmount,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
