`use strict`
const mysql = require('mysql');
const models = require('../model/models')
const dbHelper = module.exports;

dbHelper.getConnction =  ()=>{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'asm'
      });
      return Promise.resolve(connection);
}

dbHelper.create = async (sqlStmt)=>{
    const con = await this.getConnction()
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = sqlStmt;
        
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      })
}
dbHelper.get = async (sqlStmt)=>{
    const con = await this.getConnction()
    return new Promise((resolve,reject)=>
     {con.connect(function(err) {
        if (err) throw err;
        console.log("Connected! for get");
        //const model =models.models[modelname];
        var sql = sqlStmt;
        //console.log('sqlstmt ====',sql)
        con.query(sql, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
      })
    })
}