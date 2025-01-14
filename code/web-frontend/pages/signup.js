'use client';
import Header from '@/app/components/header';
import React, { useState } from 'react';
import '@/app/globals.css';
import Image from 'next/image';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase/config';
import { useRouter } from 'next/router';
import axios from 'axios';

function Signup() {
	const [role, setRole] = useState('');
	const images = {
		'': '/signup.svg',
		Contractor: '/signin.svg',
		Customer: '/signupcustomer.svg',
	};

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [workType, setWorkType] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isContractor, setIsContractor] = useState('');
	const [abn, setAbn] = useState('');
	const [tools, setTools] = useState('no');

	const router = useRouter();

	const [
		createUserWithEmailAndPassword,
		loading,
		error,
	] = useCreateUserWithEmailAndPassword(auth);

	const handleSignUp = async (e) => {
		// 检查环境变量是否正确加载
		console.log('API URL:', process.env.NEXT_PUBLIC_BACKEND_URI);

		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Password and Confirm Password doesn't match");
			return;
		}
		if (!email || !password) {
			alert('Please fill all fields');
			return;
		}

		try {
			const res = await createUserWithEmailAndPassword(email, password);
			debugger;
			if (res) {
				// debugger;
				console.log({ res });
				if (auth && auth.currentUser) {
					const user = auth.currentUser;
					const token = await user.getIdToken(true);
					const data = {
						firstName: firstName,
						lastName: lastName,
						email: email,
						role:
							role == 'Customer'
								? 'Customer'
								: isContractor == 'worker'
								? 'Worker'
								: 'Contractor',
						uid: res?.user?.uid,
					};
					abn != '' ? (data.abn = abn) : data;
					workType != '' ? (data.workType = workType) : data;
					tools != '' ? (data.tools = tools) : data;

					sessionStorage.setItem('token', token);
					sessionStorage.setItem('uid', user.uid); // 用uid作为用户识别的唯一标识
					try {
						// 添加日志确认环境变量
						console.log('API URL:', process.env.NEXT_PUBLIC_BACKEND_URI);
						const response = await axios.post(
							// 直接硬编码 URL 进行测试（后续确认环境变量后可改回）
							// 'http://localhost:5000/api/users', // 临时测试地址
							`${process.env.NEXT_PUBLIC_BACKEND_URI}/users`,
							data,
							{
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${token}`, // 调用本地接口不需要进行firebase认证
								},
								withCredentials: true, // 确保支持跨域凭据
							}
						);
						// 保存用户信息到sessionStorage
						sessionStorage.setItem(
							'userInfo',
							JSON.stringify(response.data.data)
						);
						// 跳转到dashboard界面
						router.push('/dashboard');
					} catch (error) {
						// console.error('Error creating user:', error);
						// 打印详细错误信息
						if (error.response) {
							// 请求成功发送，但服务器返回状态码错误
							console.error('Response error:', error.response.data);
							console.error('Status code:', error.response.status);
						} else if (error.request) {
							// 请求发送失败，没有收到服务器响应
							console.error('No response received:', error.request);
						} else {
							// 其他错误，例如配置错误
							console.error('Axios error:', error.message);
						}
					}
				} else {
					console.error('firebase注册失败，请重新创建账号');
				}
			} else {
				console.log(error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Header />
			<div className='flex'>
				<div className='flex-1 hidden bg-[#01ABF0] justify-center lg:flex items-center'>
					<div>
						<Image
							src={images[role]}
							alt='Signup Image'
							width={400}
							height={500}
						/>
					</div>
				</div>

				<div className='flex-1 flex justify-center items-center bg-blue-50'>
					<div className='w-full max-w-lg p-8'>
						<h2 className='text-3xl text-center font-bold mb-6'>
							Create a free account
						</h2>
						<div className='bg-white border drop-shadow-md	rounded-xl p-8'>
							{role == '' && (
								<div>
									<p className='text-center text-lg font-medium mb-8'>
										What do you want to register as?
									</p>
									<div className='grid grid-cols-2 gap-4 mb-6'>
										<button
											onClick={() => setRole('Contractor')}
											className='border border-gray-300 rounded px-8 py-24 text-center hover:bg-[#01ABF0] hover:text-white'
										>
											Register as a Contractor or Worker
										</button>
										<button
											onClick={() => setRole('Customer')}
											className='border border-gray-300 rounded px-8 py-24 text-center hover:bg-[#01ABF0] hover:text-white'
										>
											Register as a Customer
										</button>
									</div>
								</div>
							)}
							{role !== '' && (
								<form onSubmit={handleSignUp}>
									<div className='flex space-x-4 mb-4'>
										<div className='w-1/2'>
											<input
												placeholder='First Name'
												type='text'
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className='w-full p-3 border rounded-lg mt-2'
												required
											/>
										</div>

										<div className='w-1/2'>
											<input
												placeholder='Last Name'
												type='text'
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												className='w-full p-3 border rounded-lg mt-2'
												required
											/>
										</div>
									</div>

									<div className='mb-4'>
										<input
											placeholder='Email Address'
											type='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className='w-full p-3 border rounded-lg mt-2'
											required
										/>
									</div>

									{role == 'Contractor' && (
										<div>
											<div className='mb-4'>
												<select
													value={isContractor}
													onChange={(e) => setIsContractor(e.target.value)}
													className='w-full text-gray-400 p-3 border rounded-lg mt-2'
													required
												>
													<option value='' disabled>
														Register as a Contractor or Worker?
													</option>
													<option value='contractor'>Contractor</option>
													<option value='worker'>Worker</option>
												</select>
											</div>

											{isContractor == 'worker' && (
												<div className='mb-4'>
													<select
														value={workType}
														onChange={(e) => setWorkType(e.target.value)}
														className='w-full text-gray-400 p-3 border rounded-lg mt-2'
													>
														<option value='' disabled>
															Work Type
														</option>
														<option value='full time'>Full Time</option>
														<option value='part time'>Part Time</option>
														<option value='casual'>Casual</option>
													</select>
												</div>
											)}

											<div className='mb-4'>
												<input
													placeholder='Enter your ABN'
													type='text'
													value={abn}
													onChange={(e) => setAbn(e.target.value)}
													className='w-full p-3 border rounded-lg mt-2'
													required
												/>
											</div>

											<div className='mb-4'>
												<label className='block text-gray-700'>
													Do you have your own tools?
												</label>
												<div className='flex space-x-4 mt-2'>
													<label className='flex items-center'>
														<input
															type='radio'
															name='tools'
															value='yes'
															checked={tools === 'yes'}
															onChange={() => setTools('yes')}
															className='form-radio'
														/>
														<span className='ml-2'>Yes</span>
													</label>
													<label className='flex items-center'>
														<input
															type='radio'
															name='tools'
															value='no'
															checked={tools === 'no'}
															onChange={() => setTools('no')}
															className='form-radio'
														/>
														<span className='ml-2'>No</span>
													</label>
												</div>
											</div>
										</div>
									)}
									<div className='mb-4'>
										<input
											placeholder='Create Password'
											type='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className='w-full p-3 border rounded-lg mt-2'
											required
										/>
									</div>
									<div className='mb-4'>
										<input
											placeholder='Confirm Password'
											type='password'
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className='w-full p-3 border rounded-lg mt-2'
											required
										/>
									</div>

									<div className='mb-4 flex items-center'>
										<input type='checkbox' className='form-checkbox' required />
										<label className='ml-2 text-gray-700'>
											I agree with the{' '}
											<a href='#' className='text-[#01ABF0]'>
												Terms & Conditions of FlexiLabour
											</a>
										</label>
									</div>

									{error && <p className='text-red-500'>{error.message}</p>}

									<button
										type='submit'
										className='w-full bg-[#01ABF0] text-white p-3 rounded-lg hover:bg-blue-700'
										disabled={loading}
									>
										{!loading ? 'Sign Up' : 'Signing up...'}
									</button>
								</form>
							)}
						</div>
						<p className='mt-4 text-sm text-center'>
							Already have an account?{' '}
							<a
								onClick={() => router.push('/signin')}
								className='text-blue-500'
							>
								Sign in
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
