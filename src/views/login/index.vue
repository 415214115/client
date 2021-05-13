<template>
	<div class="login-container">
		<div class="loginBox">
			<div class="bgoverlay1">
				<div class="systemName">{{ $store.state.layOutSetTing.systemName }}</div>
				<div class="bgoverlay2"></div>
			</div>
			<div class="loginForm">
				<div class="vipLogins" v-show="isVipLogin">
					<!-- 会员登陆 -->
					<div class="noVipTip">不是会员？<span @click="registerVip">【立即注册】</span></div>
					<div class="loginFuncBox">
						<div class="loginWay">
							<div class="loginWayBtn" @click="loginType(1)" :class="loginTypes == 1?'selectWay':''">密码登录</div>
							<div class="loginWayBtn" @click="loginType(2)" :class="loginTypes == 2?'selectWay':''">短信登录</div>
						</div>
						<pwdLogin v-if="loginTypes == 1"></pwdLogin>
						<msgLogin v-if="loginTypes == 2"></msgLogin>
						<div class="loginTip">
							<span>忘记密码？</span>
							<span @click="loginRole">操作员登录入口</span>
						</div>
					</div>
				</div>
				<div class="operator" v-show="!isVipLogin">
					<!-- 操作员登陆 -->
					<div class="noVipTip">操作员登录</div>
					<div class="loginFuncBox">
						<div class="loginWay">
							<div class="loginWayBtn selectWay">密码登录</div>
						</div>
						<operatorLogin></operatorLogin>
						<div class="loginTip">
							<span></span>
							<span @click="loginRole">会员登录入口</span>
						</div>
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
				isVipLogin: true,
				loginTypes: 1
			}
		},
		created() {
			
		},
		mounted() {
			this.$store.commit('setLoginRole', '1')
			this.$setMenu()
		},
		watch:{
			isVipLogin(newData){
				// 登陆角色--------1---true会员，2---false操作员 
				if (newData) {
					this.$store.commit('setLoginRole', '1')
				} else{
					this.$store.commit('setLoginRole', '2')
				}
				this.$setMenu()
			}
		},
		methods: {
			registerVip(){
				this.$router.push('/register')
			},
			loginType(i){
				// 选择登陆方式
				this.loginTypes = i
			},
			loginRole(){
				// 登陆角色选择
				this.isVipLogin = !this.isVipLogin
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
					.loginWay{
						font-size: 1.8rem;
						font-weight: bold;
						text-align: left;
						.loginWayBtn{
							display: inline-block;
							margin-right: 5rem;
							width: 9rem;
							text-align: center;
							line-height: 3.6rem;
							position: relative;
							cursor: pointer;
						}
						.selectWay::before{
							content: '';
							position: absolute;
							width: 100%;
							height: 0.4rem;
							background: #00A0E9;
							bottom: -2px;
							left: 0;
						}
					}
					.loginTip{
						padding: 0 1.5rem;
						display: flex;
						justify-content: space-between;
						font-size: 1.2rem;
						span{
							cursor: pointer;
							&:first-child{
								color: #ED3B43;
							}
							&:last-child{
								color: #383838;
							}
						}
					}
				}
			// }
			
			.operator{
				.noVipTip{
					top: 15rem;
					right: 7rem;
				}
			}
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
