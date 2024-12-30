import JobCard from '@/app/components/jobcard'
import JobDetails from '@/app/components/jobdetails'
import React, { useEffect, useState } from 'react'
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import Map from '@/app/components/map';
import axios from 'axios';
import { auth } from '../app/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ErrorPage from './errorPage';

// Search component from tailwind HyperUI
function Jobslist() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const role = JSON.parse(sessionStorage.getItem('userInfo'))?.role === 'Contractor' ? 'Customer' : 'Contractor';
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobs/${role}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setJobs(response.data.data);
        setFilteredJobs(response.data.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredJobs(
        jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  if (error) return <ErrorPage />;

  return (
    <div className="bg-blue-50">
      <Header />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#01abf0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : (
        <div className="container py-12 px-8 max-w-screen-xl mx-auto">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 min-h-screen">
            <div className="col-span-1">
              <div className="relative mb-8">
                <input
                  type="text"
                  id="Search"
                  placeholder="Search for..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border-gray-200 py-2.5 px-2 pe-10 shadow-sm sm:text-sm"
                />

                <span className="absolute  grid w-10 inset-y-0 end-0 place-content-center">
                  <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} selectedJob={selectedJob} onClick={() => setSelectedJob(job)} />
              ))}
            </div>

            <div className="col-span-2 inline-flex w-full">
              {selectedJob ? <JobDetails details={selectedJob} /> : (
                <section className="hidden lg:inline-flex w-full">
                  <Map searchResults={filteredJobs.map(el => el.address)} />
                </section>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Jobslist;
