<template>
	<div>
		<card class="topCard">
			<template slot="content">
				<div class="infoBox">
					<div class="leftInfo">
						<el-image class="headerImage"
							src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" fit="cover">
						</el-image>
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
						<div class="btnS nth1" @click="recharge">充值</div>
						<div class="btnS nth2" @click="withdraw">提现</div>
						<div class="btnS nth3" v-if="isShowBill" @click="toBill">收支账单</div>
						<div class="btnS nth3" v-else @click="toBack">返回上一页</div>
					</div>
				</div>
			</template>
		</card>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :width="$globalData.dialogWidth">
			<div v-if="dialogTitle == '我要充值'">
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="9rem"
					size="mini">
					<el-form-item label="充值方式">
						<el-radio-group v-model="formInline.radio">
							<el-radio :label="3">
								<div class="radioItem">
									<img src="../../../assets/image/defaultImg.png" alt="">
									<span class="radioItemSpan">收款名称</span>
									<span class="radioItemSpan">收款账户</span>
								</div>
							</el-radio>
							<el-radio :label="6">
								<div class="radioItem">
									<img src="../../../assets/image/defaultImg.png" alt="">
									<span class="radioItemSpan">收款名称</span>
									<span class="radioItemSpan">收款账户</span>
								</div>
							</el-radio>
							<el-radio :label="9">
								<div class="radioItem">
									<img src="../../../assets/image/defaultImg.png" alt="">
									<span class="radioItemSpan">户主</span>
								</div>
								<div class="radioItem"  style="margin-top: 1rem;margin-left: 3rem;">
									<span>招商银行重庆分行幸福社区支行</span>
								</div>
								<div class="radioItem"  style="margin-top: 1rem;margin-left: 3rem;">
									<span>123456789012345678</span>
								</div>
							</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="充值金额">
						<el-input class="inputs" v-model="formInline.code" placeholder="1元起充"></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="截图演示">
								<img class="mimg" src="../../../assets/image/defaultImg.png" alt="">
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="对账截图">
								<el-upload
								  class="avatar-uploader"
								  action="#"
								  :show-file-list="false"
								  :http-request="uploadImg"
								  >
								  <img v-if="imageUrl" :src="imageUrl" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div v-else>
				<div class="withdrawTitle">
					提现方式
					<span>（请确认账户是否正确）</span>
				</div>
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
				  <el-form-item label="">
				    <el-radio-group v-model="formInline.radio">
				    	<el-radio :label="3">
				    		<div class="radioItem">
				    			<img src="../../../assets/image/defaultImg.png" alt="">
				    			<span class="radioItemSpan">收款名称</span>
				    			<span class="radioItemSpan">收款账户</span>
				    		</div>
				    	</el-radio>
				    	<el-radio :label="6">
				    		<div class="radioItem">
				    			<img src="../../../assets/image/defaultImg.png" alt="">
				    			<span class="radioItemSpan">收款名称</span>
				    			<span class="radioItemSpan">收款账户</span>
				    		</div>
				    	</el-radio>
				    	<el-radio :label="9">
				    		<div class="radioItem">
				    			<img src="../../../assets/image/defaultImg.png" alt="">
				    			<span class="radioItemSpan">户主</span>
				    		</div>
				    		<div class="radioItem"  style="margin-top: 1rem;margin-left: 3rem;">
				    			<span>招商银行重庆分行幸福社区支行</span>
				    		</div>
				    		<div class="radioItem"  style="margin-top: 1rem;margin-left: 3rem;">
				    			<span>123456789012345678</span>
				    		</div>
				    	</el-radio>
				    </el-radio-group>
					<div class="toUpdates">账户错误？<span @click="toUserCenter">去修改</span></div>
				  </el-form-item>
				</el-form>
				<div class="withdrawTitle">
					提现金额
					<span>（当前可提现金额￥123.00）</span>
				</div>
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
				  <el-form-item label="">
				    <el-input class="inputs" v-model="formInline.phone" placeholder="输入金额"></el-input>
				  </el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer" v-if="dialogTitle == '我要充值'">
				<el-button size="mini" @click="cancel">取 消</el-button>
				<el-button size="mini" type="primary" @click="confirm" :loading="$store.state.handle.btnHandle">确认已充值</el-button>
			</span>
			<span slot="footer" class="dialog-footer" v-else>
				<!-- <el-button size="mini" @click="cancel">取 消</el-button> -->
				<el-button size="mini" type="primary" @click="confirm" :loading="$store.state.handle.btnHandle">确认提现</el-button>
				<div>一般工作日24小时内到账</div>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				dialogTitle: '我要充值',
				isShowBill: true,
				formInline: {

				},
				imageUrl: ''
			}
		},
		mounted() {
			if (this.$route.path == '/index/bill') {
				this.isShowBill = false
			} else {
				this.isShowBill = true
			}
			// console.log(this.$route.path)
		},
		methods: {
			toBill() {
				// console.log()
				this.$router.push('/index/bill')
			},
			toBack() {
				this.$router.back()
			},
			recharge() {
				// 充值
				this.dialogVisible = true
				this.dialogTitle = '我要充值'
			},
			withdraw() {
				// 提现
				this.dialogVisible = true
				this.dialogTitle = '我要提现'
			},
			cancel() {
				// 取消
			},
			confirm() {
				// 确定
			},
			uploadImg(file){
				
			},
			toUserCenter(){
				this.$router.push('/usercenter')
			}
		}
	}
