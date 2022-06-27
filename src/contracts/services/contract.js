class ContractService {
  constructor(repositories) {
    this.contractRepository = repositories.contractRepository;
  }

  getContractById(contractId, clientId, contractorId) {
    return this.contractRepository.getContractById(contractId, clientId, contractorId);
  }

  getContracts(clientId, contractId) {
    return this.contractRepository.getContracts(clientId, contractId);
  }
}

module.exports = ContractService;
