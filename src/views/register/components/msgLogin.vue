<template>
	<div class="loginBoxs">
		<div class="inputItem">
			<i class="el-icon-user icon"></i>
			<input class="inputs" type="text" placeholder="手机号" v-model="logins.phone" maxlength="11">
		</div>
		<div class="getCodeBox" style="margin-top: 4rem;">
			<div class="inputItem">
				<!-- <i class="el-icon-lock icon"></i> -->
				<img src="../../../assets/image/login/code.png" class="icon iconImg" alt="">
				<input class="inputs" type="text" v-model="logins.code" placeholder="验证码">
			</div>
			<el-button type="primary" size="mini" class="getCode" :disabled="isDisabled" @click="getCode">{{ codeText }}
			</el-button>
		</div>

		<el-button class="login" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">下一步
		</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				logins: {
					phone: '',
					code: ''
				},
				codeText: '获   取',
				isDisabled: false

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			nextStep() {
				// 下一步
				if (!this.logins.phone || !this.logins.code) {
					this.$alert('手机号或验证码不能为空')
				} else {
					// this.$store.commit('setBtnHandle')

					this.$request.postJson('/common/checkCode', {
						phone: this.logins.phone,
						code: this.logins.code
					}).then(res => {
						if (res.code == 200) {
							// this.$store.commit('setBtnHandle')
							this.$parent.stepI += 1
							this.logins.code = ''
						}
					}).catch(e => {
						// this.$store.commit('setBtnHandle')
						this.$alert(e.msg)
					})
				}
			},
			getCode() {
				// 获取验证码
				const reg = $globalData.phoneReg
				if (this.logins.phone && reg.test(this.logins.phone)) {
					let time = $globalData.getCodeTime
					const timer = setInterval(() => {
						if (time == 0) {
							this.isDisabled = false
							this.codeText = '重新获取'
							clearInterval(timer)
						} else {
							time -= 1
							this.codeText = `${time} S`
							this.isDisabled = true
						}
					}, 1000)
					this.$request.get('/common/sendMessageForGetCode', {
						phone: this.logins.phone
					}).then(res => {}).catch(e => {
						this.$message.error(e.msg)
					})
				} else {
					this.$alert('请输入正确的手机号码')
				}
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

		.login {
			width: 100%;
			background: #34A1FF;
			color: #FBF9FA;
			font-size: 1.8rem;
			text-align: center;
			margin-top: 4rem;
			margin-bottom: 2rem;
		}
	}

	.getCodeBox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.inputItem {

			width: 21rem;
		}

		.getCode {
			width: 12rem;
			text-align: center;
			background: #82C5FE;
			color: #FFFFFF;
			font-size: 2.2rem;
			border: none;
		}
	}
</style>
