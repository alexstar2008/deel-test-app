const express = require('express');
const ContractController = require('./controller');

const router = express.Router();

router.get('/:id', ContractController.getContractById);
router.get('/', ContractController.getContracts);

module.exports = router;
