<template>
	<div class="content">
		<el-container>
			<el-aside>
				<!-- <sliderBar></sliderBar> -->
				<leftSliderBar></leftSliderBar>
			</el-aside>
			<el-container>
				<el-header>
					<headers></headers>
				</el-header>
				<el-main>
					<transition name="fade" mode="out-in">
						<mainPage></mainPage>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import leftSliderBar from './components/leftSliderBar.vue';
	import sliderBar from './components/slideBar.vue';
	import mainPage from '../views/layout.vue';
	import headers from './components/header.vue';
	import footers from './components/footer.vue';
	export default {
		components: {
			sliderBar,
			mainPage,
			headers,
			footers,
			leftSliderBar
		},
		data() {
			return {
				settings: this.$store.state.layOutSetTing
			};
		},
		mounted() {
			// console.log(this.settings.headerIsShow);
			// if (!sessionStorage.getItem('token')) {
			// 	this.$router.replace('/login')
			// } else {
			// 	console.log(sessionStorage.getItem('token'))
			// }
			// console.log(this.$router.options.routes);
			// console.log(this.$route);
		}
	};
</script>

<style scoped="scoped">
	.content,.el-container{
		width: 100%;
	}

	.el-header {
		/* box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.3); */
		/* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
		height: 90px !important;
		background-color: #FFFFFF !important;
		padding: 0;
		background: #1E87F0;
	}

	.el-aside {
		/* background-color: #304156; */
		color: #333;
		text-align: center;
		/* line-height: 200px; */
		width: auto !important;
	}

	.el-main {
		background-color: #f0f0f0;
		color: #333;
		overflow: auto;
		height: calc(100vh - 90px);
	}
	.section {
		position: relative;
		left: 0;
		right: 0;
		width: 1200px;
		margin: auto;
		margin-top: 20px;
	}
</style>
