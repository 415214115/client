<template>
	<!-- 待退款 -->
   <div class="unluckily">
	   <topMsg></topMsg>
       <div class="cardTabel">
           <el-card>
               <div slot="header">
                   <span class="issueTitle span">接单大厅</span>
				   <span class="issueBtn span" @click="toMyOrders">我的订单</span>
                   <!-- <el-button type="warning" size="mini" class="issueBtn">我的订单</el-button> -->
               </div>
              <!-- <div class="handleBox">
				   <div class="handleList" v-for="(item, index) in navList" :key="index" :class="navIndex==index?'selects':''" @click="selectorNav(index)">{{ item }}</div>
               </div> -->
               <el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
                    <el-table-column prop="orderNo" label="订单编号"></el-table-column>
                    <el-table-column prop="userName" label="收款人姓名"></el-table-column>
                    <el-table-column prop="bankName" label="银行名称/代码"></el-table-column>
                    <el-table-column prop="recordMoney" label="退款金额"></el-table-column>
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
	components:{
		topMsg
	},
    data(){
        return{
            // inputVal: 200,
            tableData: [{}],
			// navList:['进行中','已反馈', '已完结', '有异议'],
			// navIndex: 0
			pageData: '',
			postData: {
				orderType: '0', // 订单类型 0 退款 1 充值 2 回款
				userType: '3', // 用户类型 2 用户 3 操作员
				stationId: '',
				pageNum: 1,
				pageSize: $globalData.pageSize
			}
        }
    },
    computed:{
        // result(){
        //     const money = Number(this.inputVal) + 15
        //     const parities = money / 4
        //     const data = parities + 6
        //     return data
        // },
		pathId(){
			return this.$route.params.id
		}
    },
	watch:{
		pathId(newData){
			// 监听路由动态参数变化
			console.log(newData)
			this.postData.stationId = newData
			this.postData.pageNum = 1
			this.getPageData()
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
		this.postData.stationId = this.pathId
		this.getPageData()
	},
    methods:{
        paginaClick(val){
			this.postData.pageNum = val
			this.getPageData()
        },
		// selectorNav(i){
		// 	this.navIndex = i
		// },
		toMyOrders(){
			this.$router.push(`/operatorsite/operatorunluckily/operatororderbay/${this.pathId}`)
		},
		getPageData(){
			this.$request.postJson('/selectCanTakeOrder', this.postData).then(res=>{
				if(res.code==200 && res.data){
					this.pageData = res.data
				}
			})
		},
		grabASingle(row){
			// 抢单
			this.$request.postJson('/opeTakeOrder', {
				orderNo: row.orderNo
			}).then(res=>{
				if(res.code == 200){
					this.$message.success('抢单成功')
					if(this.postData.pageNum > 1){
						this.postData.pageNum = $publicFonc.paging(this.postData.total)
					}
					this.getPageData()
				}
			})
		}
    }
}
</script>
<style lang="scss" scoped>
    .unluckily{
        width: 100%;
        .cardTabel{
            width: 100%;
            margin-top: 2rem;
			.span{
				cursor: pointer;
			}
            .issueTitle{
                color: #3E3E3E;
                font-size: 1.7rem;
                font-weight: bold;
            }
            .issueBtn{
                float: right;
				font-size: 1.7rem;
                // margin-top: -.5rem;
            }
            .handleBox{
                display: flex;
                justify-content: flex-start;
                white-space: nowrap;
                .handleList{
                    position: relative;
                    color: #999999;
                    font-size: 1.7rem;
                    padding: 1rem 0;
                    margin-right: 6rem;
                    cursor: pointer;
                }
                .selects{
                    &::after{
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
        }
    }
</style>