<template>
	<div>
		<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
			 <el-table-column prop="orderNum" label="订单编号"></el-table-column>
			 <el-table-column prop="createTime" label="订单时间"></el-table-column>
			 <!-- <el-table-column prop="date" label="店铺名称"></el-table-column> -->
			 <!-- <el-table-column prop="date" label="交易流水编号"></el-table-column> -->
			 <!-- <el-table-column prop="date" label="提款截图"></el-table-column> -->
			 <el-table-column prop="estimatedAmount" label="回款金额（当地货币）"></el-table-column>
			 <el-table-column prop="expectMoney" label="待到账（人民币）"></el-table-column>
			 <el-table-column prop="date" label="状态/操作">
			 	<div>已完结</div>
			 </el-table-column>
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
				// this.$emit('paginaClick', val)
	   //      }
	    }
	}
</script>

<style>
</style>
