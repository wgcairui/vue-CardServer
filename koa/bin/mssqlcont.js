/* jshint esversion:8 */
var ms = require('mssql');
var contobj = require('../passwd/mssql.json');

class MS{
    constructor(constr){
        if(constr == undefined){
            this.constr = contobj;
        }else{
            this.constr = constr;
        }  
        
        this.pools = new ms.ConnectionPool(this.constr).connect();
        ms.on("error",(err)=>{
            throw err;
        });
    }
    //
    query(sql){
        return this.pools
               .then(pool=>{
                return pool.request().query(sql);                
               })
               .then(result=>{
                   return (sql.slice(0,6).toLocaleLowerCase() == 'select')?result.recordset:result.rowsAffected;
               }).catch(err=>{
                   this.Error_code(err);
               });
    }
    //update
    update(obj,objcondition,table){
        let sql="";
        for(var i in obj){
            for(var r in objcondition){
             sql = `update ${table} set ${i} = '${obj[i]}' where ${r} = '${objcondition[r]}'`;
            }    
         }
        this.query(sql)
            .then(result=>{
                return result;
            });
    }

    Error_code(err){
        var obj ={status:'404',info:err.code,affectedRows:0};
        console.log(err);
        if(err.code){
            switch(err.code){
                case 'ETIMEOUT':
                    obj.info = 'Failed to connect to timeout';
                break;
                case 'ELOGIN':
                    obj.info = 'user login error';
                break;
                default:
                    obj.info = err.code;
                break;
            }
        }
        return obj;
    }
    
}

module.exports = MS;




