const express = require('express');
const AdminController = require('./controller');

const router = express.Router();

router.get('/best-profession', AdminController.getMostEarnedProfession);
router.get('/best-clients', AdminController.getMostPaidClients);

module.exports = router;
