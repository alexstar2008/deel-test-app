const express = require('express');
const bodyParser = require('body-parser');
const { getProfile } = require('./middleware/getProfile');
const { errorHandler } = require('./middleware/errorHandler');
const contractsRouter = require('./contracts/router');
const jobRouter = require('./jobs/router');
const adminRouter = require('./admin/router');
const balanceRouter = require('./balance/router');
const swaggerRouter = require('./tools/serveSwagger');

const app = express();
app.use(bodyParser.json());

/**
 * proper layered structure
 * no stupid injections to framework
 * framework - just for routing, nothing more
 */
app.use('/admin', adminRouter);
app.use('/api-docs', swaggerRouter);
app.use(getProfile);
app.use('/balances', balanceRouter);
app.use('/contracts', contractsRouter);
app.use('/jobs', jobRouter);
app.use(errorHandler);

module.exports = app;
