`use strict`
const queryHelper = module.exports;

queryHelper.getQuery = async function(queryName,...args){
    let sql='';
    switch(queryName){
        case 'createAssociate':
            console.log("argumnts:",args)
            sql = `INSERT INTO Associates (associateId, associateName, phone, address, specializationId) VALUES ('${args[1].associateId}', '${args[1].name}', '${args[1].phone}', '${args[1].address}', ${args[0]})`
            break;
        case 'getSpecilization':
            sql = `select specializationId from Specialization where specilizationName in ('${args[0].join("','")}');`
            break;
        case 'getAssociates':
            sql = `select a.associateName as 'associateName', a.associateId as 'associateId', s.specilizationName as 'specilizationName' 
            from associates a, specialization s
            where a.specializationId = s.specializationId;`
            break;    
    }
    return sql;
}
