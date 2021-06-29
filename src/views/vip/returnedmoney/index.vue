<template>
	<!-- 本土回款 -->
   <div class="unluckily">
	   <topMsg types="3"></topMsg>
       <div class="cardTabel">
           <el-card>
               <div slot="header">
                   <span class="issueTitle">发布中心</span>
                   <el-button type="warning" size="mini" class="issueBtn" @click="demand">发布需求</el-button>
               </div>
               <div class="handleBox">
				   <div class="handleList" v-for="item in navList" :key="item.id"
				   	:class="navIndex==item.id?'selects':''" @click="selectorNav(item.id)">{{ item.title }}</div>
               </div>
			   <!-- 回款订单 -->
              <orderTabel v-if="navIndex == 0" :pageData="pageData"></orderTabel>
			  <!-- 进行中 -->
			  <proceedTabel v-if="navIndex == 1" :pageData="pageData"></proceedTabel>
			  <!-- 待结算 -->
			  <statementTabel v-if="navIndex == 4" :pageData="pageData"></statementTabel>
			  <!-- 已完结 -->
			  <disputeTabel v-if="navIndex == 2" :pageData="pageData"></disputeTabel>
			  <!-- 有异议 -->
			  <endTabel v-if="navIndex == 3" :pageData="pageData"></endTabel>
			  <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
           </el-card>
       </div>
	   <!-- 发布需求 -->
	   <el-dialog title="发布需求" :visible.sync="dialogVisible" :width="$globalData.dialogWidth" >
	   			<div>
	   				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="110px" size="mini">
	   				  <el-form-item label="需求类型">
	   						<el-radio-group v-model="formInline.demandType">
	   							<el-radio-button label="1" disabled>待退款</el-radio-button>
	   							<el-radio-button label="2" disabled>广告充值</el-radio-button>
	   							<el-radio-button label="3" >本土回款</el-radio-button>
	   						</el-radio-group>
	   				  </el-form-item>
	   				  <el-form-item label="店铺数量">
	   				  		<el-input class="inputs"  v-model="formInline.shopNum" @input="getPayMoney" placeholder="店铺数量"></el-input>
	   				  </el-form-item>
	   				  <el-form-item label="回款金额">
	   				  		<el-input class="inputs"  v-model="formInline.estimatedAmount" @input="getPayMoney" placeholder="大致回款金额总计（当地货币）"></el-input><span class="inputTip">台湾地区填写具体金额</span>
	   				  </el-form-item>
	   				  <el-form-item label="预计到账">
	   				  		<el-input class="inputs"  v-model="formInline.expectMoney" disabled="disabled" placeholder="预计到账（人民币）"></el-input>
							<div>
								<span class="inputTips">换算规则：（回款金额×（1-百分比手续费）÷汇率+店铺数量*对账手续费/店）</span>
							</div>
	   				  </el-form-item>
	   				  <el-form-item label="备注">
	   				  		<el-input class="inputs" type="textarea" autosize v-model="formInline.remark" placeholder="备注"></el-input>
	   				  </el-form-item>
					  <el-form-item label="">
					  		<div>
					  			<span class="inputTips">注：发布成功后请等待操作手接单并反馈收款信息</span>
					  		</div>
					  </el-form-item>
	   				</el-form>
	   			</div>
	   			<span slot="footer" class="dialog-footer">
	   				<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
	   				<el-button size="mini" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">确认发布</el-button>
	   			</span>
	   </el-dialog>
   </div>
</template>
<script>
	import topMsg from '../components/topMsg.vue'
	import orderTabel from './components/orderTabel.vue'
	import proceedTabel from './components/proceedTabel.vue'
	import statementTabel from './components/statementTabel.vue'
	import disputeTabel from './components/disputeTabel.vue'
	import endTabel from './components/endTabel.vue'
export default {
	components:{
		topMsg,
		orderTabel,
		proceedTabel,
		statementTabel,
		disputeTabel,
		endTabel
	},
    data(){
        return{
            inputVal: 200,
            tableData: [{}],
			navList: [ // '进行中','已反馈', '已完结', '有异议'
				{
					id: 0,
					title: '回款订单'
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
					id: 2,
					title: '已完结'
				},
				{
					id: 3,
					title: '有异议'
				}
			],
			navIndex: 0,
			dialogVisible: false,
			formInline: {
				demandType: '3',
				shopNum: '',
				estimatedAmount: '',
				expectMoney: '0',
				remark: '',
				stationId: ''
			},
			postData: {
				orderStatus: '0', // 订单状态0 未接单 1 执行中 2 完成 3 有争议 4 带上传凭证
				orderType: '2', // 订单类型 0 退款 1 充值 2 回款
				userType: '1', // 用户类型 1 用户 2 操作员
				pageNum: 1,
				pageSize: $globalData.pageSize,
				stationId: ''
			},
			pageData: ''
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
			this.formInline.stationId = newData
			this.postData.stationId = newData
			this.postData.pageNum = 1
			this.getPageData()
		},
		dialogVisible(newData){
			if(newData){
				this.formInline.shopNum = ''
				this.formInline.estimatedAmount = ''
				this.formInline.expectMoney = '0'
				this.formInline.remark = ''
			}
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
		this.postData.stationId = this.pathId
		this.formInline.stationId = this.pathId
		this.getPageData()
	},
    methods:{
		getPageData(){
			this.$request.postJson('/receivable/selectOrderByUser', this.postData).then(res=>{
				if(res.code == 200){
					this.pageData = res.data
					this.dialogVisible = false
				}
			})
		},
        paginaClick(val){
			this.postData.pageNum = val
			this.getPageData()
        },
		selectorNav(i){
			this.pageData = ''
			this.navIndex = i
			this.postData.orderStatus = i
			this.postData.pageNum = 1
			this.getPageData()
		},
		demand(){
			this.dialogVisible = true
		},
		nextStep(){
			if(!this.formInline.shopNum){
				this.$alert('请输入店铺数量')
				return
			} else if(!this.formInline.estimatedAmount){
				this.$alert('请输入回款金额')
				return
			}
			this.$request.postJson('/receivable/add', this.formInline).then(res=>{
				if(res.code == 200){
					// console.log(res.data)
					this.postData.pageNum = 1
					this.dialogVisible = false
					this.getPageData()
				}
			}).catch(e=>{
				this.$message.error(e.msg)
			})
		},
		getPayMoney() {
			// 获取需要支付的金额
			this.$request.postJson('/common/calculate', {
				money: this.formInline.estimatedAmount?this.formInline.estimatedAmount:0,
				stationId: this.pathId,
				orderType: this.formInline.demandType - 1,
				shopNum: this.formInline.shopNum?this.formInline.shopNum:0
			}).then(res => {
				if (res.code == 200) {
					this.formInline.expectMoney = res.data
				}
			})
		},
    }
}
</script>
<style lang="scss" scoped>
    .unluckily{
        width: 100%;
        .cardTabel{
            width: 100%;
            margin-top: 2rem;
            .issueTitle{
                color: #3E3E3E;
                font-size: 1.7rem;
                font-weight: bold;
            }
            .issueBtn{
                float: right;
                margin-top: -.5rem;
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
	.inputTip{
		font-size: 1.2rem;
		margin-left: 1rem;
		color: #F9961E;
	}
	.inputs{
		width: 70%;
	}
	.aerobe{
		font-size: 1.8rem;
		color: #F44242;
		font-weight: bold;
	}
	.inputTips{
		font-size: 1.2rem;
		color: #F44242;
	}
</style>