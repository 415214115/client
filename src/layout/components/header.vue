<template>
	<div class="headers flex">
		<!-- <div class="leftLogo flex" :class="!$store.state.slidBar.unfold?'unfold':'pack'">
			<div v-if="!$store.state.slidBar.unfold"></div>
			<img class="leftLogoImg" v-if="!$store.state.slidBar.unfold" src="../../assets/logo.png" alt="">
			<i class="elIcon" :class="!$store.state.slidBar.unfold?'el-icon-s-fold':'el-icon-s-unfold'" :title="!$store.state.slidBar.unfold?'收起':'展开'" @click="setUnfold"></i>
		</div> -->
		<div class="headerCenter" :style="{width:!$store.state.slidBar.unfold?'calc(1920px - 360px)':'calc(1920px - 43px)'}">
			<breadcrumb></breadcrumb>
			<div class="rightInfos">
				<div class="rightInfosItem">
					<img src="../../assets/image/home/rmb.png" alt="">
					999999.99
				</div>
				<div class="rightInfosItem">
					<img src="../../assets/image/home/user.png" alt="">
					呱呱
				</div>
				<div class="rightInfosItem" @click="loginOut">
					<img src="../../assets/image/home/out.png" style="margin-right: 0.5rem !important;" alt="">
					<span>退出系统</span>
				</div>
			</div>
			<!-- 欢迎，{{userInfo.nickName || userInfo.name || userInfo.phone}} -->
			<!-- <span>个人中心</span> -->
			<!-- <span @click="loginOut">【退出登录】</span> -->
		</div>
	</div>
</template>

<script>
	import breadcrumb from '../../components/breadcrumb.vue'
	export default{
		name: 'headers',
		components:{
			breadcrumb
		},
		data(){
			return{
				userInfo: ''
			}
		},
		mounted() {
			let info = JSON.parse(sessionStorage.getItem('userInfo'))
			if (info) {
				this.userInfo = info
			}
		},
		methods:{
			loginOut(){
				// 清空所有缓存
				sessionStorage.clear()
				this.$router.replace('/login')
			},
			// setUnfold(){
			// 	this.$store.commit('setUnfold')
			// 	console.log(this.$store.state.slidBar.unfold)
			// }
		}
	}
</script>

<style scoped="scoped">
	.headers{
		color: #333;
		text-align: right;
		line-height: 9rem;
		width: 100%;
		height: 100%;
		/* background: #FFFFFF; */
		box-shadow: 10px 0 10px 1px rgba(0,0,0,0.1);
		/* padding: 0 24px; */
		padding-right: 20px;
		background: #1E87F0;
		justify-content: flex-start;
		align-items: center;
	}
	/* .leftLogo{
		justify-content: space-between;
		align-items: center;
		width: 380px;
		color: #FFFFFF;
		font-size: 28px;
		padding-left: 20px;
	}
	.leftLogoImg{
		height: 30px
	} */
	/* .headers span{
		margin-left: 2rem;
		cursor: pointer;
	}
	.headers span:hover{
		color: #409EFF;
	} */
	
	.unfold{
		width: 38rem;
	}
	.pack{
		width: 6.3rem;
	}
	.headerCenter{
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		align-items: center;
		margin-left: 2rem;
	}
	.rightInfos{
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		align-items: center;
		font-size: 1.8rem;
	}
	.rightInfosItem{
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		align-items: center;
		margin-left: 4rem;
	}
	.rightInfosItem span{
		cursor: pointer;
	}
	/* .rightInfosItem:last-child{
		font-size: 1.6rem;
	} */
	.rightInfos img{
		height: 3.6rem;
		margin-right: 1.5rem;
	}
</style>
