const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/openapi.yml'));

router.use(swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
