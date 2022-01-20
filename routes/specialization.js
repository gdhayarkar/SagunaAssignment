var express = require('express');
var router = express.Router();
var createSpecilization = require('../handlers/Specialization/create')
 var get = require('../handlers/Specialization/getAll')
// var deleteAssociate = require('../handlers/Specialization/delete')
/* GET users listing. */
 router.get('/', get);
// router.get('/:id',getById);
// router.delete('/delete/:id', deleteAssociate);
router.post('/create', createSpecilization);

module.exports = router;