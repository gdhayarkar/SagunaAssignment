`use strict`


const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');

module.exports = async (req, res,next) => {
    try {
        let { Associate: associateDetails } = req.body;
        const getQuery = await queryHelper.getQuery('getAssociate', req.params.id)
        let rows = await dbhelper.get(getQuery)
        let response = {
            Message: 'Success'
        };

        if (!rows.length) {
            response.Message = `Associate doesnt Exist's.`

            res.send(response)
            return
        }
        associateDetails.associateId = req.params.id;
        const updateQuery = await queryHelper.getQuery('updateAssociate', associateDetails)
        dbhelper.create(updateQuery)
        if (associateDetails.specilizations) {
            const ascGetQuery = await queryHelper.getQuery('getAssoSpec', associateDetails.associateId);
            const rows = await dbhelper.get(ascGetQuery);
            console.log('asso spec ====', rows)
            for (let curr of rows) {
                const createAssoSpec = await queryHelper.getQuery('updateAssoSpec', associateDetails.associateId, curr.specializationId)
                dbhelper.create(createAssoSpec)
            }
        }
        response.Message = 'Associate Updated Succefully'
        res.send(response)
        logger.log('info', 'associate created successfully')
    } catch (e) {
        logger.log('error', 'error while updating associate', e)
        next(e)
    }
}