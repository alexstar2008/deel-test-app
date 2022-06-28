const express = require('express');
const JobValidator = require('./validation');
const JobController = require('./controller');

const router = express.Router();

router.get('/unpaid', JobValidator.getActiveUnpaidJobs, JobController.getActiveUnpaidJobs);
router.post('/:jobId/pay', JobValidator.payJob, JobController.payJob);

module.exports = router;
