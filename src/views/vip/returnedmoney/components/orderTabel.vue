<template>
	<div>
		<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
		     <el-table-column prop="orderNum" label="订单编号"></el-table-column>
		     <el-table-column prop="createTime" label="订单时间"></el-table-column>
		     <el-table-column prop="estimatedAmount" label="大致回款金额总计"></el-table-column>
		     <el-table-column prop="expectMoney" label="预计到账金额"></el-table-column>
		     <el-table-column prop="shopNum" label="店铺数量"></el-table-column>
		     <el-table-column prop="date" label="订单计时"></el-table-column>
		     <el-table-column prop="date" label="状态">
				 <template slot-scope="scope">
				 	<div>未接单</div>
				 </template>
			 </el-table-column>
		     <el-table-column prop="operation_remark" label="反馈信息"></el-table-column>
		 </el-table>
		
		 <!-- <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion> -->
	</div>
</template>

	
<script>
	export default {
		props:['pageData'],
	    data(){
	        return{
				tableData: []
	        }
	    },
	    methods:{
	   //      paginaClick(val){
				// // console.log()
				// this.$emit('paginaClick', val)
	   //      }
	    }
	}
</script>

<style>
</style>
