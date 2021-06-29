<template>
	<div class="unluckily">
		<topMsg types="2"></topMsg>
		<div class="cardTabel">
			<el-card>
				<div slot="header">
					<span class="issueTitle">发布中心</span>
					<span class="issueBtn span" @click="toMyOrders">我的订单</span>
				</div>
				<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
					<el-table-column prop="orderNo" label="订单编号"></el-table-column>
					<el-table-column v-if="siteName == '台湾'" prop="shopName" label="银行代码"></el-table-column>
					<el-table-column v-if="siteName == '台湾'" prop="shopPass" label="银行账号"></el-table-column>
					<el-table-column prop="date" v-if="siteName == '越南'" label="平台收款二维码">
						<template slot-scope="scope">
							<el-image style="width: 64px; height: 64px" v-if="scope.row.codeImg" :src="scope.row.codeImg" fit="cover"></el-image>
						</template>
					</el-table-column>
					<el-table-column v-if="siteName == '印尼'" prop="virtualAccount" label="平台虚拟账号"></el-table-column>
					<el-table-column v-if="siteName == ''" prop="shopName" label="店铺账号"></el-table-column>
					<el-table-column v-if="siteName == ''" prop="shopPass" label="店铺密码"></el-table-column>
					<el-table-column prop="topUpMonery" label="充值金额"></el-table-column>
					<el-table-column prop="needPayMoney" label="支付费用"></el-table-column>
					<el-table-column prop="createTime" label="订单时间"></el-table-column>
					<el-table-column prop="date" label="反馈截图">
						<template slot-scope="scope">
							<el-image style="width: 64px; height: 64px" v-if="scope.row.customerImg" :src="scope.row.customerImg" fit="cover"></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="customerMark" label="备注"></el-table-column>
					<el-table-column prop="date" label="操作">
						<template slot-scope="scope">
							<el-button type="primary" size="small" @click="grabASingle(scope.row)" :loading="$store.state.handle.btnHandle">接单</el-button>
						</template>
					</el-table-column>
				</el-table>
				<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
			</el-card>
		</div>
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
				siteName: '', // 站点名称
				inputVal: 200,
				pageData: '',
				postData: {
					orderType: '1', // 订单类型 0 退款 1 充值 2 回款
					userType: '3', // 用户类型 2 用户 3 操作员
					stationId: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				}
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
				this.getSiteList()
				this.postData.pageNum = 1
				this.getPageData()
			}
		},
		mounted() {
			// 获取路由动态参数
			this.getSiteList()
			this.getPageData()
		},
		methods: {
			paginaClick(val) {
				this.postData.pageNum = val
				this.getPageData()
			},
			// selectorNav(i){
			// 	this.navIndex = i
			// },
			toMyOrders() {
				this.$router.push(`/operatorsite/operatoradvertising/operatoradvertisingorderbay/${this.pathId}`)
			},
			getPageData() {
				this.$request.postJson('/topup/selectCanTakeTopOrder', this.postData).then(res => {
					if (res.code == 200 && res.data) {
						this.pageData = res.data
					}
				})
			},
			grabASingle(row){
				// 抢单
				this.$request.postJson('/topup/opeTakeTopOrder', {
					orderId: row.id
				}).then(res=>{
					if(res.code == 200){
						this.$message.success('抢单成功')
						if(this.postData.pageNum > 1){
							this.postData.pageNum = $publicFonc.paging(this.postData.total)
						}
						this.getPageData()
					}
				})
			},
			getSiteList() {
				// 判断站点
				let siteList = this.$store.state.users.siteList
				let siteId = this.pathId
				let site = siteList.filter(item => {
					if (item.id == siteId) {
						return item
					}
				})
				if (site[0].name == '台湾' || site[0].name == '越南' || site[0].name == '印尼') {
					this.siteName = site[0].name
				} else {
					this.siteName = ''
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
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
</style>
