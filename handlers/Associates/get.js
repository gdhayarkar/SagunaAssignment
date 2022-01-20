`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async(req,res)=>{
  
    const getQuery = await queryHelper.getQuery('getAssociates') 
    const rows = await dbhelper.get(getQuery)
    const associates = await groupBy(rows,'associateName')
    
    const response = {
        Associates : associates
    }
    res.send(response)
}

async function groupBy(arr,col){
    return arr.reduce((prev,curr)=>{
        const key =curr[col];
        if(!prev[key]){
            prev[key]={AssociateId:null,
                SpecilizationName:[]
            }
        }
        prev[key].SpecilizationName.push(curr.specilizationName)
        prev[key].AssociateId=curr.associateId
        return prev;
    },{})
}