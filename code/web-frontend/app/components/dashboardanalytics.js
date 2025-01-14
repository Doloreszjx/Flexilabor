import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadWalletModal from './loadWalletModal';
import { usePaymentContext } from '@/context/paymentContext';
import axios from 'axios';

function DashboardAnalytics() {
	const {
		isWalletModalOpen,
		openWalletModal,
		closeWalletModal,
	} = usePaymentContext();
	const router = useRouter();
	const [userInfo, setUserInfo] = useState({});
	const [balance, setBalance] = useState(0);
	const [jobs, setJobs] = useState([]);
	const [activeJobs, setActiveJobs] = useState(0);

	// useEffect(() => {
	//   setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')))
	//   const fetchBalance = async () => {
	//     const userInfo = sessionStorage.getItem('userInfo');
	//     if (!userInfo) return;
	//     const uid = JSON.parse(userInfo).uid;
	//     try {
	//       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction/${uid}`, {
	//         headers: {
	//           Authorization: `Bearer ${sessionStorage.getItem('token')}`,
	//         },
	//       });
	//       setBalance(response.data.data.netBalance);
	//     } catch (err) {
	//       console.error("Failed to load transactions. Please try again later.");
	//     }
	//   };

	//   fetchBalance();

	//   const fetchJobs = async () => {
	//     const uid = JSON.parse(sessionStorage.getItem('userInfo')).uid
	//     try {
	//       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobsById/${uid}`, {
	//         headers: {
	//           Authorization: `Bearer ${sessionStorage.getItem('token')}`,
	//         },
	//       });
	//       setJobs(response.data.data);
	//       const tomorrow = new Date();
	//       tomorrow.setDate(tomorrow.getDate() - 1);
	//       const active = response.data.data.filter((el) => new Date(el.date).getTime() > tomorrow.getTime());
	//       setActiveJobs(active.length)

	//     } catch (err) {
	//       console.log("Failed to load jobs. Please try again later.");
	//     }
	//   };

	//   fetchJobs();
	// }, []);
	useEffect(() => {
		debugger;
		const storedUserInfo = sessionStorage.getItem('userInfo');
		console.log({ storedUserInfo });
		const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
		setUserInfo(parsedUserInfo);

		const fetchBalance = async () => {
			if (!parsedUserInfo.uid) return;
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction/${parsedUserInfo.uid}`,
					{
						headers: {
							Authorization: `Bearer ${sessionStorage.getItem('token')}`, // test: 暂时先把校验关了
						},
					}
				);
				console.log({ response });
				setBalance(response.data.data.netBalance);
			} catch (err) {
				console.error('Failed to load transactions. Please try again later.');
			}
		};

		const fetchJobs = async () => {
			if (!parsedUserInfo.uid) return;
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobsById/${parsedUserInfo.uid}`,
					{
						headers: {
							Authorization: `Bearer ${sessionStorage.getItem('token')}`,
						},
					}
				);
				setJobs(response.data.data);
				const tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() - 1);
				const active = response.data.data.filter(
					(el) => new Date(el.date).getTime() > tomorrow.getTime()
				);
				setActiveJobs(active.length);
			} catch (err) {
				console.log('Failed to load jobs. Please try again later.');
			}
		};

		fetchBalance();
		fetchJobs();
	}, []);

	return (
		<div className='p-8  m-auto border rounded-xl shadow-md bg-white h-screen overflow-auto'>
			<h2 className='text-2xl font-bold mb-8 text-center'>Dashboard</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-6 bg-[#01ABF0] shadow-lg rounded-lg flex flex-col items-start'>
					<h3 className='text-lg font-semibold text-white'>
						Welcome to FlexiLabour,
					</h3>
					<p className='text-3xl font-bold text-white mt-2'>
						{userInfo.firstName + ' ' + userInfo.lastName || ''}
					</p>
				</div>
				<div className='p-6 bg-white shadow-lg rounded-lg flex flex-col items-start'>
					<h3 className='text-lg font-semibold text-gray-700'>Active Jobs</h3>
					<p className='text-3xl font-bold text-[#01ABF0] mt-2'>{activeJobs}</p>
				</div>

				<div className='p-6 bg-white shadow-lg rounded-lg flex flex-col items-start'>
					<h3 className='text-lg font-semibold text-gray-700'>Jobs Posted</h3>
					<p className='text-3xl text-[#01ABF0] font-bold mt-2'>
						{jobs.length}
					</p>
					<div className='mt-4 flex space-x-4'>
						<button
							className='px-4 py-2 bg-[#01ABF0] text-white rounded-lg'
							onClick={() => {
								router.push('postajob');
							}}
						>
							Post a Job
						</button>
					</div>
				</div>

				<div className='p-6 bg-white shadow-lg rounded-lg flex flex-col items-start'>
					<h3 className='text-lg font-semibold text-gray-700'>
						Wallet Balance
					</h3>
					<p className='text-3xl font-bold text-[#01ABF0] mt-2'>${balance}</p>
					<div className='mt-4 flex space-x-4'>
						<button
							className='px-4 py-2 bg-[#01ABF0] text-white rounded-lg'
							onClick={openWalletModal}
						>
							Update Balance
						</button>
					</div>
				</div>
			</div>
			<LoadWalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
		</div>
	);
}

export default DashboardAnalytics;
