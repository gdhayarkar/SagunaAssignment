`use strict`
const logger = require('../../lib/logHelper');

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async(req,res,next)=>{
  
    try{
    const getQuery = await queryHelper.getQuery('getAssociates') 
    const rows = await dbhelper.get(getQuery)
    const associates = await groupBy(rows,'associateId')
    
    const response = {
        Associates : associates
    }
    res.send(response)
}
catch(e){
    logger.log('error','error while getting associates',e)   
    dbhelper.create('RollBack')
    next(e)
}
}

async function groupBy(arr,col){
    return arr.reduce((prev,curr)=>{
        const key =curr[col];
        if(!prev[key]){
            prev[key]={
                SpecilizationName:[]
            }
        }
        prev[key].SpecilizationName.push(curr.specilizationName)
        prev[key].AssociateId=curr.associateId
        prev[key].AssociateName=curr.associateName
        
        return prev;
    },{})
}