`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');


module.exports = async(req,res,next)=>{
   try{ 
    const query = await queryHelper.getQuery('deleteAssociate',req.params.id) 
    const rows = await dbhelper.get(query)
    const deleteAssSec = await queryHelper.getQuery('deleteAssoSpc',req.params.id)
    dbhelper.create(deleteAssSec);
    const affectedRows = rows.affectedRows;
    
    const status = affectedRows > 0? `${affectedRows} associate deleted successfully`
                    :affectedRows === 0
                    ? 'Assocaite not found':
                    'Failed to Delete Associate'
    const response = {
        message :status
    }
    res.send(response)
}catch(e){
    logger.log('error', 'error while deleting associate', e)

    next(e)
}
}