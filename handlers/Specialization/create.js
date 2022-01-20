`use strict`
const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');

module.exports = async(req,res,next)=>
{
    try{
    let specializationDetails = req.body.Specialization;
    console.log(specializationDetails)
    const query = await queryHelper.getQuery('createSpecialization',specializationDetails.SpecializationName)
    dbhelper.create(query);
    const response = {
        Message : "Specilization created successfully"
    }
    res.send(response)
    }catch(e){
        logger.log('error',`error while creating specialization`,e)
        next(e)
    }   
}