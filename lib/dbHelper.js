`use strict`
const mysql = require('mysql');

const logger = require('./logHelper');
const dbHelper = module.exports;

dbHelper.getConnction =  ()=>{
 try{
  const config = global.config['local'];
  //console.log('config',config['local'])
    var connection = mysql.createConnection({
        host: config.mysqldb.host,
        user: config.mysqldb.user,
        password: config.mysqldb.password,
        database: config.mysqldb.database
      });
      return Promise.resolve(connection);
    }catch(e){
      logger.log('error',`error while connecting to db`,e)
      throw e
    }
}

dbHelper.create = async (sqlStmt)=>{
    const con = await this.getConnction()
    con.connect(function(err) {
        if (err) throw err;

        var sql = sqlStmt;
        
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record updated/inserted");
        });
      })
}
dbHelper.get = async (sqlStmt)=>{
    const con = await this.getConnction();
    return new Promise((resolve,reject)=>
     {con.connect(function(err) {
        if (err) throw err;
        var sql = sqlStmt;
        con.query(sql, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
      })
    })
}