`use strict`


const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');
module.exports = async(req,res)=>{
  try{  
    let {Associate:associateDetails} = req.body;
    let getQuery = await queryHelper.getQuery('getAssociate',req.params.id) 
    let rows = await dbhelper.get(getQuery)
    let status ='Success';
    let response=  {
        Message : status
    };
    console.log(rows)
    if(!rows.length){
        response.Message =`Associate doesnt Exist's.`
        res.send(response)
        return 
    }

    getQuery = await queryHelper.getQuery('getSpecilization',associateDetails.specilizations) 
    rows = await dbhelper.get(getQuery)
    console.log('rows 2',rows)
    for(let curr of rows){
        associateDetails.associateId = req.params.id
        const updateQuery = await queryHelper.getQuery('updateAssociate',curr.specializationId,associateDetails)      
        dbhelper.create(updateQuery)
    }
    response.Message ='Associate Updated Succefully'
    res.send(response)
    logger.log('info','associate created successfully')  
    }catch(e){
     logger.log('error','error while creating associate',e)   
    }
}