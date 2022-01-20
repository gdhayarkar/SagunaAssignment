`use strict`
const queryHelper = module.exports;
const logger = module.exports;
queryHelper.getQuery = async function(queryName,...args){
    let sql='';
 try{
    switch(queryName){
        case 'createAssociate':
            sql = `INSERT INTO Associates (associateId, associateName, phone, address) VALUES ('${args[0].associateId}', '${args[0].name}','${args[0].phone}', '${args[0].address}')`
            break;
        case 'createAssoSpec':
            sql= `insert into Associate_Spec(associateId,specializationId) values('${args[0]}','${args[1]}')`
            console.log(args)
            break;    
        case 'getSpecilization':
            sql = `select specializationId from Specialization where specilizationName in ('${args[0].join("','")}');`
            break;
        case 'getAssociates':
            sql = `select a.associateName as 'associateName', a.associateId as 'associateId', s.specilizationName as 'specilizationName' 
            from associates a, Associate_Spec aspec, Specialization s where a.associateId = aspec.associateId 
            and  aspec.specializationId = s.specializationId;`
            break;
        case 'getAssociate':
            sql = `select a.associateName as 'associateName', a.associateId as 'associateId', s.specilizationName as 'specilizationName' 
            from associates a, Associate_Spec aspec, Specialization s where a.associateId = aspec.associateId 
            and  aspec.specializationId = s.specializationId
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
            break;
        case 'updateAssociate':
            
            sql=`update associates set associateName='${args[0].name}',phone='${args[0].phone}',address='${args[0].address}' where associateId = '${args[0].associateId}';`        
            
            break;        
        case 'updateAssoSpec':
            
            sql=`update Associate_Spec set specializationId='${args[0]}' where associateId = '${args[1]}';`        
            
            break;        
        case 'getAssoSpec':
            console.log(args)
            sql=`select * from Associate_Spec where associateId = '${args[0]}';`        
            console.log(sql)
            break;  
        case 'deleteAssoSpc':
            sql=`delete from Associate_Spec where associateId = '${args[0]}';` 
            break;          
        }
    return sql;
 }catch(e){
     logger.log('error',`error while fetching query`,e)
      throw e;
 }
}
