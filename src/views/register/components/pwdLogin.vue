<template>
	<div class="loginBoxs">
		<div class="inputItem">
			<i class="el-icon-user icon"></i>
			<input class="inputs" type="text" placeholder="填写用户名" v-model="user.userName" maxlength="11">
		</div>
		<div class="inputItem" style="margin-top: 4rem;">
			<!-- <i class="el-icon-lock icon"></i> -->
			<img src="../../../assets/image/userCenter/wx1.png" class="icon iconImg" alt="">
			<input class="inputs" type="text" placeholder="联系微信" v-model="user.WeChat">
		</div>
		<div class="btnBox">
			<el-button class="login" type="primary" @click="backStep" :loading="$store.state.handle.btnHandle">返回上一步
			</el-button>
			<el-button class="login" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">下一步
			</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					userName: '',
					WeChat: ''
				}

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			nextStep() {
				// 下一步
				if (!this.user.userName || !this.user.WeChat) {
					this.$alert('用户名或微信不能为空')
				} else {
					this.$store.commit('setBtnHandle')
					setTimeout(() => {
						this.$store.commit('setBtnHandle')
						this.$parent.stepI += 1
					}, 1000)
				}
			},
			backStep() {
				// 返回上一步
				this.$parent.stepI -= 1
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.loginBoxs {
		margin-top: 5rem;

		.inputItem {
			width: 100%;
			padding: 2rem 0;
			border-bottom: 1px solid #BFBFBF;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.icon {
				font-size: 2.6rem;
				margin-right: 2rem;
				color: #999999;
			}

			.iconImg {
				width: 2.6rem;
			}

			.inputs {
				border: none;
				outline: none;
				width: 29rem;
			}
		}

		.btnBox {
			display: flex;
			justify-content: space-between;
		}

		.login {
			width: 46%;
			background: #34A1FF;
			color: #FBF9FA;
			font-size: 1.8rem;
			// height: 5rem;
			// line-height: 5rem;
			text-align: center;
			margin-top: 4rem;
			margin-bottom: 2rem;
			// cursor: pointer;
		}
	}
</style>
