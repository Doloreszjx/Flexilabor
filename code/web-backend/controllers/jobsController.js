const Jobs = require('../models/jobsModel');
const { successRes, errorRes } = require('../helpers/apiResponse');

// Create job
exports.createJob = async (req, res) => {
	console.log({ req });
	try {
		const job = new Jobs(req.body);
		await job.save();
		successRes(res, 'Job added successfully', job, 200);
	} catch (error) {
		errorRes(res, 'Error adding job', error);
	}
};

// Get jobs based on the logged in user role
// exports.getAllJobs = async (req, res) => {
// 	try {
// 		const jobs = await Jobs.find({ 'postedBy.role': req.params.postedBy });
// 		if (!jobs || jobs.length === 0) {
// 			return errorRes(res, 'No Jobs found', null, 404);
// 		}

// 		successRes(res, `Jobs posted by ${req.params.postedBy}`, jobs);
// 	} catch (error) {
// 		errorRes(res, 'Error retrieving jobs', error);
// 	}
// };
exports.getAllJobs = async (req, res) => {
	console.log('Received request for postedBy:', req.params.postedBy); // 确保正确收到参数
	try {
	  const jobs = await Jobs.find({ 'postedBy.role': req.params.postedBy });
	  if (!jobs || jobs.length === 0) {
		return errorRes(res, 'No Jobs found', null, 404);
	  }
	  successRes(res, `Jobs posted by ${req.params.postedBy}`, jobs);
	} catch (error) {
	  errorRes(res, 'Error retrieving jobs', error);
	}
  };
  

// Get jobs for offline pages
exports.getOfflineJobs = async (req, res) => {
	try {
		const jobs = await Jobs.find().limit(20);
		if (!jobs) return errorRes(res, 'No Jobs found', null, 404);
		successRes(res, `Offline Jobs`, jobs);
	} catch (error) {
		errorRes(res, 'Error retrieving jobs', error);
	}
};

// Get job by ID
exports.getJobsById = async (req, res) => {
	try {
		const jobs = await Jobs.find({
			'postedBy.uid': req.params.postedById,
		}).sort({ createdAt: -1 });
		if (!jobs) return errorRes(res, 'No Jobs found', null, 404);
		successRes(res, `Jobs posted by ${req.params.postedById}`, jobs);
	} catch (error) {
		errorRes(res, 'Error retrieving jobs', error);
	}
};

// Delete job
exports.deleteJob = async (req, res) => {
	try {
		const job = await Jobs.findByIdAndDelete(req.params.jobId);
		if (!job) {
			return errorRes(res, 'Job not found', null, 404);
		}
		successRes(res, 'Job deleted successfully', null, 200);
	} catch (error) {
		errorRes(res, 'Error deleting job', error);
	}
};
