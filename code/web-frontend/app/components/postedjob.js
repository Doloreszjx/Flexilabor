import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostedJob() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const userInfo = sessionStorage.getItem('userInfo');
      if (!userInfo) return;

      const uid = JSON.parse(userInfo).uid;
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobsById/${uid}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setJobs(response.data.data);
      } catch (err) {
        console.log("Failed to load jobs. Please try again later.");
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.log("Failed to delete job. Please try again later.");
    }
  };

  return (
    <div className="p-4 sm:p-8 m-auto border rounded-xl shadow-md bg-white h-screen overflow-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Jobs Posted</h2>
      <div className="hidden sm:block overflow-x-auto">
        {jobs.length > 0 ? (
          <table className="min-w-full text-left bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Location</th>
                <th className="px-4 py-2 border-b">Rate</th>
                <th className="px-4 py-2 border-b">Start Date</th>
                <th className="px-4 py-2 border-b">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{job.title}</td>
                  <td className="px-4 py-2 border-b">{job.address.city}</td>
                  <td className="px-4 py-2 border-b">{job.budget.max}</td>
                  <td className="px-4 py-2 border-b">{job.date.split('T')[0]}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-4 w-4"
                      >
                        <path
                          fill="currentColor"
                          d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Records found</p>
        )}
      </div>
      <div className="sm:hidden">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="p-4 mb-4 shadow-lg border rounded-lg bg-white"
            >
              <h3 className="font-bold text-lg mb-2">{job.title}</h3>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {job.address.city}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Budget:</strong> {job.budget.max}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Start Date:</strong> {job.date.split('T')[0]}
              </p>
              <button
                onClick={() => handleDelete(job._id)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No Records found</p>
        )}
      </div>
    </div>
  );
}
