const { JobRepository } = require('./repositories');
const { BalanceRepository } = require('../balance/repositories');
const { JobService } = require('./services');

const jobRepository = new JobRepository();
const balanceRepository = new BalanceRepository();
const jobService = new JobService({
  jobRepository,
  balanceRepository,
});

class JobController {
  static async getActiveUnpaidJobs(req, res) {
    const { clientId, contractorId } = req.profile;
    const jobs = await jobService.getActiveUnpaidJobs(clientId, contractorId);
    res.json({
      success: true,
      jobs,
    });
  }

  static async payJob(req, res) {
    const { jobId } = req.params;
    const { clientId } = req.profile;
    if (!clientId) {
      res.status(401).send('No permission to pay for job');
      return;
    }
    await jobService.payJob(jobId, clientId);

    res.json({
      success: true,
    });
  }
}

module.exports = JobController;
