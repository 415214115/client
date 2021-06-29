<template>
	<!-- 待退款 -->
	<div class="unluckily">
		<topMsg types="1" ref="topMsg"></topMsg>
		<div class="cardTabel">
			<el-card>
				<div slot="header">
					<span class="issueTitle">发布中心</span>
					<el-button type="warning" size="mini" class="issueBtn" @click="demand">发布需求</el-button>
				</div>
				<div class="handleBoxtOP">
					<div class="handleBox">
						<div class="handleList" v-for="item in navList" :key="item.id"
							:class="navIndex==item.id?'selects':''" @click="selectorNav(item.id)">{{ item.title }}</div>
					</div>
					<!-- <div class="serchBox">
						<el-input v-model="postData.keyWords" size="mini" placeholder="请输入银行账号、金额、备注"></el-input>
						<el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
					</div> -->
				</div>

				<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
					<el-table-column prop="orderNo" label="订单编号"></el-table-column>
					<el-table-column prop="userName" label="收款人姓名"></el-table-column>
					<el-table-column prop="bankName" label="银行名称/代码"></el-table-column>
					<el-table-column prop="recordMoney" label="退款金额"></el-table-column>
					<el-table-column prop="needPayMoney" label="支付费用"></el-table-column>
					<el-table-column prop="createTime" label="订单计时"></el-table-column>
					<el-table-column prop="operationMark" label="备注"></el-table-column>
					<el-table-column prop="date" label="反馈截图">
						<template slot-scope="scope">
							<div v-if="scope.row.operationImg">
								<el-image :src="scope.row.operationImg" fit="cover"></el-image>
							</div>
							<div v-else>待反馈</div>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="操作" width="170px">
						<template slot-scope="scope">
							<div v-if="navIndex == 1">待操作</div>
							<div v-if="navIndex == 4">
									<el-button type="info" size="mini" @click="notArrive(scope.row)">未到账</el-button>
								<el-button type="primary" size="mini" style="margin-top: 1rem;" @click="payment(scope.row)">已到账</el-button>
							</div>
							<div v-if="navIndex == 2">已完结</div>
						</template>
					</el-table-column>
				</el-table>

				<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
			</el-card>
		</div>
		<!-- 上传凭证 -->
		<el-dialog title="上传凭证" :visible.sync="voucher" :width="$globalData.dialogWidth">
		  <div>
			  <el-form :model="image" class="demo-form-inline">
			    <el-form-item label="上传凭证">
			      <el-upload
			        class="avatar-uploader"
			        action="#"
			        :show-file-list="false"
			      	:http-request="uploadFile"
			      	>
			        <img v-if="image.imgs" :src="image.imgs" class="avatar">
			        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			      </el-upload>
			    </el-form-item>
			    <el-form-item label="备注">
			      <el-input class="inputs" v-model="image.mark" placeholder="备注"></el-input>
			    </el-form-item>
			  </el-form>
			  
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="voucher = false" size="mini" :loading="$store.state.handle.btnHandle">取 消</el-button>
		    <el-button type="primary" @click="determined" size="mini" :loading="$store.state.handle.btnHandle">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 发布需求 -->
		<el-dialog title="发布需求" :visible.sync="dialogVisible" :width="$globalData.dialogWidth">
			<div>
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="110px"
					size="mini">
					<el-form-item label="需求类型">
						<el-radio-group v-model="formInline.demandType">
							<el-radio-button label="1">待退款</el-radio-button>
							<el-radio-button label="2" disabled>广告充值</el-radio-button>
							<el-radio-button label="3" disabled>本土回款</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="银行名称">
						<el-input class="inputs" v-model="formInline.bankName" placeholder="银行名称"></el-input><span
							class="inputTip">台湾地区可输入代码</span>
					</el-form-item>
					<el-form-item label="收款人姓名" v-if="siteName != '台湾'">
						<el-input class="inputs" v-model="formInline.userName" placeholder="收款人姓名"></el-input>
						<!-- <span class="inputTip">台湾地区选填</span> -->
					</el-form-item>
					<el-form-item label="收款账号">
						<el-input class="inputs" v-model="formInline.bankNo" placeholder="收款账号"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input class="inputs" type="textarea" autosize v-model="formInline.customerMark"
							placeholder="备注"></el-input>
					</el-form-item>
					<el-form-item label="退款金额">
						<el-input class="inputs" v-model="formInline.recordMoney" @blur="getPayMoney"
							placeholder="退款金额"></el-input><span class="inputTip">请输入当地货币数量！</span>
					</el-form-item>
					<el-form-item label="支付方式">
						<el-radio-group v-model="formInline.payAway">
							<el-radio label="1">支付宝</el-radio>
							<el-radio label="0">余额</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="需支付">
						<span class="aerobe">{{Number(payMoney).toFixed(2)}}元</span>
					</el-form-item>
					<el-form-item label="">
						<div><span class="inputTip">订单计算规则：(退款金额+银行手续费）÷ 汇率 + 服务费 = 需支付金额（人民币）</span></div>
						<div><span class="inputTip">手续费：{{ arithmetic.customerPoundage }}
								汇率：{{ arithmetic.customerRate }} 服务费：{{ arithmetic.customerServer }}</span></div>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="cancel" :loading="$store.state.handle.btnHandle">取 消</el-button>
				<el-button size="mini" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">支付
				</el-button>
				<div style="margin-top: 1rem;">仅支持 支付宝 或者 余额支付 </div>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import topMsg from '../components/topMsg.vue'
	export default {
		components: {
			topMsg
		},
		data() {
			return {
				inputVal: 200,
				navList: [ // '进行中','已反馈', '已完结', '有异议'
					{
						id: 1,
						title: '进行中'
					},
					{
						id: 4,
						title: '已反馈'
					},
					{
						id: 2,
						title: '已完结'
					},
					{
						id: 3,
						title: '有异议'
					}
				],
				navIndex: 1,
				dialogVisible: false,
				voucher: false,
				formInline: {
					stationId: '',
					demandType: '1',
					bankName: '',
					userName: '',
					bankNo: '',
					customerMark: '',
					recordMoney: '',
					payAway: ''
				},
				payMoney: '0.00',
				arithmetic: '',
				pageData: '',
				postData: {
					orderStatus: '1', // 订单状态0 未接单 1 执行中 2 完成 3 有争议 4 带上传凭证
					orderType: '0', // 订单类型 0 退款 1 充值 2 回款
					userType: '1', // 用户类型 1 用户 2 操作员
					pageNum: 1,
					pageSize: $globalData.pageSize,
					stationId: '',
					keyWords: '' // 用于搜索数据
				},
				image: {
					imgs: '' ,// 上传的凭证图片
					orderId: '',
					mark: ''// 备注
				},
				siteName: ''
			}
		},
		computed: {
			pathId() {
				return this.$route.params.id
			}
		},
		watch: {
			pathId(newData) {
				// 监听路由动态参数变化
				this.formInline.stationId = newData
				this.postData.stationId = newData
				this.postData.pageNum = 1
				this.getPageData()
				this.siteMsg()
			},
			dialogVisible(newData) {
				if (newData) {
					this.formInline.bankName = ''
					this.formInline.userName = ''
					this.formInline.bankNo = ''
					this.formInline.customerMark = ''
					this.formInline.recordMoney = ''
					this.formInline.payAway = ''
				}
			},
			image(newData){
				if (newData) {
					this.image.imgs = ''
					this.image.orderId = ''
					this.image.mark = ''
				}
			}
		},
		mounted() {
			// 获取路由动态参数
			this.formInline.stationId = this.pathId
			this.postData.stationId = this.pathId
			this.getPageData()
			this.siteMsg()
		},
		methods: {
			siteMsg(){
				// 获取站点信息
				let siteList = this.$store.state.users.siteList
				const site = siteList.filter(item => {
					return item.id == this.pathId
				})
				this.siteName = site[0].name
			},
			payment(row){
				// 已到账
				this.$request.postJson('/confirmRefundOrder', {
					id: row.id
				}).then(res=>{
					if(this.postData.pageNum > 1){
						this.postData.pageNum = Math.ceil((this.pageData.total-1)/$globalData.pageSize)
					}
					this.getPageData()
				})
			},
			notArrive(row){
				// 为到账
				this.image.orderId = row.id
				this.voucher = true
			},
			determined(){
				// 为到账点击确定
				if(!this.image.imgs){
					this.$alert('请上传凭证')
					return
				}
				this.$request.postJson('/dispute', this.image).then(res=>{
					if(this.postData.pageNum > 1){
						this.postData.pageNum = Math.ceil((this.pageData.total-1)/$globalData.pageSize)
					}
					this.getPageData()
					this.voucher = false
				})
			},
			paginaClick(val) {
				this.postData.pageNum = val
				this.getPageData()
			},
			getPageData() {
				// 获取表格数据
				this.$request.postJson('/selectRefundOrder', this.postData).then(res => {
					if (res.code == 200) {
						this.pageData = res.data
					}
				})
			},
			selectorNav(i) {
				this.pageData = ''
				this.navIndex = i
				this.postData.orderStatus = i
				this.postData.pageNum = 1
				this.getPageData()
			},
			search() {
				// 搜索
				if (!this.postData.keyWords) {
					this.$alert('请输入要搜索的内容')
				}
				this.postData.pageNum = 1
				this.getPageData()
			},
			demand() {
				// 发布需求
				this.dialogVisible = true
				this.arithmetic = this.$refs.topMsg.arithmetic
			},
			cancel() {
				this.dialogVisible = false
			},
			nextStep() {
				// 发布需求提交支付
				if (!this.formInline.bankName) {
					this.$alert('请输入银行名称')
					return
				} else if (!this.formInline.userName) {
					let siteList = this.$store.state.users.siteList
					const site = siteList.filter(item => {
						return item.id == this.pathId
					})
					if (site[0].name !== '台湾') {
						this.$alert('请输入收款人姓名')
						return
					}
				} else if (!this.formInline.bankNo) {
					this.$alert('请输入收款账号')
					return
				} else if (!this.formInline.recordMoney) {
					this.$alert('请输入退款金额')
					return
				} else if (this.formInline.payAway === '') {
					this.$alert('请选择支付方式')
					return
				}
				this.$request.postJson('/addRefundOrder', this.formInline).then(res => {
					if (res.code == 200) {
						if (this.formInline.payAway === '0') {
							// 余额支付
							this.$prompt('请输入交易密码', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								inputPattern: $globalData.passwordReg,
								inputErrorMessage: '密码由6-10位大小写字母和数字组成，请正确输入',
								inputType: 'password'
							}).then(({
								value
							}) => {
								this.$publicFonc.balancePayment(value, res.data.money, res.data.orderId)
									.then(data => {
										this.$message.success('支付成功，请耐心等待到账')
										this.dialogVisible = false
										this.postData.pageNum = 1
										this.$publicFonc.getUserInfo()
										this.getPageData()
									}).catch(e => {
										this.$message.error(e.msg)
									})
							})
						} else if (this.formInline.payAway === '1') {
							// 支付宝支付
							const form = res.data.body;
							    $publicFonc.deleteExisting('#alipay') // 判断之前是否插入过#alipay
							    let div = document.createElement('div');
							    div.id = 'alipay';
							    div.innerHTML = form;
							    document.body.appendChild(div);
							    document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
						}
					}
				}).catch(e=>{
					this.$alert(e.msg)
				})
			},
			getPayMoney() {
				// 获取需要支付的金额
				if (this.formInline.bankName && this.formInline.bankNo && this.formInline.recordMoney) {
					this.$request.postJson('/common/calculate', {
						money: this.formInline.recordMoney,
						stationId: this.pathId,
						orderType: this.formInline.demandType - 1,
					}).then(res => {
						if (res.code == 200) {
							this.payMoney = res.data
							this.formInline.needPayMoney = this.payMoney
						}
					})
				}
			},
			uploadFile(file) {
				// 上传凭证
				const File = file.file
				this.$publicFonc.uploadFile(File).then(res=>{
					this.image.imgs = res.data
				})
			}

		}
	}
