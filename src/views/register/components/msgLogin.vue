<template>
	<div class="loginBoxs">
		<div class="inputItem">
			<i class="el-icon-user icon"></i>
			<input class="inputs" type="text" placeholder="用户名/手机号" maxlength="11">
		</div>
		<div class="getCodeBox" style="margin-top: 4rem;">
			<div class="inputItem">
				<i class="el-icon-lock icon"></i>
				<input class="inputs" type="password"  placeholder="验证码">
			</div>
			<div class="getCode">获   取</div>
		</div>
		
		<div class="login">下一步</div>
	</div>
</template>

<script>
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
			height: 5rem;
			line-height: 5rem;
			text-align: center;
			margin-top: 4rem;
			margin-bottom: 2rem;
			cursor: pointer;
		}
	}
	.getCodeBox{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.inputItem{
			
			width: 21rem;
		}
		.getCode{
			width: 12rem;
			height: 4rem;
			text-align: center;
			line-height: 4rem;
			background: #82C5FE;
			color: #FFFFFF;
			font-size: 2.2rem;
			cursor: pointer;
		}
	}
</style>
