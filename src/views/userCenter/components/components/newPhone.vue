<template>
	<el-dialog title="绑定新手机" :visible.sync="dialogVisible" :width="$globalData.dialogWidth" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
		<div>
			<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
			  <el-form-item label="手机号">
			    <el-input class="inputs" v-model="formInline.phone" placeholder="手机号"></el-input>
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
			<el-button size="mini" type="primary" @click="nextStep" :loading="$store.state.handle.btnHandle">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data(){
			return{
				dialogVisible: true,
				formInline: {
					phone: '',
					code: ''
				},
				codeText: '获取验证码',
				isDisabled: false
			}
		},
		methods:{
			cancel(){
				this.$parent.dialogitem.newPhone = false
			},
			nextStep(){
				// 下一步
				if (!this.formInline.phone || !this.formInline.code) {
					this.$alert('手机号或验证码不能为空')
				} else{
					this.$store.commit('setBtnHandle')
					setTimeout(()=>{
						this.$store.commit('setBtnHandle')
						// this.cancel()
						this.$parent.cancel()
					},1000)
				}
			},
			getCode(){
				// 获取验证码
				const reg = /^1[3-9]\d{9}$/
				if (this.logins.phone && reg.test(this.logins.phone)) {
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
				} else{
					this.$alert('请输入正确的手机号码')
				}
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
