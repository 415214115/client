<template>
	<div class="pageHome">
		<div class="leftContent">
			<userInfo></userInfo>
			<div class="Ptext">系统及功能说明：</div>
			<introduce></introduce>
		</div>
		<news></news>
	</div>

</template>

<script>
	import userInfo from './components/userInfo.vue'
	import introduce from './components/introduce.vue'
	import news from './components/news.vue'
	export default {
		components: {
			userInfo,
			introduce,
			news
		},
		data() {
			return {

			}
		},
		mounted() {
			this.$store.commit('setBreadcrumb', ['首页'])
			this.$setMenu()
		},
		watch: {},
		methods: {
			queryFunc() {
				this.getBannerData()
			},
			paginaClick(val) {
				this.searchData.pageNum = val
				this.getBannerData()
			}
		}
	}
</script>

<style scoped="scoped">
	.pageHome {
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		flex-direction: row;
	}

	.Ptext {
		font-size: 2rem;
		margin-bottom: 2rem;
	}
	.leftContent{
		width: 100%;
	}
</style>
