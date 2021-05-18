<template>
	<el-dialog :title="`修改${dialogTitle}`" :visible.sync="dialogVisible" :width="$globalData.dialogWidth"
		:close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
		<div>
			<el-form label-position="right" :model="formInline" class="demo-form-inline" label-width="8rem" size="mini">
				<el-form-item label="新密码">
					<el-input class="inputs" v-model="formInline.oldPassword" placeholder="输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="重复密码">
					<el-input class="inputs" v-model="formInline.newPassword" placeholder="重复输入新密码"></el-input>
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
		props: ['type'],
		data() {
			return {
				dialogVisible: true,
				formInline: {
					oldPassword: '',
					newPassword: ''
				},
				dialogTitle: ''
			}
		},
		mounted() {
			if (this.type == 3) {
				this.dialogTitle = '登陆密码'
			} else if (this.type == 5) {
				this.dialogTitle = '支付密码'
			}
		},
		methods: {
			cancel() {
				this.$parent.dialogitem.newPwd = false
			},
			nextStep() {
				// 下一步
				if (!this.formInline.oldPassword || !this.formInline.newPassword) {
					this.$alert(this.dialogTitle + '不能为空')
				} else {
					if (this.formInline.oldPassword !== this.formInline.newPassword) {
						this.$alert('两次密码输入不一致')
					} else {
						const reg = $globalData.passwordReg
						if(!reg.test(this.formInline.newPassword)){
							this.$alert('密码由6-10位大小写字母和数字组成，请正确输入')
						} else {
							this.$store.commit('setBtnHandle')
							setTimeout(() => {
								this.$store.commit('setBtnHandle')
								// this.cancel()
								this.$parent.cancel()
							}, 1000)
						}
					}
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
