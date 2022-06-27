const express = require('express');
const bodyParser = require('body-parser');
const { getProfile } = require('./middleware/getProfile');
const contractsRouter = require('./contracts/router');
const jobRouter = require('./jobs/router');
const adminRouter = require('./admin/router');
const balanceRouter = require('./balance/router');

const app = express();
app.use(bodyParser.json());

/**
 * proper layered structure
 * no stupid injections to framework
 * framework - just for routing, nothing more
 */
app.use('/admin', adminRouter);
app.use(getProfile);
app.use('/balances', balanceRouter);
app.use('/contracts', contractsRouter);
app.use('/jobs', jobRouter);

module.exports = app;
