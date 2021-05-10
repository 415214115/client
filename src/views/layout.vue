<template>
	<!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
		<router-view v-wechat-title="$route.meta.title"></router-view>
	<!-- </el-scrollbar> -->
</template>

<script>
export default{
	name: 'Layout'
}
</script>

<style>
</style>