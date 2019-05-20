/* jshint esversion:8*/

var fs = require('fs');
//const newdate = new Date();
const runlog = './log/run._out.log';
const errlog = './log/err_out.log';

 var str = (obj)=>{
    if(typeof(obj) != 'string'){
        return `${new Date()} ::: ${String(obj)} \r\n`;
    }
    return  `${new Date()} ::: ${obj} \r\n`;
};
var r_log = (obj)=>{
    fs.appendFile(runlog,str(obj),(err)=>{
        if(err != null) err_log(str(err));
    });
};
var err_log = (obj)=>{
    fs.appendFile(errlog,str(obj),(err)=>{
        console.log(err);
    });
};

var log = (obj)=>{
    console.log(str(obj));
    r_log(str(obj));
};

var log_err = (obj)=>{
    console.log(str(obj));
    err_log(str(obj));
};
exports.LOG = log;
exports.LOG_ERR = log_err;
