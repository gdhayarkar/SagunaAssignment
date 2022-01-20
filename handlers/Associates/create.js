`use strict`

const {v4 : uuidv4} = require('uuid')
const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');
module.exports = async(req,res)=>{
  try{  
    let {Associate:associateDetails} = req.body;
    associateDetails.associateId = uuidv4()
    const createQuery = await queryHelper.getQuery('createAssociate',associateDetails)      
    dbhelper.create(createQuery)

    const getQuery = await queryHelper.getQuery('getSpecilization',associateDetails.specilizations) 
    const rows = await dbhelper.get(getQuery)
    console.log('rows',rows)
    for(let curr of rows){
        const createAssoSpec = await queryHelper.getQuery('createAssoSpec',associateDetails.associateId,curr.specializationId) 
        dbhelper.create(createAssoSpec)
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