</script>

<style scoped="scoped">
	.topCard {
		margin-bottom: 20px;
	}

	.infoBox,
	.leftInfo {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.headerImage {
		width: 12rem;
		height: 12rem;
		border-radius: 100%;
		margin-right: 2rem;
	}

	.userName {
		font-size: 1.8rem;
		color: #313B46;
		font-weight: bold;
		margin-bottom: 3rem;
	}

	.welcomeLogin {
		font-size: 1.6rem;
		color: #313B46;
		font-weight: bold;
	}

	.leftInfo {
		padding-right: 4rem;
		border-right: 1px solid #DBDBDB;
		margin-right: 3.5rem;
	}

	.rightInfo {
		width: 70%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 2rem;
	}

	.btnS {
		width: 11rem;
		height: 5rem;
		border-radius: 5px;
		text-align: center;
		line-height: 5rem;
		color: #FFFFFF;
		cursor: pointer;
	}

	.nth1 {
		background: #E78B6F;
		box-shadow: -4px 4px 0 2px #ECBFB1;
	}

	.nth2 {
		background: #77CE9D;
		box-shadow: -4px 4px 0 2px #AFE2C6;
	}

	.nth3 {
		background: #F0C663;
		box-shadow: -4px 4px 0 2px #EDDDB9;
	}

	.qbBox {
		width: 4.4rem;
		height: 4.4rem;
		background: #FFB30F;
		border-radius: 100%;
		margin-right: 2rem;
		padding: 1.2rem 1.1rem;
		display: inline-block;
	}

	.qbImg {
		width: 2.2rem;
		height: 2rem;
	}

	.yeBoxCont {
		align-items: center;
		display: flex;
		/* flex-direction: column; */
		justify-content: flex-start;
		margin-bottom: 2rem;
		color: #313B46;
	}

	.yeBoxCont:last-child {
		margin-bottom: 0;
		font-size: 3rem;
		font-weight: bold;
	}

	.rmbBox {
		background: none;
		padding: 0.85rem;
	}

	.rmbImg {
		width: 2.7rem;
		height: 2.7rem;
		display: inline-block;
		position: relative;
		top: -0.85rem;
	}
	.avatar-uploader>>>.el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		  }
	
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 2.8rem;
	    color: #8c939d;
	    width: 15rem;
	    height: 15rem;
	    line-height: 15rem;
	    text-align: center;
	  }
	  .avatar,.mimg {
	    width: 15rem;
	    height: 15rem;
	    display: block;
	  }
	  .mimg{
		  object-fit: cover;
	  }
	  .el-radio{
		  display: flex;
		  justify-content: flex-start;
		  white-space: nowrap;
		  margin-bottom: 2rem;
		  
		  
	  }
	  .radioItem{
	  			  display: flex;
	  			  justify-content: flex-start;
	  			  width: 40rem;
	  			 
	  }
	  .radioItem img{
	  	  				  width: 2rem;
	  	  				  height: 2rem;
	  }
	  .radioItem .radioItemSpan{
	  	  				  margin-left: 1rem;
	  }
	  .toUpdates{
		  /* margin-top: 2rem; */
	  }
	  .toUpdates span{
		  cursor: pointer;
		  margin-left: 1rem;
		  color: #1E87F0;
	  }
	  .withdrawTitle{
		  margin-bottom: 2rem;
		  font-size: 1.6rem;
		  font-weight: bold;
	  }
	  .withdrawTitle span{
		  font-size: 1.4rem;
		  color: #F9961E;
		  font-weight: 400;
	  }
</style>