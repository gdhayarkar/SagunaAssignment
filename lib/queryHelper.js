`use strict`
const queryHelper = module.exports;

queryHelper.getQuery = async function(queryName,...args){
    let sql='';
    switch(queryName){
        case 'createAssociate':
           
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
        case 'getAssociate':
            sql = `select a.associateName as 'associateName', a.associateId as 'associateId', s.specilizationName as 'specilizationName' 
            from associates a, specialization s
            where a.specializationId = s.specializationId
            and a.associateId = '${args[0]}';`
            break;   
        case 'deleteAssociate':
            sql=`delete from associates where associateId = '${args[0]}';` 
            break;
        case 'createSpecialization':
            sql=`INSERT INTO Specialization(specilizationName) values('${args[0]}')`           
            break;
        case 'getAllSpecialization':
            sql=`select * from Specialization`          
            break;
        case 'getAssociate':
    
            sql=`select * from Associate where associateId = '${args[0]}'`    
            console.log(sql)       
            break;
        case 'updateAssociate':
            console.log(args)
            sql=`update associates set associateName='${args[1].name}',phone='${args[1].phone}',address='${args[1].address}',specializationId=${args[0]} where associateId = '${args[1].associateId}';`        
           // console.log(sql)
            break;        
        }
    return sql;
}
