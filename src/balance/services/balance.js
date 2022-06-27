const { DEPOSIT_LIMIT } = require('../../constants');

class BalanceService {
  constructor(repositories) {
    this.balanceRepository = repositories.balanceRepository;
    this.jobRepository = repositories.jobRepository;
  }

  async depositClientBalance(amount, clientId) {
    const totalJobsPay = await this.jobRepository.getClientJobsTotalAmount(clientId, true);
    const amountPercentage = Math.round((amount * 100) / totalJobsPay);
    if (amountPercentage > DEPOSIT_LIMIT.MAX) {
      throw new Error(`Cant deposit amount  >= ${DEPOSIT_LIMIT.MAX}% of jobs to pay`);
    }

    await this.balanceRepository.updateClientBalance(amount, clientId);
  }
}

module.exports = BalanceService;
