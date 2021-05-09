<template>
	<el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
	  :page-size="pageSize" :layout="layouts" :total="totalNum">
	</el-pagination>
</template>

<script>
	export default {
		name: 'pagination',
		props: {
			msg: String
		},
		props:['totalNum', 'current'],
		data() {
			return {
				currentPage: 1,
				pageSize: $globalData.pageSize,
				layouts: 'total, prev, pager, next, jumper',
				pageTotal: 400,
			}
		},
		methods: {
			handleCurrentChange(val) {
				// currentPage 改变时触发，向父组件传递参数,父组件pageNum的值为val
				this.$emit('paginaClick', val)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-pagination {
		text-align: right;
		margin-top: 20px;
	}
</style>
