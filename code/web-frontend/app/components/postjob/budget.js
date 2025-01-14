import React, { useEffect, useState } from 'react';
import { useFormContext } from '../../../context/formContext';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Budget() {
	const { formData, updateFormData } = useFormContext();
	const router = useRouter();
	const [balance, setBalance] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [budget, setBudget] = useState({
		min: formData.budget?.min || '',
		max: formData.budget?.max || '',
		negotiable: formData.budget?.negotiable || false,
	});

	useEffect(() => {
		const fetchBalance = async () => {
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
				setBalance(response.data.data.netBalance);
				if (response.data.data.netBalance < 5) {
					setShowAlert(true);
					setTimeout(() => setShowAlert(false), 3000);
				}
			} catch (err) {
				console.error('Failed to load transactions. Please try again later.');
			}
		};

		fetchBalance();
	}, []);

	const handleSubmit = async () => {
		try {
			try {
				debugger;
				await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction`,
					{
						uid: JSON.parse(sessionStorage.getItem('userInfo')).uid,
						amount: 5,
						transactionType: 'DEBIT',
						createdAt: new Date(),
					},
					{
						headers: {
							Authorization: `Bearer ${sessionStorage.getItem('token')}`,
						},
					}
				);

				const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
				await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobs`,
					{
						...formData,
						budget,
						createdAt: new Date(),
						postedBy: { uid: userInfo?.uid, role: userInfo?.role },
					},
					{
						headers: {
							Authorization: `Bearer ${sessionStorage.getItem('token')}`,
						},
					} // 注视掉接口请求校验
				);
				router.push('/dashboard');
			} catch (error) {
				console.error('Error creating job1:', error);
			}
			// test: 先把余额校验注释掉
			// if (balance >= 5) {
			//   try {
			//     await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/transaction`, {
			//       uid: JSON.parse(sessionStorage.getItem('userInfo')).uid,
			//       amount: 5,
			//       transactionType: 'DEBIT',
			//       createdAt: new Date()
			//     }, {
			//       headers: {
			//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
			//       }
			//     });

			//     const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			//     await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobs`, {
			//       ...formData,
			//       budget,
			//       createdAt: new Date(),
			//       postedBy: { uid: userInfo?.uid, role: userInfo?.role }
			//     }, {
			//       headers: {
			//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
			//       }
			//     });
			//     router.push('/dashboard');

			//   } catch (error) {
			//     console.error("Error creating job:", error);
			//   }
			// } else {
			//   setShowAlert(true);
			//   setTimeout(() => setShowAlert(false), 3000);
			// }
		} catch (error) {
			console.error('Error creating job2:', error);
		}
	};

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => {
		setShowModal(false);
		router.push('/dashboard');
	};
	const handleConfirm = () => {
		setShowModal(false);
		handleSubmit();
	};

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6'>Budget</h2>
			{/* Template from Tailwind HyperUI */}
			{showAlert && (
				<div
					role='alert'
					className='fixed top-20 z-50 right-4 rounded border-s-4 border-red-500 bg-red-50 p-4 shadow-lg'
				>
					<strong className='block font-medium text-red-800'>
						Balance Low
					</strong>
					<p className='mt-2 text-sm text-red-700'>Please load your wallet</p>
				</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				<div className='mb-4'>
					<label className='block text-gray-700 mb-2'>Minimum Budget</label>
					<input
						type='number'
						value={budget.min}
						onChange={(e) => setBudget({ ...budget, min: e.target.value })}
						className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700 mb-2'>Maximum Budget</label>
					<input
						type='number'
						value={budget.max}
						onChange={(e) => setBudget({ ...budget, max: e.target.value })}
						className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
					/>
				</div>
			</div>

			<div className='mb-6'>
				<label className='flex items-center text-gray-700'>
					<input
						type='checkbox'
						checked={budget.negotiable}
						onChange={(e) =>
							setBudget({ ...budget, negotiable: e.target.checked })
						}
						className='mr-2'
					/>
					Negotiable Budget
				</label>
			</div>

			<div className='mt-6 flex justify-end'>
				<button
					onClick={handleOpenModal}
					className='px-6 py-2 bg-[#01ABF0] text-white rounded-lg hover:bg-blue-700'
					disabled={
						!(
							budget.min &&
							budget.max &&
							!isNaN(budget.min) &&
							!isNaN(budget.max) &&
							parseFloat(budget.min) <= parseFloat(budget.max)
						)
					}
				>
					Submit
				</button>
			</div>

			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-8 rounded-lg'>
						<h3 className='text-lg text-[#01ABF0] font-bold mb-4'>
							Posting a job costs $5.
						</h3>
						<p className='text-md mb-4'>Are you sure you want to continue?</p>
						<div className='flex gap-4 justify-end'>
							<button
								onClick={handleCloseModal}
								className='rounded-md cursor-pointer bg-white border px-5 py-2.5 text-base font-medium text-black'
							>
								Cancel
							</button>
							<button
								onClick={handleConfirm}
								className='rounded-md cursor-pointer bg-[#1D90F1] px-5 py-2.5 text-base font-medium text-white'
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
