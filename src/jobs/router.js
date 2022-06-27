const express = require('express');
const JobController = require('./controller');

const router = express.Router();

router.get('/unpaid', JobController.getActiveUnpaidJobs);
router.post('/:jobId/pay', JobController.payJob);

module.exports = router;
