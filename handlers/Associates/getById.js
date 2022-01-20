`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async (req,res)=>{
    const associateId = req.params.id;
    const query =await queryHelper.getQuery('getAssociate',associateId)
    const rows = await dbhelper.get(query);
    const result = await groupBy(rows,'associateId')
    
    const response = {
        Associates : result
    }
    res.send(response)
}

async function groupBy(arr,col){
    return arr.reduce((prev,curr)=>{
        const key =curr[col];
        if(!prev[key]){
            prev[key]={AssociateName:null,
                SpecilizationName:[]
            }
        }
        prev[key].SpecilizationName.push(curr.specilizationName)
        prev[key].AssociateName=curr.associateName
        return prev;
    },{})
}