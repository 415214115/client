<template>
	<div>
		<el-dialog title="接收手机验证码" :visible.sync="dialogVisible" :width="$globalData.dialogWidth" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
			<div>
				<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
				  <el-form-item label="手机号">
				    <el-input class="inputs" v-model="formInline.phone" disabled placeholder="手机号"></el-input>
				  </el-form-item>
				  <el-form-item label="验证码">
					  <el-row>
					    <el-col :span="16">
							<el-input class="inputs"  v-model="formInline.code" placeholder="验证码"></el-input>
						</el-col>
					    <el-col :span="8">
							<el-button class="btns" type="primary" :disabled="isDisabled" @click="getCode">{{ codeText }}</el-button>
						</el-col>
					  </el-row>
				  </el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="cancel">取 消</el-button>
				<el-button size="mini" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">下一步</el-button>
			</span>
		</el-dialog>
		
		<newPhone v-if="dialogitem.newPhone"></newPhone>
		<newMsg v-if="dialogitem.newMsg" :type="type"></newMsg>
		<newPwd v-if="dialogitem.newPwd" :type="type"></newPwd>
	</div>
	
	
	<!-- <el-dialog
	      width="30%"
	      title="内层 Dialog"
	      :visible.sync="dialoginlayer"
	      append-to-body>
	    </el-dialog> -->
	
</template>

<script>
	import newPhone from './components/newPhone.vue'
	import newMsg from './components/newMsg.vue'
	import newPwd from './components/newPwd.vue'
	export default {
		props:['phone', 'type'],
		components:{
			newPhone,
			newMsg,
			newPwd
		},
		data(){
			return{
				dialogVisible: true,
				formInline: {
					phone: this.phone,
					code: ''
				},
				codeText: '获取验证码',
				isDisabled: false,
				dialogitem: {
					newPhone: false,
					newMsg: false,
					newPwd: false
				}
			}
		},
		methods:{
			cancel(){
				this.$parent.phoneCode = false
			},
			nextStep(){
				// 下一步
				if (!this.formInline.code) {
					this.$alert('验证码不能为空')
				} else{
					this.$store.commit('setBtnHandle')
					setTimeout(()=>{
						this.$store.commit('setBtnHandle')
						// this.cancel()
						if(this.type == 1){
							this.dialogitem.newPhone = true
						} else if(this.type == 2 || this.type == 4 || this.type == 6){
							this.dialogitem.newMsg = true
						} else if(this.type == 3 || this.type == 5){
							this.dialogitem.newPwd = true
						}
					},1000)
				}
			},
			getCode(){
				// 获取验证码
					let time = $globalData.getCodeTime
					const timer = setInterval(()=>{
						if (time == 0) {
							this.isDisabled = false
							this.codeText = '重新获取'
							clearInterval(timer)
						} else{
							time -= 1
							this.codeText = `${time} S`
							this.isDisabled = true
						}
					}, 1000)
			}
		}
	}
</script>

<style scoped="scoped">
	.inputs{
		width: 100%;
	}
	.btns{
		margin-left: 2rem;
	}
</style>