</script>
<style scoped>
	.unluckily {
		width: 100%;

		
	}
.cardTabel {
			width: 100%;
			margin-top: 2rem;

			

		}
		.issueTitle {
			color: #3E3E3E;
			font-size: 1.7rem;
			font-weight: bold;
		}
		
		.issueBtn {
			float: right;
			margin-top: -.5rem;
		}
		.handleBox {
			display: flex;
			justify-content: flex-start;
			white-space: nowrap;
				
			
		}
		.handleList {
			position: relative;
			color: #999999;
			font-size: 1.7rem;
			padding: 1rem 0;
			margin-right: 6rem;
			cursor: pointer;
		}
			
		.selects::after {
				position: absolute;
				content: '';
				width: 100%;
				height: 0.2rem;
				background: #E60012;
				left: 0;
				bottom: 0;
			}
		.handleBoxtOP {
			display: flex;
			justify-content: space-between;
			white-space: nowrap;
		
			
		
			
		}
		.serchBox {
			margin-right: 2rem;
			width: 40rem;
			display: flex;
			justify-content: space-between;
			white-space: nowrap;
				
			
		}
		.serchBox button {
			margin-left: 2rem;
		}
	.inputTip {
		font-size: 1.2rem;
		margin-left: 1rem;
		color: #F9961E;
	}

	.inputs {
		width: 70%;
	}

	.aerobe {
		font-size: 1.8rem;
		color: #F44242;
		font-weight: bold;
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
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>
