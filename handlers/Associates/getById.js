`use strict`

const dbhelper = require('../../lib/dbHelper')
const queryHelper = require('../../lib/queryHelper')
const logger = require('../../lib/logHelper');

module.exports = async (req, res,next) => {
    try {
        const associateId = req.params.id;
        const query = await queryHelper.getQuery('getAssociate', associateId)
        const rows = await dbhelper.get(query);
        const result = await groupBy(rows, 'associateName')

        const response = {
            Associate: result
        }
        res.send(response)
    } catch (e) {
        logger.log('error', 'error while getting associate details', e)
        dbhelper.create('RollBack')
        next(e)
    }
}

async function groupBy(arr, col) {
    return arr.reduce((prev, curr) => {
        const key = curr[col];
        if (!prev[key]) {
            prev = {
                SpecilizationName: [],
            }
        }
        prev.SpecilizationName.push(curr.specilizationName)
        prev.AssociateName = curr.associateName
        prev.AssociateId = curr.associateId
        return prev;
    }, {})
}