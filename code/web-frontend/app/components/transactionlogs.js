import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionLogs() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      const userInfo = sessionStorage.getItem('userInfo');
      if (!userInfo) return;

      const uid = JSON.parse(userInfo).uid;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        setTxns(response.data.data.transactions);
      } catch (err) {
        console.error("Failed to load transactions. Please try again later.");
      }
    };

    fetchTxns();
  }, []);

  return (
    <div className="p-4 sm:p-8 m-auto border rounded-xl shadow-md bg-white h-screen overflow-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Transaction Logs</h2>
      <div className="space-y-4">
        {txns.length > 0 ? (
          txns.map((txn) => (
            <div
              key={txn._id}
              className="p-4 border rounded-lg bg-white border-gray-50 flex shadow-sm justify-between items-center"
            >
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  <strong>Date:</strong> {txn.createdAt.split('T')[0]}
                </p>
                <p className="sm:text-base text-sm text-gray-600">
                  <strong>Amount: {txn.amount}</strong>
                </p>
              </div>
              <p
                className={` sm:text-base text-sm font-bold ${txn.transactionType === "DEBIT"
                  ? "text-red-500"
                  : "text-green-500"

                  }`}
              >
                {txn.transactionType}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm sm:text-base text-gray-500">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}
