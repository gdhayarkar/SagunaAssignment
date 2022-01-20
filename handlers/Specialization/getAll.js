`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async(req,res)=>{
    const getQuery = await queryHelper.getQuery('getAllSpecialization') 
    const rows = await dbhelper.get(getQuery)
    const response = {
        Specializations : rows
    }
    res.send(response)
}