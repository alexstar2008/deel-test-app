const { JobRepository } = require('./repositories');
const { BalanceRepository } = require('../balance/repositories');
const { JobService } = require('./services');
const { UnauthorizedError } = require('../errors');

const jobRepository = new JobRepository();
const balanceRepository = new BalanceRepository();
const jobService = new JobService({
  jobRepository,
  balanceRepository,
});

class JobController {
  static async getActiveUnpaidJobs(req, res, next) {
    try {
      const { clientId, contractorId } = req.profile;
      const jobs = await jobService.getActiveUnpaidJobs(clientId, contractorId);
      res.json({
        success: true,
        jobs,
      });
    } catch (e) {
      next(e);
    }
  }

  static async payJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const { clientId } = req.profile;
      if (!clientId) {
        throw new UnauthorizedError('No permission to pay for job');
      }
      await jobService.payJob(jobId, clientId);

      res.json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = JobController;
