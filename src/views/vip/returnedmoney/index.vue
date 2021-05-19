<template>
   <div class="unluckily">
	   <topMsg types="3"></topMsg>
       <div class="cardTabel">
           <el-card>
               <div slot="header">
                   <span class="issueTitle">发布中心</span>
                   <el-button type="warning" size="mini" class="issueBtn" @click="demand">发布需求</el-button>
               </div>
               <div class="handleBox">
				   <div class="handleList" v-for="(item, index) in navList" :key="index" :class="navIndex==index?'selects':''" @click="selectorNav(index)">{{ item }}</div>
               </div>
              <orderTabel v-if="navIndex == 0"></orderTabel>
			  <proceedTabel v-if="navIndex == 1"></proceedTabel>
			  <statementTabel v-if="navIndex == 2"></statementTabel>
			  <disputeTabel v-if="navIndex == 3"></disputeTabel>
			  <endTabel v-if="navIndex == 4"></endTabel>
           </el-card>
       </div>
	   <el-dialog title="发布需求" :visible.sync="dialogVisible" :width="$globalData.dialogWidth" >
	   			<div>
	   				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="110px" size="mini">
	   				  <el-form-item label="需求类型">
	   						<el-radio-group v-model="formInline.radio1">
	   					      <el-radio-button label="待退款" disabled></el-radio-button>
	   					      <el-radio-button label="广告充值" disabled ></el-radio-button>
	   					      <el-radio-button label="本土回款"  ></el-radio-button>
	   					    </el-radio-group>
	   				  </el-form-item>
	   				  <el-form-item label="店铺数量">
	   				  		<el-input class="inputs"  v-model="formInline.code" placeholder="店铺数量"></el-input>
	   				  </el-form-item>
	   				  <el-form-item label="回款金额">
	   				  		<el-input class="inputs"  v-model="formInline.code" placeholder="大致回款金额总计（当地货币）"></el-input><span class="inputTip">台湾地区填写具体金额</span>
	   				  </el-form-item>
	   				  <el-form-item label="预计到账">
	   				  		<el-input class="inputs"  v-model="formInline.code" placeholder="预计到账（人民币）"></el-input>
							<div>
								<span class="inputTips">换算规则：（回款金额×（1-百分比手续费）÷汇率+店铺数量*对账手续费/店）</span>
							</div>
	   				  </el-form-item>
	   				  <el-form-item label="备注">
	   				  		<el-input class="inputs" type="textarea" autosize v-model="formInline.code" placeholder="备注"></el-input>
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
			navList:['回款订单','进行中', '待结算', '争议中', '已完结'],
			navIndex: 0,
			dialogVisible: false,
			formInline: {
				
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
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
	},
    methods:{
        paginaClick(val){

        },
		selectorNav(i){
			this.navIndex = i
		},
		demand(){
			this.dialogVisible = true
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