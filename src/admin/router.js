const express = require('express');
const AdminValidator = require('./validation');
const AdminController = require('./controller');

const router = express.Router();

router.get(
  '/best-profession',
  AdminValidator.getMostEarnedProfession,
  AdminController.getMostEarnedProfession
);
router.get('/best-clients', AdminValidator.getMostPaidClients, AdminController.getMostPaidClients);

module.exports = router;
