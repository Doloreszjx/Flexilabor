import React from 'react'

function JobCard({ job, onClick, selectedJob }) {
  return (
    <div className=" group cursor-pointer" onClick={onClick} >
      <div className={job._id == selectedJob?._id ? `group-hover:bg-[#1D90F1] bg-blue-100 p-4 mb-4 border rounded-2xl shadow-lg` : `group-hover:bg-[#1D90F1] bg-white p-4 mb-4 border rounded-2xl shadow-lg`}>
        <div className="flex justify-between ">
          <div>
            <h3 className="text-lg font-semibold group-hover:text-white group-hover:fill-white">{job.title}</h3>
            <span className="text-sm inline-flex items-center  gap-1 text-gray-500 font-medium group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-3 w-3 text-gray-500' viewBox="0 0 512 512"><path className='fill-gray-500 group-hover:fill-white' d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
              {job.time}</span>
          </div>
          <span className="pl-1 text-right">
            <span className="text-[#1D90F1] group-hover:text-white font-semibold text-lg mb-2">{'$' + job.budget.max}</span>
            <br />
            <span className="text-sm px-4 py-1 text-green-900 font-medium group-hover:text-[#1D90F1] group-hover:bg-white bg-green-50 rounded-full">{job.jobType}</span>
          </span>
        </div>
        <div className="text-sm text-gray-500 group-hover:text-white">
          <div className='inline-flex items-center  gap-1' ><svg className='h-3 w-3 text-gray-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path className='fill-gray-500 group-hover:fill-white' d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" /></svg>{(new Date(job.date)).toLocaleDateString()}</div>
          <br />
          <div className='inline-flex items-center  gap-1'><svg className='h-3 w-3 text-gray-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path className='fill-gray-500 group-hover:fill-white' d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>{job?.address?.street}</div>

        </div>
        {JSON.parse(sessionStorage.getItem('userInfo')) && <button className="mt-2 items-center inline-flex gap-1 text-[#1D90F1] font-semibold text-sm group-hover:text-white">
          <svg className='h-3 w-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">    <path className='fill-[#1D90F1] group-hover:fill-white' d="M160 368c26.5 0 48 21.5 48 48l0 16 72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6L448 368c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l96 0zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-21.3 0-6.4 0-.3 0-4 0-48-48 0-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L208 492z" /></svg>Send Message to the {JSON.parse(sessionStorage.getItem('userInfo')).role == 'Contractor' ? 'Customer' : 'Contractor'}</button>}
      </div>
    </div>
  )
}

export default JobCard