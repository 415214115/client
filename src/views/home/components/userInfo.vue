<template>
	<card class="topCard">
		<template slot="content">
			<div class="infoBox">
				<div class="leftInfo">
					<el-image class="headerImage" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" fit="cover"></el-image>
					<div>
						<div class="userName">您好！用户名</div>
						<div class="welcomeLogin">欢迎登陆跨境电商服务平台</div>
					</div>
				</div>
				<div class="rightInfo">
					<div class="yeBox">
						<div class="yeBoxCont">
							<div class="qbBox">
								<img class="qbImg" src="../../../assets/image/home/qb.png" alt="">
							</div>我的余额
						</div>
						<div class="yeBoxCont">
							<div class="qbBox rmbBox">
								<img class="rmbImg" src="../../../assets/image/home/rmb.png" alt="">
							</div>
							99999.99
						</div>
					</div>
					<div class="btnS nth1">充  值</div>
					<div class="btnS nth2">提  现</div>
					<div class="btnS nth3" v-if="isShowBill" @click="toBill">收支账单</div>
					<div class="btnS nth3" v-else @click="toBack">返回上一页</div>
				</div>
			</div>
		</template>
	</card>
</template>

<script>
export default{
    data(){
        return{
			isShowBill: true
        }
    },
	mounted() {
		if(this.$route.path == '/index/bill'){
			this.isShowBill = false
		} else {
			this.isShowBill = true
		}
		// console.log(this.$route.path)
	},
    methods:{
        toBill(){
            // console.log()
            this.$router.push('/index/bill')
        },
		toBack(){
			this.$router.back()
		}
    }
}
</script>

<style scoped="scoped">
	.topCard{
		margin-bottom: 20px;
	}
	.infoBox,.leftInfo{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.headerImage{
		width: 12rem;
		height: 12rem;
		border-radius: 100%;
		margin-right: 2rem;
	}
	.userName{
		font-size: 1.8rem;
		color: #313B46;
		font-weight: bold;
		margin-bottom: 3rem;
	}
	.welcomeLogin{
		font-size: 1.6rem;
		color: #313B46;
		font-weight: bold;
	}
	.leftInfo{
		padding-right: 4rem;
		border-right: 1px solid #DBDBDB;
		margin-right: 3.5rem;
	}
	.rightInfo{
		width: 70%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 2rem;
	}
	.btnS{
		width: 11rem;
		height: 5rem;
		border-radius: 5px;
		text-align: center;
		line-height: 5rem;
		color: #FFFFFF;
		cursor: pointer;
	}
	.nth1{
		background: #E78B6F;
		box-shadow: -4px 4px 0 2px #ECBFB1;
	}
	.nth2{
		background: #77CE9D;
		box-shadow: -4px 4px 0 2px #AFE2C6;
	}
	.nth3{
		background: #F0C663;
		box-shadow: -4px 4px 0 2px #EDDDB9;
	}
	.qbBox{
		width: 4.4rem;
		height: 4.4rem;
		background: #FFB30F;
		border-radius: 100%;
		margin-right: 2rem;
		padding: 1.2rem 1.1rem;
		display: inline-block;
	}
	.qbImg{
		width: 2.2rem;
		height: 2rem;
	}
	.yeBoxCont{
		align-items: center;
		display: flex;
		/* flex-direction: column; */
		justify-content: flex-start;
		margin-bottom: 2rem;
		color: #313B46;
	}
	.yeBoxCont:last-child{
		margin-bottom: 0;
		font-size: 3rem;
		font-weight: bold;
	}
	.rmbBox{
		background: none;
		padding: 0.85rem;
	}
	.rmbImg{
		width: 2.7rem;
		height: 2.7rem;
		display: inline-block;
		position: relative;
		top: -0.85rem;
	}
</style>
