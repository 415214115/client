<template>
	<div class="loginBoxs">
		<div class="inputItem">
			<i class="el-icon-user icon"></i>
			<input class="inputs" type="text" placeholder="用户名/手机号" v-model="logins.userName" maxlength="11">
		</div>
		<div class="inputItem" style="margin-top: 4rem;">
			<i class="el-icon-lock icon"></i>
			<input class="inputs" type="password" v-model="logins.password" placeholder="登录密码">
		</div>
		<el-button class="login" type="primary" @click="login" :loading="$store.state.handle.btnHandle">立 即 登 录</el-button>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				logins:{
					userName: '',
					password: ''
				}
			}
		},
		mounted() {
			
		},
		methods:{
			login(){
				if (!this.logins.userName || !this.logins.password) {
					this.$alert('用户名或密码不能为空')
				} else{
					this.$store.commit('setBtnHandle')
					setTimeout(()=>{
						this.$store.commit('setToken', '123')
						this.$store.commit('setBtnHandle')
						this.$router.replace('/index')
					},3000)
					
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.loginBoxs{
		margin-top: 5rem;
		.inputItem{
			width: 100%;
			padding: 2rem 0;
			border-bottom: 1px solid #BFBFBF;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.icon{
				font-size: 2.6rem;
				margin-right: 2rem;
				color: #999999;
			}
			.inputs{
				border: none;
				outline: none;
				width: 29rem;
			}
		}
		.login{
			width: 100%;
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
