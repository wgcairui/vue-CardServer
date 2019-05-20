/* jshint esversion:8*/
const Regedit = require("regedit-simple");

class regedit{
    constructor(){
    }
    //
    set_r_path(sid){
        this._r_path = {
            server:`\"HKEY_USERS\\${sid}\\Software\\VB and VBA Program Settings\\CardShareSQL\\clients\"`,
            card:`\"HKEY_USERS\\${sid}\\Software\\VB and VBA Program Settings\\IWCardShare\\ServerTCP\"`,
            sql:`\"HKEY_USERS\\${sid}\\Software\\VB and VBA Program Settings\\PropSQL\\server\"`
        };     
    }
    //
    get_r(str){
       return Regedit.get(str);
    }        
    //
    async set_r(obj){
      /*
            { id: 3,
            name: '江阴-桃源28500',
            server_port: '6000      ',
            card_port: '28500     ',
            dir_name: 'jytaoyuan',
            Data_Base: 'taoyuan',
            remark: '江阴-桃源' },
            */
        var arr = [{
            target:this._r_path.sql,
            name:'sql_database',
            type:'REG_SZ',
            value:obj.Data_Base
            },
            {
                target:this._r_path.server,
                name:'server_port',
                type:'REG_SZ',
                value:obj.server_port  
            },
            {
                target:this._r_path.card,
                name:'Server_Port',
                type:'REG_SZ',
                value:obj.card_port   
            }];
        for(var i of arr){
            //console.dir(i);
           await Regedit.add(i);
        }
    }
    //
    creat_r(){

    }
    //
           
}
module.exports = regedit;


