<template>
	<div class="login-container">
		<div class="loginBox">
			<div class="bgoverlay1">
				<div class="systemName">{{ $store.state.layOutSetTing.systemName }}</div>
				<div class="bgoverlay2"></div>
			</div>
			<div class="loginForm">
				<div class="vipLogins">
					<!-- 会员登陆 -->
					<div class="noVipTip">已是会员？<span @click="toLogin">【立即登录】</span></div>
					<div class="loginFuncBox">
						<div class="stepBox">
							<div class="step step1" :class="stepI<=3?'reach':''">1</div>
							<div class="step step2" :class="stepI>1?'reach':''">2</div>
							<div class="step step3" :class="stepI==3?'reach':''">3</div>
						</div>
						<msgLogin v-show="stepI == 1"></msgLogin>
						<pwdLogin v-show="stepI == 2"></pwdLogin>
						<operatorLogin v-show="stepI == 3"></operatorLogin>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 会员登陆
	import pwdLogin from './components/pwdLogin.vue'
	import msgLogin from './components/msgLogin.vue'
	// 操作员登陆
	import operatorLogin from './components/operatorLogin.vue'
	export default {
		name: 'Login',
		components:{
			pwdLogin,
			msgLogin,
			operatorLogin
		},
		data() {
			return {
				stepI: 3,
				
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		methods: {
			toLogin(){
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.login-container {
		/* background-color: #2d3a4b; */
		width: 100%;
		height: 100vh;
		overflow: hidden;
		text-align: center;
		background-image: url(../../assets/backImg.png);
		background-repeat: no-repeat;
		background-position: 26% 50%;
		background-size: 159% 289%;
	}
	.loginBox{
		width: 138rem;
		height: 80rem;
		background-image: url(../../assets/image/login/bg3.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		z-index: 5;
		.bgoverlay1{
			width: 74rem;
			height: 52rem;
			background-image: url(../../assets/image/login/bg1.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			position: absolute;
			left: 15rem;
			bottom: 14rem;
			z-index: 6;
			.systemName{
				position: absolute;
				color: #34A1FF;
				font-size: 3.6rem;
				left: 7.5rem;
				top: 0.5rem;
			}
			.bgoverlay2{
				width: 65rem;
				height: 46rem;
				background-image: url(../../assets/image/login/bg2.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				position: absolute;
				left: 1.7rem;
				bottom: 0rem;
				z-index: 7;
			}
		}
		.loginForm{
			height: 100%;
			position: absolute;
			right: 10rem;
			width: 40rem;
			// .vipLogins{
				.noVipTip{
					position: absolute;
					top: 7rem;
					right: 4rem;
					color: #302C2C;
					font-size: 1.6rem;
					span{
						cursor: pointer;
						color: #ED3B43;
					}
				}
				.loginFuncBox{
					position: absolute;
					z-index: 8;
					top: 20rem;
					width: 35rem;
					.stepBox{
						display: flex;
						justify-content: space-between;
						.step{
							width: 3.8rem;
							height: 3.8rem;
							border-radius: 100%;
							text-align: center;
							line-height: 3.8rem;
							color: #FFFFFF;
							font-size: 1.8rem;
							font-weight: bold;
							background: #BFBFBF;
							position: relative;
							&::after{
								content: '';
								position: absolute;
								width: 9rem;
								height: 0.2rem;
								background: #00A0E9;
								right: -10.5rem;
								top: 50%;
								margin-top: -0.1rem;
							}
							&:last-child{
								&::after{
									display: none;
								}
							}
							&::before{
								position: absolute;
								font-size: 1.4rem;
								font-weight: bold;
								color: #333333;
								bottom: -4rem;
								white-space: nowrap;
								transform: translateX(-50%);
								left: 50%;
							}
							&:nth-child(1){
								&::before{
									content: '验证手机';
								}
							}
							&:nth-child(2){
								&::before{
									content: '信息填写';
								}
							}
							&:nth-child(3){
								&::before{
									content: '设置密码';
								}
							}
						}
						.reach{
							background: #EE7B81;
						}
					}
					
				}
			// }
			
			// .operator{
			// 	.noVipTip{
			// 		top: 15rem;
			// 		right: 7rem;
			// 	}
			// }
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.login-form{
		width: 400px;
		position: relative;
		left: 50%;
		margin-left: -200px;
		height: 220px;
		/* top: 50%; */
		margin-top: 220px;
	}
	.title-container{
		margin-bottom: 30px;
		color: #FFFFFF;
	}
	.loginBtn{
		width: 100%;
	}
	.login-container>>>.el-input__inner{
		background-color: #2B3540;
		border-color: #304156;
		padding-left: 40px;
		color: #FFFFFF;
	}
	.login-container>>>.el-input__inner::-webkit-input-placeholder{
		color: #545C70;
	}
	.login-container>>>.el-form-item__content{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.login-container>>>.el-form-item__content i{
		color: #545C70;
		margin-top: 10px;
		margin-right: 20px;
		font-size: 20px;
	}
	.login-container>>>.el-input__inner:-webkit-autofill,
	 .login-container>>>.el-input__inner:-webkit-autofill:hover,
	 .login-container>>>.el-input__inner:-webkit-autofill:focus,
	 .login-container>>>.el-input__inner:-webkit-autofill:active {
		-webkit-transition-delay: 99999s;
		-webkit-transition:  color 99999s ease-out,background-color 99999s ease-out;
	} 
	.login-container>>>.el-form-item .el-input{
		width: 400px;
	}
</style>
