`use strict`

const { accepts } = require('express/lib/request')
const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async(req,res)=>{
    console.log('inside get associates')
    const getQuery = await queryHelper.getQuery('getAssociates') 
    const rows = await dbhelper.get(getQuery)
    // const rows2 = rows.map(curr =>{
    //    // console.log(curr)
    //     return curr.RowDataPacket;
    // })   
    // console.log(rows2)
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