`use strict`

const {v4 : uuidv4} = require('uuid')
const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');
module.exports = async(req,res)=>{
  try{  
    let {Associate:associateDetails} = req.body;
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
    logger.log('info','associate created successfully')  
    }catch(e){
     logger.log('error','error while creating associate',e)   
    }
}