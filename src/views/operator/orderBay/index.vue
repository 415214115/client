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
							<!-- <div v-if="navIndex == 1">待操作</div>
							<div v-if="navIndex == 4">
									<el-button type="info" size="mini" @click="notArrive(scope.row)">未到账</el-button>
								<el-button type="primary" size="mini" style="margin-top: 1rem;" @click="payment(scope.row)">已到账</el-button>
							</div>
							<div v-if="navIndex == 2">已完结</div> -->
							<div v-if="navIndex == 1">
								<el-button type="primary" size="mini" @click="notArrive(scope.row)">上传凭证</el-button>
							</div>
							<div v-if="navIndex == 0">等待客户确认到账</div>
							<div v-if="navIndex == 2">已确认到账</div>
							<div v-if="navIndex == 3">
								<el-button type="primary" size="mini" @click="notArrive(scope.row)">重新上传</el-button>
							</div>
						</template>
					</el-table-column>
                </el-table>

		        <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
				
           </el-card>
       </div>
	   <!-- 上传凭证 -->
	   <el-dialog title="上传凭证" :visible.sync="voucher" :width="$globalData.dialogWidth">
	     <div>
	   	  <el-form :model="image" class="demo-form-inline" label-width="10rem" label-position="right">
	   	    <el-form-item label="上传凭证">
	   	      <el-upload
	   	        class="avatar-uploader"
	   	        action="#"
	   	        :show-file-list="false"
	   	      	:http-request="uploadFile"
	   	      	>
	   	        <img v-if="image.imgs" :src="image.imgs" class="avatar">
	   	        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	   	      </el-upload>
	   	    </el-form-item>
	   	    <el-form-item label="备注">
	   	      <el-input class="inputs" v-model="image.mark" placeholder="备注"></el-input>
	   	    </el-form-item>
	   	  </el-form>
	   	  
	     </div>
	     <span slot="footer" class="dialog-footer">
	       <el-button @click="voucher = false" size="mini" :loading="$store.state.handle.btnHandle">取 消</el-button>
	       <el-button type="primary" @click="determined" size="mini" :loading="$store.state.handle.btnHandle">确 定</el-button>
	     </span>
	   </el-dialog>
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
			voucher: false,
			image: {
				imgs: '' ,// 上传的凭证图片
				orderId: '',
				mark: ''// 备注
			},
			 // 0 未执行  1执行中 2 完成 3争议
			// navList:['进行中','已反馈', '已完结', '有异议'],
			navList:[
				{
					id: 1,
					title: '进行中'
				},
				{
					id: 0,
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
			postData:{
				orderStatus: 1,
				orderNO: '',
				pageNum: 1,
				pageSize: $globalData.pageSize
			},
			pageData: ''
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
			this.postData.pageNum = 1
			this.getPageData()
		},
		voucher(newdata){
			if(!newdata){
				this.image.imgs = ''
				this.image.orderId = ''
				this.image.mark = ''
			}
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
		if(!this.$store.getters.getBreadcrumb.includes('我的订单')){
			this.$store.getters.getBreadcrumb.push('我的订单')
		}
		this.getPageData()
	},
    methods:{
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
		pageBack(){
			this.$router.back()
		},
		getPageData(){
			this.$request.postJson('/selectOpeRefundOrder', this.postData).then(res=>{
				if(res.code == 200){
					this.pageData = res.data
				}
			})
		},
		notArrive(row){
			this.image.orderId = row.id
			this.voucher = true
		},
		determined(){
			// 上传凭证
			if(!this.image.imgs){
				this.$alert('请上传凭证')
				return
			}
			this.$request.postJson('/dispute', this.image).then(res=>{
				if(res.code == 200){
					if(this.postData.pageNum > 1){
						this.postData.pageNum = Math.ceil((this.pageData.total-1)/$globalData.pageSize)
					}
					this.getPageData()
					this.voucher = false
				}
			})
		},
		uploadFile(file) {
			// 上传凭证
			const File = file.file
			this.$publicFonc.uploadFile(File).then(res=>{
				this.image.imgs = res.data
			})
		}
    },
	beforeDestroy() {
		this.$store.getters.getBreadcrumb.pop()
	}
}
</script>
<style scoped>
    .unluckily{
        width: 100%;
    }
	.cardTabel{
	            width: 100%;
	            margin-top: 2rem;
				
	        }
			.span{
				cursor: pointer;
			}
			.issueTitle{
			    color: #3E3E3E;
			    font-size: 1.7rem;
			}
			.issueBtn{
			    float: right;
				color: #3E3E3E;
				font-size: 1.7rem;
				font-weight: bold;
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