const { NotFoundError } = require('../errors');
const { ContractRepository } = require('./repositories');
const { ContractService } = require('./services');

const contractRepository = new ContractRepository();
const contractService = new ContractService({
  contractRepository,
});

class ContractController {
  static async getContractById(req, res, next) {
    try {
      const { id } = req.params;
      const { clientId, contractorId } = req.profile;

      const contract = await contractService.getContractById(id, clientId, contractorId);
      if (!contract) {
        throw new NotFoundError('Contract for current profile is not found');
      }
      res.json({
        success: true,
        contract,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getContracts(req, res, next) {
    try {
      const { clientId, contractorId } = req.profile;

      const contracts = await contractService.getContracts(clientId, contractorId);
      res.json({
        success: true,
        contracts,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ContractController;
