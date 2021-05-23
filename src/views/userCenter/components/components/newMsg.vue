<template>
	<el-dialog :title="`修改${dialogTitle}`" :visible.sync="dialogVisible" :width="$globalData.dialogWidth"
		:close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
		<div>
			<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="10rem" size="mini">
				<div v-if="type==6">
					<el-form-item label="户主姓名">
						<el-input class="inputs" v-model="formInline.adonai" placeholder="户主姓名"></el-input>
					</el-form-item>
					<el-form-item label="开户行">
						<el-input class="inputs" v-model="formInline.bankName" placeholder="开户行"></el-input>
					</el-form-item>
				</div>
				<el-form-item :label="type==2?'微信号':type==4?'支付宝':type==6?'银行卡号':''">
					<el-input class="inputs" v-model="formInline.inputVal"
						:placeholder="type==2?'微信号':type==4?'支付宝':type==6?'银行卡号':''"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="cancel" :loading="$store.state.handle.btnHandle">取 消</el-button>
			<el-button size="mini" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		props: ['type'],
		data() {
			return {
				dialogVisible: true,
				formInline: {
					inputVal: '',
					bankName: '',
					adonai: ''
				},
				dialogTitle: ''
			}
		},
		mounted() {
			if (this.type == 2) {
				this.dialogTitle = '联系微信'
			} else if (this.type == 4) {
				this.dialogTitle = '收款支付宝'
			} else if (this.type == 6) {
				this.dialogTitle = '银行卡账号'
			}
		},
		methods: {
			cancel() {
				this.$parent.dialogitem.newMsg = false
			},
			nextStep() {
				// 下一步
				if (!this.formInline.inputVal) {
					this.$alert(this.dialogTitle + '不能为空')
				} else {
					// this.$store.commit('setBtnHandle')
					let urls = ''
					let data = {
						phone: this.$store.state.users.userInfo.phone
					}
					if(this.type == 2){
						// 微信
						urls = '/back/updateWeChat'
						data.weChat = this.formInline.inputVal
					} else if(this.type == 4){
						// 支付宝
						urls = '/back/updateAli'
						data.alipayCard = this.formInline.inputVal
					} else if(this.type == 6){
						// 银行卡
						urls = '/back/updateBank'
						data.bankNum = this.formInline.inputVal
						data.bankName = this.formInline.bankName
						data.realName = this.formInline.adonai
					}
					this.$request.postJson(urls, data).then(res=>{
						if(res.code == 200){
							this.$message.success('修改成功')
							this.$parent.getUserInfo()
							this.$parent.cancel()
						}
					}).catch(e => {
						this.$alert('修改失败')
					})
					
					
					
					
					
					
					// setTimeout(() => {
					// 	// this.$store.commit('setBtnHandle')
					// 	// this.cancel()
					// 	this.$parent.cancel()
					// }, 1000)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.inputs {
		width: 100%;
	}

	.btns {
		margin-left: 2rem;
	}
</style>
