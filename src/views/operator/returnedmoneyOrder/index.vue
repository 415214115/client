<template>
	<!-- 待退款 -->
	<div class="unluckily">
		<topMsg></topMsg>
		<div class="cardTabel">
			<el-card>
				<div slot="header">
					<span class="issueTitle span" @click="pageBack">接单大厅</span>
					<span class="issueBtn span">我的订单</span>
					<!-- <el-button type="warning" size="mini" class="issueBtn">我的订单</el-button> -->
				</div>
				<div class="handleBox">
					<div class="handleList" v-for="item in navList" :key="item.id"
						:class="navIndex==item.id?'selects':''" @click="selectorNav(item.id)">{{ item.title }}</div>
				</div>
				<!-- <orderTabel v-if="navIndex == 0"></orderTabel> -->
				<!-- <proceedTabel v-if="navIndex == 0"></proceedTabel>
			   <statementTabel v-if="navIndex == 1"></statementTabel>
			   <endTabel v-if="navIndex == 2"></endTabel>
			   <disputeTabel v-if="navIndex == 3"></disputeTabel> -->
				<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
					<el-table-column prop="orderNum" label="订单编号"></el-table-column>
					<el-table-column prop="createTime" label="订单时间"></el-table-column>
					<div v-if="navIndex !== 0">
						<!-- <el-table-column prop="date" label="店铺名称"></el-table-column> -->
						<!-- <el-table-column prop="date" label="交易流水编号"></el-table-column> -->
						<el-table-column prop="date" label="提款截图">
							<template slot-scope="scope">
								<el-image style="width: 64px; height: 64px"
									v-if="scope.row.customerList&&scope.row.customerList.length"
									:src="scope.row.customerList[0]" :preview-src-list="scope.row.customerList"
									fit="cover"></el-image>
							</template>
						</el-table-column>
					</div>

					<el-table-column prop="estimatedAmount" label="回款金额（当地货币）"></el-table-column>
					<el-table-column prop="expectMoney" label="待到账（人民币）" v-if="navIndex !== 0"></el-table-column>
					<el-table-column prop="date" label="状态/操作" width="180">
						<template slot-scope="scope">
							<div v-if="navIndex == 0">已接单</div>
							<div v-if="navIndex == 1">
								<el-button type="primary" size="mini" @click="notArrive(scope.row)"
									:loading="$store.state.handle.btnHandle">未到账</el-button>
								<el-button type="primary" size="mini" @click="confirmReceipt(scope.row)"
									:loading="$store.state.handle.btnHandle">确认到账</el-button>
							</div>
							<div v-if="navIndex == 4">
								<el-button type="primary" size="mini" @click="recharge(scope.row)"
									:loading="$store.state.handle.btnHandle">去充值</el-button>
							</div>
							<div v-if="navIndex == 2">已完结</div>
							<div v-if="navIndex == 3">
								<el-button type="primary" size="mini" @click="notArrive(scope.row)"
									:loading="$store.state.handle.btnHandle">上传未到账截图</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>

				<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>

			</el-card>
		</div>
		<!-- 上传凭证 -->
	<!-- 	<el-dialog title="上传凭证" :visible.sync="voucher" :width="$globalData.dialogWidth">
			<div>
				<el-form :model="image" class="demo-form-inline" label-width="10rem" label-position="right">
					<el-form-item label="上传凭证">
						<el-upload class="avatar-uploader" action="#" :show-file-list="false"
							:http-request="uploadFile">
							<img v-if="image.img" :src="image.img" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="备注">
						<el-input class="inputs" v-model="image.remark" placeholder="备注"></el-input>
					</el-form-item>
				</el-form>

			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="voucher = false" size="mini" :loading="$store.state.handle.btnHandle">取 消</el-button>
				<el-button type="primary" @click="determined" size="mini" :loading="$store.state.handle.btnHandle">确 定
				</el-button>
			</span>
		</el-dialog> -->
		<!-- 扫码支付 -->
		<!-- <el-dialog title="请用支付宝扫码" :visible.sync="scanCode" :width="$globalData.dialogWidth">
	     <div v-html="codedialog"> </div>
	     <span slot="footer" class="dialog-footer">
	       <el-button @click="scanCode = false" size="mini" :loading="$store.state.handle.btnHandle">取 消</el-button>
	       <el-button type="primary" @click="determined" size="mini" :loading="$store.state.handle.btnHandle">确 定</el-button>
	     </span>
	   </el-dialog> -->
		<div id="codedialog" style="display: none;" v-html="codedialog">
			<form action="" id="bbb"></form>
			<form name="punchout_form" method="post" id="aaaaa"
				action="https://openapi.alipay.com/gateway.do?charset=UTF-8&amp;method=alipay.trade.page.pay&amp;sign=qcg25udj7zvKpVmTkDhNYA54LM4bhyes7Z7cl%2F%2BBC8e%2BIpJS3p62i6oKmUhjAETOyQ5XCEu5TXs7sR6rxIMLBfGstoKq3c6lJXfbLrhDK4E4GjR5m6Qa7ad2NnoFdUZC6L%2FdaBs5HBj40CK7oL2rHrewjWXqCP3fVdW4uauExTwQaODe%2B67fRMCh3Jaj88GrLfFbp61a2nwfIQWM9jIWJbnkahu%2F3vqDCOKFsMvG%2BtFBaox%2F4MsjTnkkVi4GGaHuHEbiiHW9Xxi9H3asqLzPUeBJjllzX%2FLeb%2FGELOLg9APr7EO0MEmKerBZyqwpHn1tTWMek8yt9C0MCV%2BW2TdX4A%3D%3D&amp;return_url=http%3A%2F%2Fapi.mockview.cn%2Falipay%2FreturnUrl&amp;notify_url=http%3A%2F%2Flocalhost%3A8889%2FAlipayCallBack%2FCallback&amp;version=1.0&amp;app_id=2021002139691352&amp;sign_type=RSA2&amp;timestamp=2021-06-05+16%3A49%3A44&amp;alipay_sdk=alipay-sdk-java-3.3.4.ALL&amp;format=json">
				<input type="hidden" name="biz_content"
					value="{&quot;out_trade_no&quot;:&quot;HK202105260003&quot;,&quot;total_amount&quot;:&quot;-6136.000&quot;,&quot;subject&quot;:&quot;用户回款&quot;,&quot;body&quot;:&quot;null&quot;,&quot;timeout_express&quot;:&quot;1d&quot;,&quot;passback_params&quot;:&quot;null&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}">
				<input type="submit" value="立即支付" style="display:none">
			</form>
		</div>
	</div>
