import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

function ErrorPage() {
  const router = useRouter();

  return (
    <>
    <Header/>
     <div className="flex flex-col justify-center h-screen items-center bg-blue-50 text-center px-4">
      <h1 className="text-7xl text-[#01ABF0] font-bold mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-8">Something went wrong. Please try again later.</p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-2 text-white bg-[#01abf0] shadow rounded-md hover:bg-blue-600 transition"
      >Go Back to Home
      </button>
    </div>
    <Footer/>
    </>
   
  );
}

export default ErrorPage;
