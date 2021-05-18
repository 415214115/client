<template>
	<div class="loginBoxs">
		<div class="inputItem" title="密码由8-16位大小写字母和数字、下划线组成">
			<i class="el-icon-lock icon"></i>
			<input class="inputs" type="password" placeholder="新密码" v-model="pwd.password" maxlength="11">
		</div>
		<div class="inputItem" style="margin-top: 4rem;" title="密码由8-16位大小写字母和数字、下划线组成">
			<i class="el-icon-lock icon"></i>
			<input class="inputs" type="password"  placeholder="再次输入" v-model="pwd.repetition">
		</div>
		<div class="accept">
			<el-checkbox v-model="checked"></el-checkbox><span>点击“阅读并接受”<span class="agreement" @click="agreement">《用户协议》</span>协议</span>
		</div>
		<div class="btnBox">
			<el-button class="login" type="primary" @click="backStep" :loading="$store.state.handle.btnHandle">返回上一步</el-button>
			<el-button class="login" type="primary" @click="submit" :loading="$store.state.handle.btnHandle">提交</el-button>
			<!-- <div class="login" @click="backStep">返回上一步</div> -->
			<!-- <div class="login" @click="submit">提交</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
				pwd:{
					password: '',
					repetition: ''
				}
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		methods: {
			submit(){
				// 提交
				const reg = $globalData.passwordReg
				if(!reg.test(this.pwd.password) || !reg.test(this.pwd.repetition)){
					this.$alert('密码由6-10位大小写字母和数字组成，请正确输入')
					return
				}
				if (this.pwd.password === this.pwd.repetition) {
					if(this.checked){
						this.$router.back()
					} else {
						this.$alert('请先阅读并同意某某协议')
					}
				} else{
					this.$alert('两次密码输入不一致')
				}
				
			},
			backStep(){
				// 返回上一步
				this.$parent.stepI -= 1
			},
			agreement(){
				this.$router.push('/agreement')
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
			.iconImg{
				width: 2.6rem;
			}
			.inputs{
				border: none;
				outline: none;
				width: 29rem;
			}
		}
		.accept{
			margin-top: 3rem;
			text-align: left;
			span{
				font-size: 1.2rem;
				color: #999999;
				.agreement{
					color: #E78B6F;
					cursor: pointer;
				}
			}
			
		}
		.btnBox{
			display: flex;
			justify-content: space-between;
		}
		.login{
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