</template>
<script>
	import topMsg from '../components/topMsg.vue'
	// import orderTabel from './components/orderTabel.vue'
	// import proceedTabel from './components/proceedTabel.vue'
	// import statementTabel from './components/statementTabel.vue'
	// import disputeTabel from './components/disputeTabel.vue'
	// import endTabel from './components/endTabel.vue'
	export default {
		components: {
			topMsg,
			// orderTabel,
			// proceedTabel,
			// statementTabel,
			// disputeTabel,
			// endTabel
		},
		data() {
			return {
				// inputVal: 200,
				voucher: false,
				scanCode: false, // 扫码
				codedialog: '',
				tableData: [{}],
				image: {
					img: '', // 上传的凭证图片
					orderId: '',
					orderNo: '',
					updateStatus: '',
					remark: '' // 备注
				},
				navList: [{
						id: 0,
						title: '已接单'
					},
					{
						id: 1,
						title: '进行中'
					},
					{
						id: 4,
						title: '待结算'
					},
					{
						id: 3,
						title: '争议中'
					},
					{
						id: 2,
						title: '已完结'
					}
				],
				navIndex: 0,
				postData: {
					receiveOpeStatus: 0,
					orderNO: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				pageData: ''
			}
		},
		computed: {
			// result(){
			//     const money = Number(this.inputVal) + 15
			//     const parities = money / 4
			//     const data = parities + 6
			//     return data
			// },
			pathId() {
				return this.$route.params.id
			}
		},
		watch: {
			pathId(newData) {
				// 监听路由动态参数变化
				console.log(newData)
				this.postData.pageNum = 1
				this.getPageData()
			},
			voucher(newdata) {
				if (!newdata) {
					this.image.img = ''
					this.image.orderId = ''
					this.image.orderNo = ''
					this.image.updateStatus = ''
					this.image.remark = ''
				}
			}
		},
		mounted() {
			// 获取路由动态参数
			console.log(this.pathId)
			if (!this.$store.getters.getBreadcrumb.includes('我的订单')) {
				this.$store.getters.getBreadcrumb.push('我的订单')
			}
			this.getPageData()
			// setTimeout(() => {
			// 	let doc = document.getElementById('bbb')
			// 	console.log(doc)
			// }, 300)
		},
		methods: {
			paginaClick(val) {
				this.postData.pageNum = 1
				this.getPageData()
			},
			selectorNav(i) {
				this.pageData = ''
				this.navIndex = i
				this.postData.receiveOpeStatus = i
				this.postData.pageNum = 1
				this.getPageData()
			},
			pageBack() {
				this.$router.back()
			},
			notArrive(row) {
				// 未到账
				this.image.updateStatus = 0
				this.image.orderId = row.id
				this.image.orderNo = row.orderNo
				this.voucher = true
			},
			deleteExisting(id){
				let div = document.getElementById(id)
				if(div){
					let body = document.getElementsByTagName('body')[0]
					body.removeChild(div)
				}
				
			},
			recharge(row) {
				// 充值
				this.$request.postJson('/receivable/charge', {
					orderId: row.id
				}).then(res => {
					if (res.code == 200) {
						// this.htmls = res.data.body
						const form = res.data.body;
						    $publicFonc.deleteExisting('#alipay'); // 判断之前是否插入过#alipay
						    let div = document.createElement('div');
						    div.id = 'alipay';
						    div.innerHTML = form;
						    document.body.appendChild(div);
						    document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
							
				
					}
				})
			},
			confirmReceipt(row) {
				// 确认到账
				this.$request.postJson('/receivable/confirm', {
					orderId: row.id,
					updateStatus: 1
				}).then(res => {
					if (res.code == 200) {
						if (this.postData.pageNum > 1) {
							this.postData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
						}
						this.getPageData()
						this.$message.success('操作成功')
					}
				})
			},
			getPageData() {
				this.$request.postJson('/receivable/selectOrderByUser', this.postData).then(res => {
					if (res.code == 200 && res.data) {
						this.pageData = res.data
					}
				})
			},
			uploadFile(file) {
				// 上传凭证
				const File = file.file
				this.$publicFonc.uploadFile(File).then(res => {
					this.image.img = res.data
				})
			},
			determined() {
				// 上传凭证
				if (!this.image.img) {
					this.$alert('请上传凭证')
					return
				}
				this.$request.postJson('/receivable/confirm', this.image).then(res => {
					if (res.code == 200) {
						if (this.postData.pageNum > 1) {
							this.postData.pageNum = Math.ceil((this.pageData.total - 1) / $globalData.pageSize)
						}
						this.getPageData()
						this.$message.success('操作成功')
						this.voucher = false
					}
				})
			},
		},
		beforeDestroy() {
			this.$store.getters.getBreadcrumb.pop()
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
		font-size: 1.7rem;
	}

	.span {
		cursor: pointer;
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
