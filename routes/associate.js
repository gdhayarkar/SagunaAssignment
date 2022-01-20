var express = require('express');
var router = express.Router();
var createAssociate = require('../handlers/Associates/create')
var get = require('../handlers/Associates/get')
var getById = require('../handlers/Associates/getById')
var deleteAssociate = require('../handlers/Associates/delete')
var updateAssociate = require('../handlers/Associates/update')
/* GET users listing. */
router.get('/', get);
router.get('/:id',getById);
router.delete('/delete/:id', deleteAssociate);
router.post('/create', createAssociate);
//router.post('/create/:id', create_associate);
router.put('/update/:id', updateAssociate);

module.exports = router;
