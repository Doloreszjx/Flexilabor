// index page
import Image from 'next/image';
import Header from './components/header';
import Footer from './components/footer';
import Link from 'next/link'

export default function Home() {
	return (
		<div>
			<Header />
			<div className='mx-auto max-w-screen-xl mt-6 px-4 sm:px-6 lg:px-8'>
				{/* Hero Section*/}
				<section className='lg:relative bg-[#01ABF0] text-white flex items-center p-12 rounded-xl'>
					<div className='lg:w-1/2'>
						<h1 className='text-4xl md:text-5xl font-bold mb-4'>
							Connecting You with Trusted Hands for Every Task
						</h1>
						<p className='text-lg mb-6'>
							Easily connect with skilled professionals for your home needs.
							From electricians to gardeners, we can help you hire.
						</p>

						

						<div className='space-x-4 mb-6' style={{ display: 'flex' }}>
							<a
								href='#'
								className='bg-white text-[#01ABF0] px-6 py-3 rounded-lg hover:bg-gray-100'
							>
								Browse Jobs for Contractor
							</a>
							
							<Link href="/jobsearch" passHref>
								<button className='bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#01ABF0]'>
								Browse Jobs for Workers
								</button>
							</Link>
							{/* <link href="/jobsearch">
								<a
									href='#'
									className='bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#01ABF0]'
								>
									Browse Jobs for Workers
								</a>						
							</link>							 */}
						</div>
					</div>

					<div className='hidden lg:flex lg:absolute lg:right-32 lg:bottom-[-200px] transform translate-x-1/4'>
						<Image src='/hero.svg' alt='Worker' width={550} height={550} />
					</div>
				</section>

				{/* Why Choose us? */}
				<section className='text-black'>
					<div className='max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
						<div className='max-w-xl'>
							<h2 className='text-4xl md:text-5xl font-bold mb-4'>
								Get a helping hand
							</h2>

							<p className='mt-4 text-black'>
								Whether you need help with repairs, maintenance, or any special
								projects, our platform makes hiring the right professionals
								stress-free. Post your job with your requirements and connect
								with a network of trusted contractors, while contractors can
								hire workers, too, for projects that need an extra hand.
							</p>
						</div>
						<div className='flex flex-col lg:flex-row justify-center items-center mt-8 space-y-6 lg:space-y-0 lg:space-x-12'>
							<div className='bg-white p-6 w-full shadow-lg flex-col rounded-lg items-center justify-center text-center'>
								<Image
									src='/Puzzle.svg'
									alt='reliable'
									className=' m-auto justify-center'
									width={200}
									height={200}
								/>
								<h3 className='text-xl font-bold'>Reliable Workers</h3>
								<p>We provide you with experienced workers you can rely on.</p>
							</div>
							<div className='bg-white p-6 w-full shadow-lg flex-col rounded-lg items-center justify-center text-center'>
								<Image
									src='/Safebox.svg'
									alt='affordable'
									className=' m-auto justify-center'
									width={200}
									height={200}
								/>
								<h3 className='text-xl font-bold'>Affordable Rates</h3>
								<p>Our rates are competitive and tailored for your needs.</p>
							</div>
							<div className='bg-white p-6 w-full shadow-lg flex-col rounded-lg items-center justify-center text-center'>
								<Image
									src='/Trophy.svg'
									alt='quality'
									className=' m-auto justify-center'
									width={200}
									height={200}
								/>
								<h3 className='text-xl font-bold'>Quality Service</h3>
								<p>
									Every worker is vetted to ensure they deliver the best
									service.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className='bg-[#01ABF0] text-white items-center grid  grid-rows-1 lg:grid-cols-3 p-12 rounded-xl'>
					<div className='flex lg:flex-col col-span-1 px-16'>
						<Image
							src='/features.svg'
							alt='Worker'
							className='justify-center'
							width={550}
							height={550}
						/>
					</div>
					<div className='flex-col col-span-2'>
						<h1 className='text-4xl md:text-5xl font-bold mb-8 '>
							We pride ourselves on connecting you with trusted professionals
						</h1>
						<div className='grid grid-cols-1 gap-6'>
							<div className='border border-white p-6 rounded-lg'>
								<h3 className='text-xl font-bold'>Find a Worker</h3>
								<p>Easily find skilled workers for your job requirements.</p>
							</div>
							<div className='border border-white  p-6 rounded-lg '>
								<h3 className='text-xl font-bold'>Hire a Contractor</h3>
								<p>Hire certified contractors to handle your projects.</p>
							</div>
							<div className='border border-white  p-6 rounded-lg'>
								<h3 className='text-xl font-bold'>Look for a Job</h3>
								<p>
									As a worker or contractor, find the perfect job that matches
									your skills.
								</p>
							</div>
						</div>{' '}
					</div>
				</section>
			</div>

			<Footer />
		</div>
	);
}
