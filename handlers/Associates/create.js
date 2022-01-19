`use strict`

const {v4 : uuidv4} = require('uuid')
const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
module.exports = async(req,res)=>{
    
    let {associate:associateDetails} = req.body;
    associateDetails.associateId = uuidv4()
   
    const getQuery = await queryHelper.getQuery('getSpecilization',associateDetails.specilizations) 
    const rows = await dbhelper.get(getQuery)
    for(let curr of rows){
        associateDetails.associateId = uuidv4()
        const createQuery = await queryHelper.getQuery('createAssociate',curr.specializationId,associateDetails)      
        dbhelper.create(createQuery)
    }
    const response = {
        Message : "Associate created successfully"
    }
    res.send(response)
}