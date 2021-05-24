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
					<div class="serchBox">
						<el-input v-model="postData.keyWords" size="mini" placeholder="请输入银行账号、金额、备注"></el-input>
						<el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
					</div>
				</div>

				<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
					<el-table-column prop="orderNo" label="订单编号"></el-table-column>
					<el-table-column prop="userName" label="收款人姓名"></el-table-column>
					<el-table-column prop="bankName" label="银行名称/代码"></el-table-column>
					<el-table-column prop="recordMoney" label="退款金额"></el-table-column>
					<el-table-column prop="needPayMoney" label="支付费用"></el-table-column>
					<el-table-column prop="createTime" label="订单计时"></el-table-column>
					<el-table-column prop="customerMark" label="备注"></el-table-column>
					<el-table-column prop="date" label="反馈截图">
						<template slot-scope="scope">
							<div v-if="scope.row.customerImg">
								<el-image :src="scope.row.customerImg" fit="cover"></el-image>
							</div>
							<div v-else>待反馈</div>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="操作">
						<template slot-scope="scope">
							<div v-if="navIndex == 1">待操作</div>
							<div v-if="navIndex == 4">
								<el-upload class="upload-demo" action="#" :show-file-list="false"
									:http-request="uploadFile">
									<el-button type="info" size="mini">未到账</el-button>
								</el-upload>
								<el-button type="primary" size="mini" style="margin-top: 1rem;">已到账</el-button>
							</div>
							<div v-if="navIndex == 2">已完结</div>
							<!-- <div v-if="navIndex == 3">
								<el-upload
								  class="upload-demo"
								  action="#"
								  :show-file-list="false"
								  :http-request="uploadFile"
								 >
								  <el-button type="success" size="mini">上传凭证</el-button>
								</el-upload>
							</div> -->
						</template>
					</el-table-column>
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
							<el-radio-button label="1">待退款</el-radio-button>
							<el-radio-button label="2" disabled>广告充值</el-radio-button>
							<el-radio-button label="3" disabled>本土回款</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="银行名称">
						<el-input class="inputs" v-model="formInline.bankName" placeholder="银行名称"></el-input><span
							class="inputTip">台湾地区可输入代码</span>
					</el-form-item>
					<el-form-item label="收款人姓名">
						<el-input class="inputs" v-model="formInline.userName" placeholder="收款人姓名"></el-input><span
							class="inputTip">台湾地区选填</span>
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
						<div><span class="inputTip">订单计算规则：退款金额+银行手续费）÷ 汇率 + 服务费 = 需支付金额（人民币）</span></div>
						<div><span class="inputTip">手续费：{{ arithmetic.customerPoundage }}
								汇率：{{ arithmetic.customerRate }}% 手续费：{{ arithmetic.customerServer }}</span></div>
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
				tableData: [{}],
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
					orderStatus: '', // 订单状态0 未接单 1 执行中 2 完成 3 有争议 4 带上传凭证
					orderType: '0', // 订单类型 0 退款 1 充值 2 回款
					userType: '1', // 用户类型 1 用户 2 操作员
					pageNum: 1,
					pageSize: $globalData.pageSize,
					keyWords: '' // 用于搜索数据
				},
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
				console.log(newData)
				this.formInline.stationId = newData
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
			}
		},
		mounted() {
			// 获取路由动态参数
			console.log(this.pathId)
			this.formInline.stationId = this.pathId
			this.getPageData()
		},
		methods: {
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
						}
						console.log(res.data)
					}
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
				this.$publicFonc.uploadFile(File)
				// console.log(file)
			}

		}
	}
</script>
<style lang="scss" scoped>
	.unluckily {
		width: 100%;

		.cardTabel {
			width: 100%;
			margin-top: 2rem;

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

				.handleBox {
					display: flex;
					justify-content: flex-start;
					white-space: nowrap;

					.handleList {
						position: relative;
						color: #999999;
						font-size: 1.7rem;
						padding: 1rem 0;
						margin-right: 6rem;
						cursor: pointer;
					}

					.selects {
						&::after {
							position: absolute;
							content: '';
							width: 100%;
							height: 0.2rem;
							background: #E60012;
							left: 0;
							bottom: 0;
						}
					}
				}

				.serchBox {
					margin-right: 2rem;
					width: 40rem;
					display: flex;
					justify-content: space-between;
					white-space: nowrap;

					button {
						margin-left: 2rem;
					}
				}
			}

		}
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
</style>
