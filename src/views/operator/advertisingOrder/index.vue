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
				   <div class="handleList" v-for="(item, index) in navList" :key="index" :class="navIndex==index?'selects':''" @click="selectorNav(index)">{{ item }}</div>
               </div>
			   <!-- <orderTabel v-if="navIndex == 0"></orderTabel> -->
			   <!-- <proceedTabel v-if="navIndex == 0"></proceedTabel>
			   <statementTabel v-if="navIndex == 1"></statementTabel>
			   <endTabel v-if="navIndex == 2"></endTabel>
			   <disputeTabel v-if="navIndex == 3"></disputeTabel> -->
               <el-table :data="tableData" border style="width: 100%;margin-top: 2rem;">
                    <el-table-column prop="date" label="订单编号"></el-table-column>
                    <el-table-column prop="date" label="店铺账号"></el-table-column>
                    <el-table-column prop="date" label="店铺密码"></el-table-column>
                    <el-table-column prop="date" label="充值金额"></el-table-column>
                    <el-table-column prop="date" label="支付费用"></el-table-column>
                    <el-table-column prop="date" label="订单计时"></el-table-column>
                    <el-table-column prop="date" label="操作"></el-table-column>
                    <el-table-column prop="date" label="反馈截图"></el-table-column>
                    <el-table-column prop="date" label="备注"></el-table-column>
                </el-table>

		        <paginaTion :totalNum="0" @paginaClick="paginaClick"></paginaTion>
				
           </el-card>
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
	components:{
		topMsg,
		// orderTabel,
		// proceedTabel,
		// statementTabel,
		// disputeTabel,
		// endTabel
	},
    data(){
        return{
            // inputVal: 200,
            tableData: [{}],
			navList:['进行中','已反馈', '已完结', '有异议'],
			navIndex: 0
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
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
		this.$store.getters.getBreadcrumb.push('我的订单')
	},
    methods:{
        paginaClick(val){

        },
		selectorNav(i){
			this.navIndex = i
		},
		pageBack(){
			this.$router.back()
		}
    },
	beforeDestroy() {
		this.$store.getters.getBreadcrumb.pop()
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
                // font-weight: bold;
            }
            .issueBtn{
                float: right;
				color: #3E3E3E;
				font-size: 1.7rem;
				font-weight: bold;
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