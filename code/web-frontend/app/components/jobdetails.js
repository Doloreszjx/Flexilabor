import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

function JobDetails({ details }) {
  const user = auth.currentUser;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [balance, setBalance] = useState();

  const message = () => {
    if (!user) {
      router.push('/signin');
    } else {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      if (userInfo.contacts.includes(details.postedBy.uid)) {
        router.push('/messages')
      } else {
        setShowModal(true);
      }
    }
  };


  useEffect(() => {
    const fetchBalance = async () => {
      const userInfo = sessionStorage.getItem('userInfo');
      if (!userInfo) return;
      const uid = JSON.parse(userInfo).uid;
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction/${uid}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setBalance(response.data.data.netBalance);
        if (response.data.data.netBalance < 5) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }
      } catch (err) {
        console.error("Failed to load transactions. Please try again later.");
      }
    };
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleConfirm = async () => {
    try {
      if (balance >= 5) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction`, {
            uid: JSON.parse(sessionStorage.getItem('userInfo')).uid,
            amount: 5,
            transactionType: 'DEBIT',
            createdAt: new Date()
          }, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          const userId = JSON.parse(sessionStorage.getItem('userInfo')).uid;
          const contactUid = details.postedBy.uid


          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/addContact`, {
            userId,
            contactUid
          }, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          sessionStorage.setItem('userInfo', JSON.stringify(response.data))
          const response2 = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/addContact`, {
            userId: details.postedBy.uid,
            contactUid: JSON.parse(sessionStorage.getItem('userInfo')).uid
          }, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          });

          router.push('/messages');
          setShowModal(false);


        } catch (error) {
          console.error("Error getting message details", error);
        }
      } else {
        setShowAlert(true);
        setShowModal(false);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };

  const spam = () => {
    if (!user) {
      router.push('/signin');
    }
  };

  return (
    <div className="sticky p-6 w-full border rounded-xl shadow-md bg-white h-screen">
      {showAlert && (
        <div role="alert" className="fixed top-20 z-50 right-4 rounded border-s-4 border-red-500 bg-red-50 p-4 shadow-lg">
          <strong className="block font-medium text-red-800">Balance Low</strong>
          <p className="mt-2 text-sm text-red-700">Please load your wallet</p>
        </div>
      )}
      <div className="flex items-start mb-4">
        {details.image && (
          <div className="flex-shrink-0 mr-4">
            <Image
              src={details.image}
              width={192}
              height={192}
              alt="Job"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{details.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Posted on: {new Date(details.createdAt).toLocaleDateString()}</p>
          <span className="text-md pt-10 inline-flex items-center gap-1 text-gray-500 font-medium group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" viewBox="0 0 512 512">
              <path className="fill-gray-500 group-hover:fill-white" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>
            {details.time}
          </span>
          <div className="text-md text-gray-500 group-hover:text-white">
            <div className="inline-flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path className="fill-gray-500 group-hover:fill-white" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
              </svg>
              {(new Date(details.date)).toLocaleDateString()}
            </div>
            <br />
            <div className="inline-flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path className="fill-gray-500 group-hover:fill-white" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
              {details.address.unit}, {details.address.street}, {details.address.city},
              {details.address.state}, {details.address.country} - {details.address.pin}
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-gray-800 mb-1">Description</h3>
      <hr className="border-gray-200" />

      <div className="my-4">
        <p className="text-gray-700 text-lg leading-relaxed">{details.description}</p>
      </div>

      <hr className="border-gray-200 mt-8" />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-3xl font-semibold text-[#01abf0]">${details.budget?.max}</span>
        <div className="flex space-x-4 justify-end">
          <button
            onClick={message}
            className="px-4 py-2 bg-[#01abf0] hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
          >
            Message
          </button>
          <button
            onClick={spam}
            className="px-4 py-2 border border-gray-300 hover:border-red-500 text-gray-600 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            Report as spam
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h3 className='text-lg font-bold mb-4'>Unlock messaging for $5.</h3>
            <p className="text-md mb-4">Are you sure you want to continue?</p>
            <div className="flex gap-4 justify-end">
              <button onClick={handleCloseModal} className="rounded-md cursor-pointer bg-white border px-5 py-2.5 text-base font-medium text-black">Cancel</button>
              <button onClick={handleConfirm} className="rounded-md cursor-pointer bg-[#1D90F1] px-5 py-2.5 text-base font-medium text-white">Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default JobDetails;
