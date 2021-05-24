<template>
	<!-- 广告充值 -->
	<div class="unluckily">
		<topMsg types="2"  ref="topMsg"></topMsg>
		<div class="cardTabel">
			<el-card>
				<div slot="header">
					<span class="issueTitle">发布中心</span>
					<el-button type="warning" size="mini" class="issueBtn" @click="demand">发布需求</el-button>
				</div>
				<!-- <div class="handleBox">
				   <div class="handleList" v-for="(item, index) in navList" :key="index" :class="navIndex==index?'selects':''" @click="selectorNav(index)">{{ item }}</div>
               </div> -->
				<div class="handleBoxtOP">
					<div class="handleBox">
						<div class="handleList" v-for="item in navList" :key="item.id"
							:class="navIndex==item.id?'selects':''" @click="selectorNav(item.id)">{{ item.title }}</div>
					</div>
					<div class="serchBox">
						<el-input v-model="postData.keyWords" size="mini" placeholder="请输入银行账号、金额、备注"></el-input>
						<el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
					</div>
				</div>
				<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
					<el-table-column prop="orderNo" label="订单编号"></el-table-column>
					<el-table-column prop="shopName" label="店铺账号"></el-table-column>
					<el-table-column prop="shopPass" label="店铺密码"></el-table-column>
					<el-table-column prop="topUpMonery" label="充值金额"></el-table-column>
					<el-table-column prop="needPayMoney" label="支付费用"></el-table-column>
					<el-table-column prop="createTime" label="订单计时"></el-table-column>
					<el-table-column prop="date" label="操作"></el-table-column>
					<el-table-column prop="date" label="反馈截图"></el-table-column>
					<el-table-column prop="date" label="备注"></el-table-column>
				</el-table>

				<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
			</el-card>
		</div>
		<!-- 发布需求 -->
		<el-dialog title="发布需求" :visible.sync="dialogVisible" :width="$globalData.dialogWidth">
			<div>
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="110px"
					size="mini">
					<el-form-item label="需求类型">
						<el-radio-group v-model="formInline.demandType">
							<el-radio-button label="1" disabled>待退款</el-radio-button>
							<el-radio-button label="2">广告充值</el-radio-button>
							<el-radio-button label="3" disabled>本土回款</el-radio-button>
						</el-radio-group>
					</el-form-item>
					
					<div v-if="siteName == '印尼'">
						<!-- 印尼 -->
						<el-form-item label="平台虚拟账号">
							<el-input class="inputs" v-model="formInline.virtualAccount" placeholder="平台虚拟账号"></el-input>
						</el-form-item>
					</div>
					<div v-else-if="siteName == '越南'">
						<!-- 越南 -->
						<el-form-item label="收款二维码">
							<el-upload class="avatar-uploader" action="#" :show-file-list="false"
								:http-request="uploadFile">
								<img v-if="formInline.codeImg" :src="formInline.codeImg" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								<div class="el-upload__tip" slot="tip">只支持.jpg 格式</div>
							</el-upload>
						</el-form-item>
					</div>
					<div v-else>
						<!-- 通用 -->
						<el-form-item label="店铺账号">
							<el-input class="inputs" v-model="formInline.shopName" placeholder="店铺账号"></el-input>
						</el-form-item>
						<el-form-item label="店铺密码">
							<el-input class="inputs" v-model="formInline.shopPass" placeholder="店铺密码"></el-input>
						</el-form-item>
					</div>
					<el-form-item label="备注">
						<el-input class="inputs" type="textarea" autosize v-model="formInline.customerMark" placeholder="备注">
						</el-input>
					</el-form-item>
					<el-form-item label="充值金额">
						<el-input class="inputs" v-model="formInline.topUpMonery" placeholder="充值金额"  @blur="getPayMoney"></el-input><span
							class="inputTip">请输入当地货币数量！</span>
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
						<div><span class="inputTip">订单计算规则：(充值金额+银行手续费）÷ 汇率 + 服务费 = 需支付金额（人民币）</span></div>
						<div><span class="inputTip">手续费：{{ arithmetic.customerPoundage }} 汇率：{{ arithmetic.customerRate }}% 对账手续费：{{ arithmetic.customerServer }}</span></div>
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
				formInline: {
					demandType: '2',
					shopName: '' ,// 店铺账号
					shopPass: '' ,// 店铺密码
					customerMark: '' ,// 客户备注
					topUpMonery: '' ,// 充值金额
					payAway: '' ,// 支付方式（0 余额 1 支付宝）
					// 印尼
					virtualAccount: '' ,// 虚拟账户
					// 越南
					codeImg: '' ,// 二维码图片
					stationId: '' , // 站点id
					needPayMoney: ''
				},
				arithmetic: '',
				siteName: '', // 站点名称
				payMoney: '',
				pageData: '',
				postData: {
					keyWords: '',
					orderStatus: '1', // 订单状态0 未接单 1 执行中 2 完成 3 有争议 4 带上传凭证
					orderType: '0', // 订单类型 0 退款 1 充值 2 回款
					userType: '1', // 用户类型 1 用户 2 操作员
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				// imageUrl: ''
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
				// console.log(newData)
				this.formInline.stationId = newData
				this.siteMsg()
				this.postData.pageNum = 1
				this.getPageData()
			},
			dialogVisible(newData) {
				if (newData) {
					this.formInline.shopName = ''
					this.formInline.shopPass = ''
					this.formInline.bankNo = ''
					this.formInline.customerMark = ''
					this.formInline.topUpMonery = ''
					this.formInline.payAway = ''
					this.formInline.virtualAccount = ''
					this.formInline.codeImg = ''
				}
			},
		},
		mounted() {
			// 获取路由动态参数
			// console.log(this.pathId)
			this.siteMsg()
			this.getPageData()
			this.formInline.stationId = this.pathId
		},
		methods: {
			paginaClick(val) {
				this.postData.pageNum = val
				this.getPageData()
			},
			selectorNav(i) {
				this.pageData = ''
				this.navIndex = i
				this.postData.orderStatus = i
				this.postData.pageNum = 1
				this.getPageData()
			},
			demand() {
				this.dialogVisible = true
				this.arithmetic = this.$refs.topMsg.arithmetic
			},
			uploadFile(file) {
				const File = file.file
				this.$publicFonc.uploadFile(File).then(res=>{
					this.formInline.codeImg = res.data
				})
			},
			nextStep() {
				if(this.siteName == '印尼'){
					if (!this.formInline.virtualAccount) {
						this.$alert('请输入虚拟账户')
						return
					}
				} else if(this.siteName == '越南'){
					if (!this.formInline.codeImg) {
						this.$alert('请上传二维码')
						return
					}
				} else {
					if (!this.formInline.shopName) {
						this.$alert('请输入店铺账号')
						return
					} else if (!this.formInline.shopPass){
						this.$alert('请输入店铺密码')
						return
					}
				}
				if (!this.formInline.topUpMonery) {
					this.$alert('请输入充值金额')
					return
				} else if (this.formInline.payAway === ''){
					this.$alert('请选择支付方式')
					return
				}
				this.$request.postJson('/topup/addTopUp', this.formInline).then(res => {
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
								this.$request.postJson('/topup/payTopYue', {
									money: res.data.needPayMoney,
									payPassword: value,
									orderId: res.data.orderNo
								}).then(data=>{
									if(data.code == 200){
										this.$message.success('支付成功，请耐心等待到账')
										this.dialogVisible = false
										this.postData.pageNum = 1
										this.$publicFonc.getUserInfo()
										this.getPageData()
									}
								}).catch(e=>{
									this.$message.error(e.msg)
								})
							})
						} else if (this.formInline.payAway === '1') {
							// 支付宝支付
						}
					}
				})
			},
			cancel() {
				this.dialogVisible = false
			},
			search() {
				// 搜索
				if (!this.postData.keyWords) {
					this.$alert('请输入要搜索的内容')
				}
				this.postData.pageNum = 1
				this.getPageData()
			},
			getPayMoney() {
				// 获取需要支付的金额
				if (this.formInline.topUpMonery) {
					this.$request.postJson('/common/calculate', {
						money: this.formInline.topUpMonery,
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
			siteMsg(){
				// 获取站点信息
				let siteList = this.$store.state.users.siteList
				const site = siteList.filter(item => {
					return item.id == this.pathId
				})
				this.siteName = site[0].name
			},
			getPageData() {
				// 获取表格数据
				this.$request.postJson('/topup/selectTopOrder', this.postData).then(res => {
					if (res.code == 200) {
						this.pageData = res.data
					}
				})
			},
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

	.handleBoxtOP {
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
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
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>
