const { BalanceService } = require('./services');
const { BalanceRepository } = require('./repositories');
const { JobRepository } = require('../jobs/repositories');
const { UnauthorizedError } = require('../errors');

const balanceRepository = new BalanceRepository();
const jobRepository = new JobRepository();
const balanceService = new BalanceService({
  balanceRepository,
  jobRepository,
});

class BalanceController {
  static async depositClientBalance(req, res, next) {
    try {
      const { clientId } = req.profile;
      const { userId } = req.params;
      const { amount } = req.body;

      if (!clientId || Number(clientId) !== Number(userId)) {
        throw new UnauthorizedError('No permission to deposit to account');
      }

      await balanceService.depositClientBalance(amount, clientId);

      res.json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BalanceController;
