const { Op } = require('sequelize');
const { CONTRACT_STATUS } = require('../../constants');
const { Contract } = require('../../model');

class ContractRepository {
  getContractById(contractId, clientId, contractorId) {
    const contractQuery = {
      id: contractId,
    };
    if (clientId) {
      contractQuery.ClientId = clientId;
    }
    if (contractorId) {
      contractQuery.ContractorId = contractorId;
    }
    return Contract.findOne({
      where: contractQuery,
    });
  }

  getContracts(clientId, contractorId) {
    const contractsQuery = {
      status: {
        [Op.not]: CONTRACT_STATUS.TERMINATED,
      },
    };
    if (clientId) {
      contractsQuery.ClientId = clientId;
    }
    if (contractorId) {
      contractsQuery.ContractorId = contractorId;
    }
    return Contract.findAll({
      where: contractsQuery,
    });
  }
}

module.exports = ContractRepository;
