var express = require('express');
var router = express.Router();
var create_associate = require('../handlers/Associates/create')
var get = require('../handlers/Associates/get')
/* GET users listing. */
router.get('/', get);
router.post('/create', create_associate);

module.exports = router;
