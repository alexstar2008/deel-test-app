const { ContractRepository } = require('./repositories');
const { ContractService } = require('./services');

const contractRepository = new ContractRepository();
const contractService = new ContractService({
  contractRepository,
});

class ContractController {
  static async getContractById(req, res) {
    const { id } = req.params;
    const { clientId, contractorId } = req.profile;

    const contract = await contractService.getContractById(id, clientId, contractorId);
    if (!contract) {
      res.status(404).send('Contact for current profile is not found');
      return;
    }
    res.json({
      success: true,
      contract,
    });
  }

  static async getContracts(req, res) {
    const { clientId, contractorId } = req.profile;

    const contracts = await contractService.getContracts(clientId, contractorId);
    res.json({
      success: true,
      contracts,
    });
  }
}

module.exports = ContractController;
