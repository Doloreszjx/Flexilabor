'use client';
import Header from '@/app/components/header';
import React, { useState } from 'react';
import '@/app/globals.css';
import Image from 'next/image';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth/web-extension';
import { auth } from '../app/firebase/config';
import { useRouter } from 'next/router';
import axios from 'axios';

function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth);

	const router = useRouter();
	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(email, password);
			if (res) {
				const user = auth.currentUser;
				if (user && user.getIdToken) {
					const token = await user.getIdToken(true);
					sessionStorage.setItem('token', token);

					console.log({ user });

					try {
						const response = await axios.get(
							`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/${email}`,
							{
								headers: {
									Authorization: `Bearer ${token}`, // 调用本地接口不需要进行firebase认证
								},
							}
						);

						console.log({ response });

						router.push('/dashboard');
						sessionStorage.setItem(
							'userInfo',
							JSON.stringify(response.data.data[0])
						);
					} catch (error) {
						console.error('Error getting  user:', error);
					}
				} else {
					console.error('User not authenticated or token generation failed.');
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Header />
			<div className='flex h-screen'>
				<div className='flex-1 bg-[#01ABF0] hidden lg:flex justify-center items-center'>
					<div>
						<Image
							src='/signin.svg'
							alt='Signin Image'
							width={400}
							height={500}
						/>
					</div>
				</div>

				{/* Login form */}
				<div className='flex-1 flex justify-center items-center bg-gray-50'>
					<div className='w-full max-w-lg p-8'>
						<h2 className='text-3xl font-bold mb-6 text-center'>
							Sign in to your account
						</h2>
						<form
							className='bg-white border drop-shadow-md	rounded-xl p-8'
							onSubmit={handleSignIn}
						>
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
							<div className='mb-4'>
								<input
									placeholder='Enter Password'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full p-3 border rounded-lg mt-2'
									required
								/>
								{/* <span
									className={
										('w-full p-3 border rounded-lg mt-2',
										isShowPassword ? 'show-password' : 'hide-password')
									}
								/> */}
							</div>
							<div className='flex justify-between items-center mb-4'>
								<label className='flex items-center'>
									<input type='checkbox' className='mr-2' />
									Remember me
								</label>
								<a href='#' className='text-sm text-blue-500'>
									Forgot password?
								</a>
							</div>
							{error && <p className='text-red-500'>{error.message}</p>}
							<button
								disabled={loading}
								className='w-full bg-[#01ABF0] text-white p-3 rounded'
							>
								{loading ? 'Signing in...' : 'Sign In'}
							</button>
							<div className='mt-4'>
								<button className='w-full bg-gray-100 text-gray-600 p-3 rounded flex items-center justify-center'>
									<Image
										src='/google.svg'
										alt='Google'
										width={20}
										height={20}
									/>
									<span className='ml-2'>Sign in with Google</span>
								</button>
							</div>
						</form>
						<p className='mt-4 text-sm text-center'>
							Don&apos;t have an account?{' '}
							<a
								onClick={() => router.push('/signup')}
								className='text-blue-500'
							>
								Sign up
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signin;
