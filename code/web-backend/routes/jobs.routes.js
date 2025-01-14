const express = require('express');
const jobsController = require('../controllers/jobsController');
const authenticateUser = require('../middlewares/authFirebase');

const router = express.Router();

// router.post('/jobs', authenticateUser, jobsController.createJob);
// router.get('/jobs/:postedBy', authenticateUser, jobsController.getAllJobs);
// router.get(
// 	'/jobsById/:postedById',
// 	authenticateUser,
// 	jobsController.getJobsById
// );
// router.delete('/jobs/:jobId', authenticateUser, jobsController.deleteJob);

router.get('/jobs/:postedBy', jobsController.getAllJobs);
router.get('/jobsById/:postedById', jobsController.getJobsById);
router.delete('/jobs/:jobId', jobsController.deleteJob);

router.post('/jobs', jobsController.createJob);

router.get('/offlinejobs', jobsController.getOfflineJobs);

module.exports = router;
