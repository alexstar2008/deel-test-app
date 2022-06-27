class JobService {
  constructor(repositories) {
    this.jobRepository = repositories.jobRepository;
    this.balanceRepository = repositories.balanceRepository;
  }

  getActiveUnpaidJobs(clientId, contractorId) {
    return this.jobRepository.getActiveUnpaidJobs(clientId, contractorId);
  }

  async payJob(jobId, clientId) {
    const job = await this.jobRepository.getJob(jobId, clientId, true);
    if (!job) {
      throw new Error('Job is not found or paid already');
    }
    const profile = await this.balanceRepository.getClientBalance(clientId);
    if (profile.balance < job.price) {
      throw new Error('Not enough money to pay');
    }
    await this.jobRepository.updateJobPaidAndContractorBalance(jobId);
  }
}

module.exports = JobService;
