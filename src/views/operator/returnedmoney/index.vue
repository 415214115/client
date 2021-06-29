<template>
	<!-- 本土回款 -->
   <div class="unluckily">
	   <topMsg></topMsg>
       <div class="cardTabel">
           <el-card>
               <div slot="header">
                   <span class="issueTitle span">接单大厅</span>
				   <span class="issueBtn span" @click="toMyOrders">我的订单</span>
                   <!-- <el-button type="warning" size="mini" class="issueBtn">我的订单</el-button> -->
               </div>
               <el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
                    <el-table-column prop="orderNum" label="订单编号"></el-table-column>
                    <el-table-column prop="createTime" label="订单时间"></el-table-column>
                    <el-table-column prop="estimatedAmount" label="大致回款金额总计"></el-table-column>
                    <el-table-column prop="expectMoney" label="预计到账金额"></el-table-column>
                    <el-table-column prop="shopNum" label="店铺数量"></el-table-column>
                    <el-table-column prop="updateTime" label="订单计时"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
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
            tableData: [{}],
			pageData: '',
			postData: {
				orderType: '2', // 订单类型 0 退款 1 充值 2 回款
				userType: '3', // 用户类型 2 用户 3 操作员
				stationId: '',
				pageNum: 1,
				pageSize: $globalData.pageSize
			}
        }
    },
    computed:{
		pathId(){
			return this.$route.params.id
		}
    },
	watch:{
		pathId(newData){
			// 监听路由动态参数变化
			console.log(newData)
			this.postData.pageNum = 1
			this.getPageData()
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
		this.getPageData()
	},
    methods:{
        paginaClick(val){
			this.postData.pageNum = val
			this.getPageData()
        },
		toMyOrders(){
			this.$router.push(`/operatorsite/operatorreturnedmoney/operatorreturnedmoneyorderbay/${this.pathId}`)
		},
		getPageData(){
			this.$request.postJson('/receivable/getOrderList', this.postData).then(res=>{
				if(res.code==200 && res.data){
					this.pageData = res.data
				}
			})
		},
		grabASingle(row){
			// 抢单
			this.$request.postJson('/receivable/getOrder', {
				id: row.id
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