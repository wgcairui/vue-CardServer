<template>
  <el-container>
    <el-header class="header" style="padding:0px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" @select="handleSelect">
        <el-menu-item index="1">详情</el-menu-item>
        <el-menu-item index="2">查询</el-menu-item>
        <el-menu-item index="4" @click="setup">配置</el-menu-item>
      </el-menu>
    </el-header>

    <div>
      <homemain></homemain>
    </div>
  </el-container>

</template>

<script>
import Homemain  from "./Homemain.vue";
import { constants } from 'crypto';
export default {
  components:{
    Homemain
  },
  name:'HomePage',
  data() {
        return {
         
        }
      },
  methods:{
    setup(){
      this.axios({
        method:'get',
        url:'/get',
        data:{
          id:33
        }
      }).then((result) => {
        console.log(result.data);
      }).catch((err) => {
        
      });
      //
      this.axios.get('/get1')
        .then(r=>{
          console.log(r.data);
        });

      this.axios.post('/p1',{
        id:33,
        value:'ppp'
      }).then(r=>{
        console.log(r.data);
      })
    }
  }
}
</script>

<style>
  header{
    padding: 0px
  }
</style>

