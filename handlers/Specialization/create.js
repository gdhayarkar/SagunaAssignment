`use strict`
const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async(req,res)=>
{
    let specializationDetails = req.body.Specialization;
    console.log(specializationDetails)
    const query = await queryHelper.getQuery('createSpecialization',specializationDetails.SpecializationName)
    dbhelper.create(query);
    const response = {
        Message : "Specilization created successfully"
    }
    res.send(response)
}