<template>
	<div class="loginBoxs">
		<div class="inputItem">
			<i class="el-icon-user icon"></i>
			<input class="inputs" type="text" placeholder="用户名" v-model="logins.userName" maxlength="11">
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
			const cookies = document.cookie
			if(cookies){
				this.getCookieValue('operator', cookies)
			}
		},
		methods:{
			getCookieValue(name, cookies) {
			  let result = cookies.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
			  let data = result ? JSON.parse(result.pop()) : ""
			  if(data){
				  this.logins.userName = data.userName
				  this.logins.password = data.password
			  }
			},
			login(){
				if (!this.logins.userName || !this.logins.password) {
					this.$alert('用户名或密码不能为空')
				} else{
					this.$request.postJson('/back/passwordLogin', {
						name: this.logins.userName,
						password: this.logins.password,
						userType: 3
					}).then(res=>{
						if(res.code == 200){
							this.$store.commit('setToken', res.data)
							// this.$store.commit('setBtnHandle')
							let oDate = new Date()
							oDate.setDate(oDate.getDate() + $globalData.cookieTime)
							document.cookie = `operator=${JSON.stringify(this.logins)};expires=${oDate};`
							this.$router.replace('/index')
						}
					}).catch(e=>{
						// this.$store.commit('setBtnHandle')
						this.$message.error(e&&e.msg?e.msg:'登陆失败')
					})
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
