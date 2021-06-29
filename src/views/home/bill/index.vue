<template>
	<div class="pageHome">
        <userInfo></userInfo>
        <div class="billTabel">
            <div class="billTitle">【账单记录】</div>
            <div class="selectorBox">
                <span class="titles">起止时间：</span>
                <el-date-picker
                    size="mini"
                    v-model="selectorDate"
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="selectorBox">
                <span class="titles">账单类型：</span>
				<!-- "0 普通充值  1 广告充值 2 退款充值  3 回款充值  4  提现 5 返现" -->
                <div class="btnsList" :class="postData.orderType == ''?'selectBtns':''" @click="billTypes('')">全部</div>
                <div class="btnsList" :class="postData.orderType == '0'?'selectBtns':''" @click="billTypes('0')">充值</div>
                <div class="btnsList" :class="postData.orderType == '4'?'selectBtns':''" @click="billTypes('4')">提现</div>
                <div class="btnsList" :class="postData.orderType == '2'?'selectBtns':''" @click="billTypes('2')">代退款</div>
                <div class="btnsList" :class="postData.orderType == '1'?'selectBtns':''" @click="billTypes('1')">广告充值</div>
                <div class="btnsList" :class="postData.orderType == '3'?'selectBtns':''" @click="billTypes('3')">本土回款</div>
                <div class="btnsList" :class="postData.orderType == '5'?'selectBtns':''" @click="billTypes('5')">返现</div>
            </div>
            <div class="selectorBox">
                <span class="titles">收支类型：</span>
                <div class="btnsList" :class="postData.inout == ''?'selectBtns':''" @click="expenses('')">全部</div>
                <div class="btnsList" :class="postData.inout == '0'?'selectBtns':''" @click="expenses('0')">收入</div>
                <div class="btnsList" :class="postData.inout == '1'?'selectBtns':''" @click="expenses('1')">支出</div>
            </div>
            <!-- <div class="selectorBox">
                <span class="titles">账单状态：</span>
                <div class="btnsList selectBtns">全部</div>
                <div class="btnsList">已到账</div>
                <div class="btnsList">审核中</div>
            </div> -->
            <div class="tabels">
                <el-table :data="pageData.list" border style="width: 100%">
                    <el-table-column prop="type" label="账单类型">
						<template slot-scope="scope">
							{{ scope.row.type == '0'?'充值':scope.row.type == '1'?'广告充值':scope.row.type == '2'?'代退款':scope.row.type == '3'?'本土回款':scope.row.type == '4'?'提现':scope.row.type == '5'?'返现':''}}
						</template>
					</el-table-column>
                    <el-table-column prop="orderId" label="账单单号"></el-table-column>
                    <el-table-column prop="money" label="金额"></el-table-column>
                    <!-- <el-table-column prop="date" label="返现"></el-table-column> -->
                    <el-table-column prop="date" label="交易方式">
						<template slot-scope="scope">
							<!-- 0 支付宝 1 银行卡 -->
							{{ scope.row.withdrawalType == '0'?'支付宝':scope.row.withdrawalType == '1'?'银行卡':'余额'}}
						</template>
					</el-table-column>
                    <!-- <el-table-column prop="date" label="钱包余额"></el-table-column> -->
                    <el-table-column prop="createTime" label="提交时间"></el-table-column>
                </el-table>

		        <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>

            </div>
        </div>
		<!-- <card>
            <template slot="content">
                123123
            </template>
        </card> -->
	</div>

</template>

<script>
	import userInfo from '../components/userInfo.vue'
	// import introduce from './components/introduce.vue'
	// import news from './components/news.vue'
	export default {
		components: {
			userInfo,
			// introduce,
			// news
		},
		data() {
			return {
                selectorDate: [],
				postData: {
					pageNum: 1,
					pageSize: $globalData.pageSize,
					orderType: '', // "0 普通充值  1 广告充值 2 退款充值  3 回款充值  4  提现 5 返现"
					inout: '', // 收入 0   支出 1
					beginTime: '',
					endTime: ''
				},
				pageData: ''
				
			}
		},
		mounted() {
			if(!this.$store.getters.getBreadcrumb.includes('收支账单')){
				this.$store.getters.getBreadcrumb.push('收支账单')
			}
			console.log(this.$store.getters.getBreadcrumb)
			this.getPageData()
		},
		watch: {
			selectorDate(data){
				if(data && data.length > 0){
					this.postData.beginTime = data[0]
					this.postData.endTime = data[1]
				} else {
					this.postData.beginTime = ''
					this.postData.endTime = ''
				}
				this.postData.pageNum = 1
				this.getPageData()
			}
		},
		methods: {
			expenses(type){
				this.postData.inout = type
				this.postData.pageNum = 1
				this.getPageData()
			},
			billTypes(type){
				this.postData.orderType = type
				this.postData.pageNum = 1
				this.getPageData()
			},
			paginaClick(val) {
				this.postData.pageNum = val
				this.getPageData()
			},
			getPageData(){
				this.$request.postJson('/back/getUserBill', this.postData).then(res=>{
					if(res.code == 200){
						this.pageData = res.data
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.pageHome {
		width: 100%;
        .billTabel{
            width: 100%;
            padding: 2rem 4rem;
            background: #46b2ec70;
            border-radius: 10px;
            .billTitle{
                color: #383535;
                font-size: 1.8rem;
                font-weight: bold;
            }
            .selectorBox{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                white-space: nowrap;
                align-items: center;
                margin-top: 1.5rem;
                .titles{
                    font-size: 1.8rem;
                    color: #F6F7F8;
                    padding-left: 1rem;
                }
                .btnsList{
                    padding: 0.2rem 1rem;
                    text-align: center;
                    color: #F6F7F8;
                    border: 1px solid #F6F7F8;
                    font-size: 1.8rem;
                    border-radius: 5px;
                    margin-left: 1.5rem;
                    cursor: pointer;
                }
                .selectBtns{
                    background: #FFB30F;
                    border: 1px solid #FFB30F;
                }
            }
            .tabels{
                margin-top: 2rem;
            }
        }
	}

	
</style>
