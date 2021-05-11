<template>
	<div class="loginBoxs">
		<div class="inputItem">
			<i class="el-icon-lock icon"></i>
			<input class="inputs" type="password" placeholder="新密码" maxlength="11">
		</div>
		<div class="inputItem" style="margin-top: 4rem;">
			<i class="el-icon-lock icon"></i>
			<input class="inputs" type="password"  placeholder="再次输入">
		</div>
		<div class="accept">
			<el-checkbox v-model="checked">
				<span>点击“阅读并接受”《某某》协议</span>
			</el-checkbox>
		</div>
		<div class="btnBox">
			<div class="login">返回上一步</div>
			<div class="login">提交</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
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
			height: 5rem;
			line-height: 5rem;
			text-align: center;
			margin-top: 4rem;
			margin-bottom: 2rem;
			cursor: pointer;
		}
	}
	
</style>
