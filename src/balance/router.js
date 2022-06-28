const express = require('express');
const BalanceValidator = require('./validation');
const BalanceController = require('./controller');

const router = express.Router();

router.post(
  '/deposit/:userId',
  BalanceValidator.depositClientBalance,
  BalanceController.depositClientBalance
);

module.exports = router;
