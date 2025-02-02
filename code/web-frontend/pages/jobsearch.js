import JobCard from '@/app/components/jobcard';
import JobDetails from '@/app/components/jobdetails';
import React, { useEffect, useState } from 'react';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import axios from 'axios';
import { auth } from '../app/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ErrorPage from './errorPage';
import './styles.css'; 

function ContractorJobs() {
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user] = useAuthState(auth);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedJobTypes, setSelectedJobTypes] = useState({
		'Full-time': true,
		'Part-time': true,
		Contract: true,
	});
	const [viewJobDetails, setViewJobDetails] = useState(false); // To toggle between job list and job details

	// Fetch jobs from the backend
	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URI}/offlinejobs`
				);
				setJobs(response.data.data); // Don't filter by role, keep all jobs
				setFilteredJobs(response.data.data);
				setLoading(false);
			} catch (err) {
				setError('Failed to load jobs. Please try again later.');
				setLoading(false);
			}
		};

		fetchJobs();
	}, [user]);

	// Filter jobs based on search term and selected job types
	useEffect(() => {
		let filtered = jobs;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter((job) =>
				job.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filter by selected job types
		if (Object.values(selectedJobTypes).includes(true)) {
			filtered = filtered.filter((job) =>
				selectedJobTypes[job.jobType] === true
			);
		}

		setFilteredJobs(filtered);
	}, [searchTerm, jobs, selectedJobTypes]);

	// Handle job type checkbox change
	const handleJobTypeChange = (event) => {
		const { name, checked } = event.target;
		setSelectedJobTypes((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	// Handle job card click to display job details
	const handleJobClick = (job) => {
		setSelectedJob(job);
		setViewJobDetails(true); // Set viewJobDetails to true when a job is clicked
	};

	// Handle return to job list
	const handleReturnToJobList = () => {
		setViewJobDetails(false); // Set viewJobDetails to false to go back to job list
	};

	if (error) return <ErrorPage />;

	return (
		<div className='bg-blue-50'>
			<Header />

			{loading ? (
				<div className='flex items-center justify-center min-h-screen'>
					<svg
						className='animate-spin -ml-1 mr-3 h-5 w-5 text-[#01abf0]'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						></path>
					</svg>
					Loading...
				</div>
			) : (
				<div className='container py-12 px-8 max-w-screen-xl mx-auto'>
					<div className='grid gap-6 grid-cols-1 lg:grid-cols-3 min-h-screen'>
						{/* Left Side: Search Box and Filters */}
						<div className='col-span-1'>
							{/* Search bar */}
							<div className='relative mb-8'>
								<input
									type='text'
									id='Search'
									placeholder='Search for...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full rounded-md border-gray-200 py-2.5 px-2 pe-10 shadow-sm sm:text-sm'
								/>
							</div>

							{/* Job Type Filters */}
							<div className='mb-8'>
								<div>
									<input
										type='checkbox'
										id='Full-time'
										name='Full-time'
										checked={selectedJobTypes['Full-time']}
										onChange={handleJobTypeChange}
									/>
									<label htmlFor='Full-time' className='ml-2'>
										Full-time
									</label>
								</div>
								<div>
									<input
										type='checkbox'
										id='Part-time'
										name='Part-time'
										checked={selectedJobTypes['Part-time']}
										onChange={handleJobTypeChange}
									/>
									<label htmlFor='Part-time' className='ml-2'>
										Part-time
									</label>
								</div>
								<div>
									<input
										type='checkbox'
										id='Contract'
										name='Contract'
										checked={selectedJobTypes['Contract']}
										onChange={handleJobTypeChange}
									/>
									<label htmlFor='Contract' className='ml-2'>
										Contract
									</label>
								</div>
							</div>
						</div>

						{/* Right Side: Job List or Job Details */}
						<div className='col-span-2'>
							{/* Show job details if selectedJob is set */}
							{viewJobDetails ? (
								<div>
									{/* Back Button */}
									<button
										className='back-button mb-4'
										onClick={handleReturnToJobList}
									>
										Back to Job List
									</button>

									<JobDetails details={selectedJob} />
								</div>
							) : (
								<div>
									{filteredJobs.map((job) => (
										<JobCard
											key={job._id}
											job={job}
											selectedJob={selectedJob}
											onClick={() => handleJobClick(job)}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
}

export default ContractorJobs;
