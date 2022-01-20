`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');


module.exports = async(req,res,next)=>{
    try{
    const getQuery = await queryHelper.getQuery('getAllSpecialization') 
    const rows = await dbhelper.get(getQuery)
    const response = {
        Specializations : rows
    }
    res.send(response)
    }catch(e){
        logger.log('error',`error while getting specialization`,e)
        next(e)
    }
}