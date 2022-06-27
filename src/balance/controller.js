const { BalanceService } = require('./services');
const { BalanceRepository } = require('./repositories');
const { JobRepository } = require('../jobs/repositories');

const balanceRepository = new BalanceRepository();
const jobRepository = new JobRepository();
const balanceService = new BalanceService({
  balanceRepository,
  jobRepository,
});

class BalanceController {
  static async depositClientBalance(req, res) {
    const { clientId } = req.profile;
    const { userId } = req.params;
    const { amount } = req.body;

    if (!clientId || Number(clientId) !== Number(userId)) {
      res.status(401).send('No permission to deposit to account');
      return;
    }

    await balanceService.depositClientBalance(amount, clientId);

    res.json({
      success: true,
    });
  }
}

module.exports = BalanceController;
