const express = require('express');
const BalanceController = require('./controller');

const router = express.Router();

router.post('/deposit/:userId', BalanceController.depositClientBalance);

module.exports = router;
