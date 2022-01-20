`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async (req,res)=>{
    const associateId = req.params.id;
    const query =await queryHelper.getQuery('getAssociate',associateId)
    const rows = await dbhelper.get(query);
    const result = await groupBy(rows,'associateName')
    
    const response = {
        Associate : result
    }
    res.send(response)
}

async function groupBy(arr,col){
    return arr.reduce((prev,curr)=>{
        const key =curr[col];
        if(!prev[key]){
            prev={
                SpecilizationName:[],
            }
        }
        prev.SpecilizationName.push(curr.specilizationName)
        prev.AssociateName=curr.associateName
        prev.AssociateId = curr.associateId
        return prev;
    },{})
}