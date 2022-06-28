const express = require('express');
const ContractValidator = require('./validation');
const ContractController = require('./controller');

const router = express.Router();

router.get('/:id', ContractValidator.getContractById, ContractController.getContractById);
router.get('/', ContractValidator.getContracts, ContractController.getContracts);

module.exports = router;
