<template>
	<div>
		<el-table :data="tableData" border style="width: 100%;margin-top: 2rem;">
		     <el-table-column prop="date" label="订单编号"></el-table-column>
		     <el-table-column prop="date" label="订单时间"></el-table-column>
		     <el-table-column prop="date" label="大致回款金额总计"></el-table-column>
		     <el-table-column prop="date" label="预计到账金额"></el-table-column>
		     <el-table-column prop="date" label="店铺数量"></el-table-column>
		     <el-table-column prop="date" label="订单计时"></el-table-column>
		     <el-table-column prop="date" label="状态"></el-table-column>
		     <el-table-column prop="date" label="反馈信息"></el-table-column>
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
