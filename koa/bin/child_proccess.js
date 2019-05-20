/*jshint esversion:8*/ 
const cp = require('child_process');
const {promisify} = require('util');

class C_Process{
    constructor(){
        this.proxy = cp.execFile;
    }

    ExecSync(cmd,arg){
        return promisify(cp.exec)(cmd,arg)
        .then(r=>{
            //console.log(typeof(r));
            return (typeof(r) == 'object')?r.stdout:r;
        });
    }
    //
    ExecfileSync(file,arg){
        return promisify(cp.execFile)(file,arg);
    }
    //
    get_proccess_list(){
        return(
        this.ExecSync('tasklist /FO table /nh /svc')
        .then((r)=>{           
            var list = r.toString().split('\r\n');
            var proccess_json = {};
            for(var i of list){
                i = i.split(' ');
                if(Number(i[19])) proccess_json[i[19]] = i[0];
            }
            return proccess_json;
        })
        .catch((err)=>{
            throw err;
        })
        );
    }
    //
    getsid(){
        var sid = this.ExecSync('whoami /user')
                  .then((r)=>{                     
                      return(
                        r.toString()
                         .split(' ')
                         .reverse()[0]
                         .split('\\')[0]
                         .trim() 
                      );
                  }).catch((err)=>{
                      throw err;
                  });
        return sid;
    }
    //
    kill_proccess(im){
        return(
            this.ExecSync(`taskkill /im ${im}`)
            .then((r)=>{
                return r;
            }).catch((err)=>{
                throw err;
            })
        );
    }
}

module.exports = C_Process;



