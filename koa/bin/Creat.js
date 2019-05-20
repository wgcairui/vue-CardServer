/* jshint esversion:8 */
const Pro = require('./child_proccess');
const pro = new Pro();
const MS = require('./mssqlcont');
const ms = new MS();
var LOG = require('./log_out');
var Card_Server = require('./run_stat');
const Server =new Card_Server();
var Regedit = require('./regedit');

var reg = new Regedit();

async function Create(){
    LOG.LOG('获取配置。。。');
    var create_setup_arg = {};
    ms.query('select * from Create_setup')
        .then(async (r)=>{
            for(let i of r){
                if(i.val.trim() == 'sid' && i.vkey != undefined){
                  create_setup_arg[i.val] = i.vkey.trim();
                }
            }
            var sid = await pro.getsid();
            //
            if(typeof(create_setup_arg.sid) == 'undefined'){
                LOG.LOG(`sid未定义，获取sid：${sid}写入create_setup...`);
                create_setup_arg.sid = sid;
                ms.query('insert into Create_setup (val,vkey) values (\'sid\',\''+create_setup_arg.sid+'\')');
             }
             //
             if(create_setup_arg.sid != sid){
                LOG.LOG(`sid不匹配,old:${create_setup_arg.sid},new:${sid},更新sid`);
                ms.update({vkey:sid},{val:'sid'},'Create_setup');
            }
            //
        }).then(async()=>{
            //get card_server_port
            var server_port = await ms.query('select * from server_port');
            //配置card_port
            var proccess_list = await pro.get_proccess_list();
            var proccess_list_prasa = JSON.stringify(proccess_list);
            /*
            { id: 3,
            name: '江阴-桃源28500',
            server_port: '6000      ',
            card_port: '28500     ',
            dir_name: 'jytaoyuan',
            Data_Base: 'taoyuan',
            remark: '江阴-桃源' },
            */           
           
           reg.set_r_path(create_setup_arg.sid);
           for(var i of server_port){
               await setTimeout(()=>{},3000);
                if(proccess_list_prasa.includes(i.dir_name)){
                    LOG.LOG(`${i.name}已运行`);
                }else{                    
                    await reg.set_r(i);
                    await Server.run(i.dir_name);
                    LOG.LOG(`${i.name}未运行，正在启动server_port`);

                }
            }
        }).catch(err=>{
            LOG.LOG_ERR(err);
        });
   
    
}
Create();
           
    
