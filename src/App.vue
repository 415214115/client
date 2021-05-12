<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title"></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		
	}
};
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Microsoft YaHei;
	}
	#app {
		width: 100%;
		height: 100vh;
		font-size: 1.4rem;
		/* background: #E7E8EC; */
		min-width: 1366px;
		overflow-y: hidden;
	}
	img{
		display: block;
		object-fit: cover;
	}
    .el-table{
                    border-radius: 3px;
                }
    .el-table th{
        text-align: center !important;
        color: #3B3939 !important;
    }
	.flex{
		display: flex;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all .2s;
	}
	.fade-enter, .fade-leave-to {
	  /* margin-right: 100vw; */
	  opacity: 0;
	}
	/* .el-form-item {
		margin-bottom: 0 !important;
	} */
	.el-form-item .el-input{
		width: 21.5rem;
	}
</style>
