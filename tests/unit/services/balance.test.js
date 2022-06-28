const { balanceRepository, jobRepository } = require('../mocks');
const { BalanceService } = require('../../../src/balance/services');
const { AppError } = require('../../../src/errors');

describe('Balance service', () => {
  let balanceService;
  const correctAmount = 20;
  const incorrectAmount = 30;
  const clientId = 1;

  beforeAll(() => {
    balanceService = new BalanceService({
      balanceRepository,
      jobRepository,
    });
  });
  describe('depositClientBalance', () => {
    let updateClientBalanceSpy = null;
    let getClientJobsTotalAmount = null;

    beforeEach(() => {
      jest.clearAllMocks();
      updateClientBalanceSpy = jest.spyOn(balanceRepository, 'updateClientBalance');
      getClientJobsTotalAmount = jest.spyOn(jobRepository, 'getClientJobsTotalAmount');
    });
    it('should process successfully', async () => {
      const res = await balanceService.depositClientBalance(correctAmount, clientId);

      expect(getClientJobsTotalAmount).toHaveBeenCalledWith(clientId, true);
      expect(updateClientBalanceSpy).toHaveBeenCalledWith(correctAmount, clientId);
      expect(res).toEqual(undefined);
    });
    it('should faile due to amount restriction', async () => {
      await expect(async () => {
        await balanceService.depositClientBalance(incorrectAmount, clientId);
      }).rejects.toThrow(AppError);
      expect(getClientJobsTotalAmount).toHaveBeenCalledWith(clientId, true);
      expect(updateClientBalanceSpy).not.toHaveBeenCalled();
    });
  });
});
