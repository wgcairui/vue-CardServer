<template>
<el-container>
    <el-aside width="200px">
        <el-tabs :tab-position='tabPosition' style="height: 200px;">
          <el-tab-pane label="run"></el-tab-pane>
          <el-tab-pane label="service"></el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main>
        <ElTable :data="tableData">
          <ElTableColumn label="姓名" prop="name"></ElTableColumn>
          <ElTableColumn label="地址" prop="address"></ElTableColumn>
          <ElTableColumn label="date" prop="date"></ElTableColumn>
        </ElTable>
      </el-main>
</el-container>
</template>

<script>
export default {
    name:'homemain',
    data(){
        return{
             tabPosition:'left',
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    }
}
</script>

