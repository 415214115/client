<template>
   <div class="unluckily">
	   <topMsg types="2"></topMsg>
       <div class="cardTabel">
           <el-card>
               <div slot="header">
                   <span class="issueTitle">发布中心</span>
                   <el-button type="warning" size="mini" class="issueBtn" @click="demand">发布需求</el-button>
               </div>
               <div class="handleBox">
				   <div class="handleList" v-for="(item, index) in navList" :key="index" :class="navIndex==index?'selects':''" @click="selectorNav(index)">{{ item }}</div>
               </div>
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
	   <el-dialog title="发布需求" :visible.sync="dialogVisible" :width="$globalData.dialogWidth" >
	   			<div>
	   				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="110px" size="mini">
	   				  <el-form-item label="需求类型">
	   						<el-radio-group v-model="formInline.radio1">
	   					      <el-radio-button label="待退款" disabled></el-radio-button>
	   					      <el-radio-button label="广告充值"  ></el-radio-button>
	   					      <el-radio-button label="本土回款" disabled ></el-radio-button>
	   					    </el-radio-group>
	   				  </el-form-item>
					  <div>
						  <!-- 通用 -->
						  <el-form-item label="店铺账号">
						  		<el-input class="inputs"  v-model="formInline.code" placeholder="店铺账号"></el-input>
						  </el-form-item>
						  <el-form-item label="店铺密码">
						  		<el-input class="inputs"  v-model="formInline.code" placeholder="店铺密码"></el-input>
						  </el-form-item>
					  </div>
	   				  <div>
						  <!-- 印尼 -->
						  <el-form-item label="平台虚拟账号">
								<el-input class="inputs"  v-model="formInline.code" placeholder="平台虚拟账号"></el-input>
						  </el-form-item>
	   				  </div>
					  <div>
					  		<!-- 越南 -->
						  <el-form-item label="收款二维码">
								<el-upload
								  class="avatar-uploader"
								  action="#"
								  :show-file-list="false"
								  :http-request="uploadFile">
								  <img v-if="imageUrl" :src="imageUrl" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								  <div class="el-upload__tip" slot="tip">只支持.jpg 格式</div>
								</el-upload>
						  </el-form-item>
					  </div>
	   				  <el-form-item label="备注">
	   				  		<el-input class="inputs" type="textarea" autosize v-model="formInline.code" placeholder="备注"></el-input>
	   				  </el-form-item>
	   				  <el-form-item label="充值金额">
	   				  		<el-input class="inputs" v-model="formInline.code" placeholder="充值金额"></el-input><span class="inputTip">请输入当地货币数量！</span>
	   				  </el-form-item>
	   				  <el-form-item label="支付方式">
	   				  		<el-radio-group v-model="formInline.radio">
	   				  		    <el-radio :label="3">支付宝</el-radio>
	   				  		    <el-radio :label="6">余额</el-radio>
	   				  		  </el-radio-group>
	   				  </el-form-item>
	   				  <el-form-item label="需支付">
	   				  		<span class="aerobe">5523.00元</span>
	   				  </el-form-item>
	   				  <el-form-item label="">
	   				  		<div><span class="inputTip">订单计算规则：退款金额*（1-手续费％）÷汇率-流水笔数*对账手续费</span></div>
	   						<div><span class="inputTip">手续费：3          汇率：4        手续费：5</span></div>
	   				  </el-form-item>
	   				</el-form>
	   			</div>
	   			<span slot="footer" class="dialog-footer">
	   				<el-button size="mini" @click="cancel">取 消</el-button>
	   				<el-button size="mini" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">支付</el-button>
	   				<div style="margin-top: 1rem;">仅支持 支付宝 或者 余额支付 </div>
	   			</span>
	   </el-dialog>
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
            inputVal: 200,
            tableData: [{}],
			navList:['进行中','已反馈', '已完结', '有异议'],
			navIndex: 0,
			dialogVisible: false,
			formInline: {
				
			}
        }
    },
    computed:{
        result(){
            const money = Number(this.inputVal) + 15
            const parities = money / 4
            const data = parities + 6
            return data
        },
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
		},
		uploadFile(file){
			
		}
    }
}
</script>
<style  scoped>
    .unluckily{
        width: 100%;
        
    }
	.cardTabel{
	    width: 100%;
	    margin-top: 2rem;
	    
	}
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
	    
	}
	.handleList{
	    position: relative;
	    color: #999999;
	    font-size: 1.7rem;
	    padding: 1rem 0;
	    margin-right: 6rem;
	    cursor: pointer;
	}
	.selects::after{
	        position: absolute;
	        content: '';
	        width: 100%;
	        height: 0.2rem;
	        background: #E60012;
	        left: 0;
	        bottom: 0;
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