<template>
	<div>
		<el-table :data="tableData" border style="width: 100%;margin-top: 2rem;">
		     <el-table-column prop="date" label="订单编号"></el-table-column>
		     <el-table-column prop="date" label="订单时间"></el-table-column>
		     <el-table-column prop="date" label="店铺名称"></el-table-column>
		     <el-table-column prop="date" label="交易流水编号"></el-table-column>
		     <el-table-column prop="date" label="提款截图"></el-table-column>
		     <el-table-column prop="date" label="回款金额（当地货币）"></el-table-column>
		     <el-table-column prop="date" label="待到账（人民币）"></el-table-column>
		     <el-table-column prop="date" label="状态/操作"></el-table-column>
		 </el-table>
		
		 <paginaTion :totalNum="0" @paginaClick="paginaClick"></paginaTion>
	</div>
</template>

	
<script>
	export default {
	    data(){
	        return{
				tableData: []
	        }
	    },
	    methods:{
	        paginaClick(val){
	
	        }
	    }
	}
</script>

<style>
</style>
