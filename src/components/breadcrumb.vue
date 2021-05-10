<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
	  <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
	  <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
	  <el-breadcrumb-item v-for="item in datas" :key="item">{{ item }}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		data() {
			return {
				// breadcrumb: ''
			}
		},
		mounted() {
			// console.log(this.$store.state.breadcrumb.breadcrumb)
			// this.breadcrumb = this.$store.state.breadcrumb.breadcrumb
		},
		computed:{
			datas(){
				return this.$store.state.breadcrumb.breadcrumb
			}
		},
		watch:{
			
		},
		methods: {
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.el-breadcrumb__inner.is-link,
	.el-breadcrumb__separator,
	.el-breadcrumb__inner,
	.el-breadcrumb__inner a{
		color: #FFFFFF !important;
		font-weight: 600;
	}
</style>
