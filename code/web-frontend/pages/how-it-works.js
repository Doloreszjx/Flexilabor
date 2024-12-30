import Footer from '@/app/components/footer'
import Header from '@/app/components/header'
import React from 'react'
import Image from "next/image";

function HowItWorks() {
  return (
    <>
      <Header />
      <div className='bg-blue-50'>
        <div className="mx-auto pt-28 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <section className="lg:relative flex items-center bg-[#01ABF0] text-white p-12 rounded-xl">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mt-8 mb-4">
                How it Works?</h1>
              <p className="text-lg mb-6">
                A platform to help customers hire helping hands in an efficient and easy way. Our platform takes a small fee to connect you to the best skill based workers and contractors for your daily chores or other maintainence related activity. Our platform is designed to make every connection reliable and straightforward.</p>
            </div>

            <div className="hidden lg:flex lg:absolute lg:right-28 lg:bottom-[-100px] transform translate-x-1/4">
              <Image src="/howitworks.svg" alt="Worker" width={650} height={650} />
            </div>
          </section>

          <section className="text-black items-center grid  grid-rows-1 lg:grid-cols-3 p-12 rounded-xl">

            <div className="flex-col col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 ">
                Looking to hire a helping hand? </h1>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Create an Account</h3>
                  <p>Sign up and load your wallet, ready to use for post a job or connect with contractors.</p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg ">
                  <h3 className="text-xl font-bold">Post Your Job</h3>
                  <p>Describe the job and tell us your budget and other requirements. Contractors in your area will see your job listing and reach out to you.</p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Connect with Contractors</h3>
                  <p>Interested contractors can contact you by using their wallet credits to chat with you directly.</p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Hire with Confidence</h3>
                  <p>Choose the right contractor based on their experience.</p>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-col col-span-1 px-16" >
              <Image src="/customer.svg" alt="Worker" className="justify-center" width={550} height={550} />
            </div>


          </section>
          <section className="bg-[#01ABF0] text-white items-center grid  grid-rows-1 lg:grid-cols-3 p-12 rounded-xl">
            <div className="flex lg:flex-col col-span-1 px-16" >
              <Image src="/features.svg" alt="Worker" className="justify-center" width={550} height={550} />
            </div>
            <div className="flex-col col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 ">
                Looking to find work or build your team? </h1>
              <div className="grid grid-cols-1 gap-6">
                <div className="border border-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Sign Up and Load Credits</h3>
                  <p>Join the platform and top up your wallet to post jobs and contact customers.</p>
                </div>
                <div className="border border-white  p-6 rounded-lg ">
                  <h3 className="text-xl font-bold">Browse Jobs</h3>
                  <p>Find jobs posted by customers that your interested in.</p>
                </div>
                <div className="border border-white  p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Post a Job to Hire Workers</h3>
                  <p>If you need extra hands for a project, post a job with details, and skilled workers can contact you.</p>
                </div>
                <div className="border border-white  p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Browse Worker Profiles</h3>
                  <p>View profiles of local workers that match your requirements.</p>
                </div>
              </div>
            </div>


          </section>
        </div></div>

      <Footer />
    </>
  )
}

export default HowItWorks