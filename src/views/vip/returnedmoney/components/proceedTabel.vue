<template>
	<div>
		<el-table :data="pageData.list" border style="width: 100%;margin-top: 2rem;">
		     <el-table-column prop="orderNum" label="订单编号"></el-table-column>
		     <el-table-column prop="createTime" label="订单时间"></el-table-column>
		     <!-- <el-table-column prop="date" label="店铺名称"></el-table-column> -->
		     <!-- <el-table-column prop="date" label="交易流水编号"></el-table-column> -->
		     <!-- <el-table-column prop="date" label="提款截图"></el-table-column> -->
		     <el-table-column prop="estimatedAmount" label="回款金额（当地货币）"></el-table-column>
		     <el-table-column prop="expectMoney" label="待到账（人民币）"></el-table-column>
		     <el-table-column prop="date" label="状态/操作">
				 <template slot-scope="scope">
				         <div><el-button type="primary" size="mini" @click="uploadFileBtn(scope.row.id)">上传提款截图</el-button></div>
				       </template>
				 
			 </el-table-column>
		 </el-table>
		<!-- 上传凭证 -->
		<el-dialog title="上传凭证" :visible.sync="voucher" :width="$globalData.dialogWidth">
		  <div>
			  <el-form :model="image" label-position="right" label-width="22rem" size="mini" class="demo-form-inline">
				  <el-form-item label="店铺名称">
				    <el-input class="inputs" v-model="image.shopName" placeholder="店铺名称"></el-input>
				  </el-form-item>
				  <el-form-item label="交易流水编号">
				    <el-input class="inputs" v-model="image.orderBill" placeholder="交易流水编号"></el-input>
				  </el-form-item>
				  <el-form-item label="回款金额（当地货币）">
				    <el-input class="inputs" v-model="image.returnMoney" @input="calculate" placeholder="回款金额（当地货币）"></el-input>
				  </el-form-item>
				  <el-form-item label="待到账（人民币）">
				    <el-input class="inputs" v-model="image.money" disabled placeholder="待到账（人民币）"></el-input>
				  </el-form-item>
			    <el-form-item label="上传凭证">
			      <el-upload
			        class="avatar-uploader"
			        action="#"
			        :show-file-list="false"
			      	:http-request="uploadFiles"
			      	>
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
		    <el-button @click="quxiao" size="mini" :loading="$store.state.handle.btnHandle">取 消</el-button>
			<el-button @click="saveData" size="mini" :loading="$store.state.handle.btnHandle">保存</el-button>
		    <el-button type="primary" @click="determined" size="mini" :loading="$store.state.handle.btnHandle">确 定</el-button>
		  </span>
		</el-dialog>
		 <!-- <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion> -->
	</div>
</template>

	
<script>
	export default {
		props:['pageData'],
	    data(){
	        return{
				voucher: false,
				// isSaveData: false,
				orderId: '',
				image: {
					img: '',
					remark: '',
					shopName: '',
					orderBill: '',
					returnMoney: '',
					money: ''
				},
				receivableDTOS: [],
				testDta: new Map()
	        }
	    },
		watch:{
			voucher(newData){
				if(newData){
					this.image.img = ''
					this.image.remark = ''
					this.image.shopName = ''
					this.image.orderBill = ''
					this.image.returnMoney = ''
					this.image.money = ''
					// this.orderId = ''
					this.receivableDTOS = []
				}
			}
		},
	    methods:{
	        uploadFileBtn(id){
				this.orderId = id
				this.voucher = true
	        },
			saveData(){
				let data = JSON.parse(JSON.stringify(this.image))
				let y = this.testDta.get(data.orderBill)
				if(!this.image.img || !this.image.shopName || !this.image.orderBill || !this.image.returnMoney){
					this.$alert('店铺名称、流水号、回款金额、交易凭证为必填项')
					return
				}
				if(y){
					this.$alert('流水号已存在')
				} else {
					this.testDta.set(data.orderBill, data)
					this.editorData()
				}
				// this.receivableDTOS.push(this.image)
			},
			quxiao(){
				this.voucher = false
				this.testDta.clear()
			},
			editorData(){
				this.image.img = ''
				this.image.remark = ''
				this.image.shopName = ''
				this.image.orderBill = ''
				this.image.returnMoney = ''
				this.image.money = ''
			},
			calculate(){
				// 获取需要支付的金额
				this.$request.postJson('/common/calculate', {
					money: this.image.returnMoney?this.image.returnMoney:0,
					stationId: this.$route.params.id,
					orderType: 2,
					shopNum: 1
				}).then(res => {
					if (res.code == 200) {
						this.image.money = res.data
					}
				})
			},
			uploadFiles(file) {
				// 上传凭证
				const File = file.file
				this.$publicFonc.uploadFile(File).then(res=>{
					this.image.img = res.data
				})
			},
			determined(){
				let posts = false
					console.log(1)
				if (this.testDta.size > 0) {
					if(this.image.img && this.image.shopName&&this.image.orderBill&&this.image.returnMoney){
						this.saveData()
					}
					posts = true
				} else if(!this.image.img || !this.image.shopName || !this.image.orderBill || !this.image.returnMoney){
					this.$alert('店铺名称、流水号、回款金额、交易凭证为必填项')
					posts = false
					console.log(2)
				} else {
					this.saveData()
					posts = true
				}
				if(posts){
					this.$request.postJson('/receivable/pullTransferRecord', {
						receivableDTOS: [...this.testDta.values()],
						orderId: this.orderId
					}).then(res=>{
						if(res.code == 200){
							this.voucher = false
							this.$message.success('操作成功')
							this.testDta.clear()
						}
					})
				}
				
				// console.log(this.testDta)
				// return
				
			}
	    }
	}
</script>

<style scoped="scoped">
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
