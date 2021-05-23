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
							<div class="userName">您好！{{ userInfo.nickName?userInfo.nickName:userInfo.name }}</div>
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
								{{ userInfo.money?Number(userInfo.money).toFixed(2):0.00 }}
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
			<!-- 充值 -->
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
			<!-- 提现 -->
			<div v-else>
				<div class="withdrawTitle">
					提现方式
					<span>（请确认账户是否正确）</span>
				</div>
				<div v-if="userInfo.alipayCard || userInfo.bankNum">
					<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
					  <el-form-item label="">
					    <el-radio-group v-model="formInline.withdrawType">
					    	<el-radio :label="0" v-if="userInfo.alipayCard">
					    		<div class="radioItem">
					    			<img src="../../../assets/image/home/zhifubao.png" alt="">
					    			<span class="radioItemSpan">{{ userInfo.nickName?userInfo.nickName:userInfo.name }}</span>
					    			<span class="radioItemSpan">{{ userInfo.alipayCard }}</span>
					    		</div>
					    	</el-radio>
					    	<el-radio :label="1" v-if="userInfo.bankNum">
					    		<div class="radioItem">
					    			<img src="../../../assets/image/home/yinhangka.png" alt="">
					    			<span class="radioItemSpan">{{ userInfo.realName }}</span>
					    		</div>
					    		<div class="radioItem"  style="margin-top: 1rem;margin-left: 3rem;">
					    			<span>{{ userInfo.bankName }}</span>
					    		</div>
					    		<div class="radioItem"  style="margin-top: 1rem;margin-left: 3rem;">
					    			<span>{{ userInfo.bankNum }}</span>
					    		</div>
					    	</el-radio>
					    </el-radio-group>
						<div class="toUpdates">账户错误？<span @click="toUserCenter">去修改</span></div>
					  </el-form-item>
					</el-form>
				</div>
				<div v-else style="margin-bottom: 2rem;">
					<span @click="toUserCenter" style="cursor: pointer;font-size: 1.2rem;color: #F9961E;">请先绑定支付宝或银行卡</span>
				</div>
				<div class="withdrawTitle">
					提现金额
					<span>（当前可提现金额￥{{ userInfo.money }}）</span>
				</div>
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
				  <el-form-item label="">
				    <el-input class="inputs" v-model="formInline.withdrawMoney" placeholder="输入金额"></el-input>
				  </el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer" v-if="dialogTitle == '我要充值'">
				<el-button size="mini" @click="cancel" :loading="$store.state.handle.btnHandle">取 消</el-button>
				<el-button size="mini" type="primary" @click="confirm" :loading="$store.state.handle.btnHandle">确认已充值</el-button>
			</span>
			<span slot="footer" class="dialog-footer" v-else>
				<!-- <el-button size="mini" @click="cancel">取 消</el-button> -->
				<el-button size="mini" type="primary" @click="confirmWithdraw" :loading="$store.state.handle.btnHandle">确认提现</el-button>
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
					withdrawType: '', //提现---类型
					withdrawMoney: '' // 提现---金额
				},
				imageUrl: '',
				userInfo: ''
			}
		},
		mounted() {
			if (this.$route.path == '/index/bill') {
				this.isShowBill = false
			} else {
				this.isShowBill = true
			}
			// console.log(this.$route.path)
			this.getUserInfo()
		},
		watch:{
			dialogVisible(newData){
				if(newData){
					this.formInline.withdrawType = ''
					this.formInline.withdrawMoney = ''
				}
			}
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
			confirmWithdraw(){
				// 确定提现
				if(this.formInline.withdrawType === ''){
					this.$alert('请先选择提现类型')
					return
				}
				if(this.formInline.withdrawMoney == ''){
					this.$alert('请输入提现金额')
					return
				}
				if(Number(this.formInline.withdrawMoney) < 1){
					this.$alert('提现金额不能小于1')
					return
				}
				if(Number(this.formInline.withdrawMoney) > this.userInfo.money){
					this.$alert('提现金额不能超过余额')
					return
				}
				this.$prompt('请输入交易密码', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: $globalData.passwordReg,
					inputErrorMessage: '密码由6-10位大小写字母和数字组成，请正确输入',
					inputType: 'password'
				}).then(({ value }) => {
					this.$request.postJson('/back/withdrawal', {
						money: this.formInline.withdrawMoney,
						payPassword: value,
						withdrawalType: this.formInline.withdrawType
					}).then(res=>{
						if(res.code == 200){
							this.$message.success('提现成功，请耐心等待到账')
							this.dialogVisible = false
							this.getUserInfo()
						}
					}).catch(e=>{
						this.$message.error(e.msg)
					})
				})
			},
			uploadImg(file){
				
			},
			toUserCenter(){
				this.$router.push('/usercenter')
			},
			getUserInfo(){
				this.$request.postJson('/back/getUserInfo').then(res=>{
					if(res.code == 200){
						this.userInfo = res.data
						this.$store.commit('setUserInfo', this.userInfo)
					}
				})
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