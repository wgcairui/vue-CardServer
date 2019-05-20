/*jshint esversion:8 */
const fs = require('fs');
const pro = require('./child_proccess');
const cp = require('child_process');
const path = require('path');
const {promisify} = require('util');

const pros = new pro();
const LOG = require('./log_out');
const servers_path = path.join(__dirname,'..\\card_share');

class RunStatus{
    constructor(){

    }
    //
    //返回server，cardserver目录,temp地址
    proceess_path(proccess_name){
        var server_path = path.join(servers_path,proccess_name);
        return {
            server:path.join(server_path,`${proccess_name}_server.exe`),
            card:path.join(server_path,proccess_name+'_card.exe'),
            CardTemp:path.join(servers_path,'template','CardShare_Server.exe'),
            ServerTemp:path.join(servers_path,'template','EnjoyFallowServer.exe'),
            ServerPath:server_path
        };
    }
    //
    run(proccess_name){
        var fpath = this.proceess_path(proccess_name);
        //检测执行文件存在，不存在则创建；
        async function exit_file(){
            return await promisify(fs.exists)(fpath.ServerPath)                
            .then(async(bool)=>{
                if(!bool){
                    LOG.LOG(`file path no mk,mkdir ${fpath.ServerPath}`);
                   return await promisify(fs.mkdir)(fpath.ServerPath)
                   .then(async()=>{
                    await promisify(fs.copyFile)(fpath.ServerTemp,fpath.server);
                    LOG.LOG(`cp temp to ${fpath.server}`);
                    await promisify(fs.copyFile)(fpath.CardTemp,fpath.card);
                    LOG.LOG(`cp temp to ${fpath.card}`);
                    
                });                    
                }
                return true;
            }).catch(err=>{
                LOG.LOG_ERR(err);
                return false;
            });

        }
        //
        exit_file()
        .then(async (bool)=>{
            if(bool){
                cp.exec(fpath.server,()=>{});
                //await pros.ExecfileSync(fpath.server);
                LOG.LOG(`run process === ${proccess_name}_server`);
                cp.exec(fpath.card,()=>{});
                //await pros.ExecfileSync(fpath.card);
                LOG.LOG(`run process === ${proccess_name}_cardserver`);
            }
            return true;
        }).catch(err=>{
            LOG.LOG_ERR(err);
        });
    }
    //
    async stop(proccess_name){
        var kc= pros.kill_proccess(`${proccess_name}_card.exe'`)
        .then(r=>{
            LOG.LOG(`stop ${proccess_name}_card.exe ==${r}`);
            return true;
        });
        var ks= pros.kill_proccess(`${proccess_name}_server.exe`)
        .then(r=>{
            LOG.LOG(`stop ${proccess_name}_server ==${r}`);
            return true;
        });
        await kc;
        await ks;
        if(kc == ks == true) return true;        
    }
    //
    restart(proccess_name){
        this.stop(proccess_name)
        .then(bool=>{
            if(bool) this.run(proccess_name);
        });
    }
}

module.exports = RunStatus;
