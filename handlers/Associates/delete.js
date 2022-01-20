`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')

module.exports = async(req,res)=>{
    
    const query = await queryHelper.getQuery('deleteAssociate',req.params.id) 
    const rows = await dbhelper.get(query)
    
    const affectedRows = rows.affectedRows;
    const status = affectedRows > 0? `${affectedRows} associate deleted successfully`
                    :affectedRows === 0
                    ? 'Assocaite not found':
                    'Failed to Delete Associate'
    const response = {
        message :status
    }
    res.send(response)

}