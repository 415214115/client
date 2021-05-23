<template>
	<div class="pageHome">
		<card>
			<template slot="content">
				<div class="userHead">
					<el-image class="userImages"
						src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" fit="cover">
					</el-image>
					<div class="userName">{{ userInfo.nickName?userInfo.nickName:userInfo.name }}</div>
				</div>
				<div class="functionModule">
					<div class="moduleList" v-for="item in functionModule" :key="item.id"
						:style="{background: item.bgColor}">
						<div class="moduleBox">
							<el-image class="moduleIcon" :src="item.icon" fit="cover"></el-image>
							<div class="moduleMsg">
								<div class="moduleTitle">{{ item.title }}</div>
								<div class="moduleVal">{{ item.val?item.val:'未绑定' }}</div>
							</div>
							<div class="moduleBtn" @click="updateMsg(item.id)">
								<span class="moduleBtnText">{{ item.btnText }}</span>
								<i class="btnIcons" :class="item.btnIcon"></i>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template slot="footer">
				<div class="footerText">
					说明：请仔细检查支付宝和银行卡账号是否正确，提现会优先以您勾选的方式到账（也可能会是另一种收款方式）。
				</div>
			</template>
		</card>
		<phoneCode :phone="receiveCodePhone" :type="updateType" v-if="phoneCode" ></phoneCode>

	</div>

</template>

<script>
	import phoneCode from './components/phoneCode.vue'
	export default {
		components: {
			phoneCode
		},
		data() {
			return {
				functionModule: [{
						id: 1,
						title: '手机绑定',
						icon: require('@/assets/image/userCenter/sj.png'),
						btnText: '修改',
						val: '',
						btnIcon: 'el-icon-arrow-right',
						bgColor: '#81C881'
					},
					{
						id: 2,
						title: '微信绑定',
						icon: require('@/assets/image/userCenter/wx.png'),
						btnText: '修改',
						val: '',
						btnIcon: 'el-icon-arrow-right',
						bgColor: '#E3A51C'
					},
					{
						id: 3,
						title: '登录密码',
						icon: require('@/assets/image/userCenter/mm.png'),
						btnText: '修改',
						val: '*****',
						btnIcon: 'el-icon-arrow-right',
						bgColor: '#E17B4F'
					},
					{
						id: 4,
						title: '收款支付宝',
						icon: require('@/assets/image/userCenter/zfb.png'),
						btnText: '修改',
						val: '',
						btnIcon: 'el-icon-arrow-right',
						bgColor: '#F9961E'
					},
					{
						id: 5,
						title: '支付密码',
						icon: require('@/assets/image/userCenter/zfmm.png'),
						btnText: '修改',
						val: '*****',
						btnIcon: 'el-icon-arrow-right',
						bgColor: '#4FA8E1'
					},
					{
						id: 6,
						title: '收款银行卡',
						icon: require('@/assets/image/userCenter/yhk.png'),
						btnText: '修改',
						val: '',
						btnIcon: 'el-icon-arrow-right',
						bgColor: '#BD5A5A'
					}
				],
				phoneCode: false,
				updateType: '',
				userInfo: '',
				receiveCodePhone: ''
			}
		},
		mounted() {
			this.getStoreUserInfo()
		},
		methods: {
			updateMsg(id){
				/**
				 * @param {id}  1.修改手机2修改微信3.修改登陆密码4.修改支付宝5.修改支付密码6.修改收款银行卡
				 */
				this.updateType = id
				if(this.updateType){
					this.phoneCode = true
				}
			},
			getStoreUserInfo(){
				let userInfo = this.$store.state.users.userInfo
				if(userInfo){
					this.userInfo = userInfo
					this.initData()
				}
				console.log(userInfo)
			},
			initData(){
				// 电话号码脱敏
				let phone = this.userInfo.phone.split('')
				let phoneData = []
				phone.forEach((v, i)=>{
					if(i>2&&i<7){
						phoneData.push('*')
					} else {
						phoneData.push(v)
					}
				})
				this.functionModule[0].val = phoneData.join('') // 电话
				this.receiveCodePhone = phoneData.join('')
				this.functionModule[1].val = this.userInfo.weChat?this.userInfo.weChat:'未绑定' // 微信
				 // 支付宝脱敏
				let alipayCardData = []
				if(this.userInfo.alipayCard){
					let alipayCard = this.userInfo.alipayCard.split('')
					alipayCard.forEach((v, i)=>{
						if(i>2&&i<(alipayCard.length-3)){
							alipayCardData.push('*')
						} else {
							alipayCardData.push(v)
						}
					})
				}
				this.functionModule[3].val = alipayCardData.length>0?alipayCardData.join(''):'未绑定' // 支付宝
				// 银行卡脱敏
				let bankCardData = []
				if(this.userInfo.bankNum){
					let bankCard = this.userInfo.bankNum.split('')
					bankCard.forEach((v, i)=>{
						if(i>2&&i<(bankCard.length-3)){
							if(i>2&&i<9){
								bankCardData.push('*')
							}
						} else {
							bankCardData.push(v)
						}
					})
				}
				this.functionModule[5].val = bankCardData.length>0?bankCardData.join(''):'未绑定' // 银行卡
				this.$forceUpdate()
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.pageHome {
		width: 100%;
		// text-align: center;

		.userHead {
			text-align: center;

			.userImages {
				border-radius: 100%;
				width: 11rem;
				height: 11rem;
				margin-bottom: 2rem;
			}

			.userName {
				color: #00448B;
				font-size: 2.8rem;
				font-weight: normal;
			}
		}

		.functionModule {
			.moduleList {
				width: 26%;
				height: 14rem;
				border-radius: 10px;
				background: red;
				color: #FFFFFF;
				display: inline-block;
				margin-left: 3.1%;
				margin-right: 6rem;
				margin-top: 9rem;
				padding: 4rem 2rem;

				.moduleBox {
					display: flex;
					justify-content: space-between;
					white-space: nowrap;
					align-items: center;
					text-align: left;

					.moduleIcon {
						width: 5rem;
						height: 5rem;
						margin-right: 2rem;
					}

					.moduleMsg {
						width: 14rem;

						.moduleTitle,
						.moduleVal {
							font-weight: normal;
							font-size: 2.4rem;
						}
					}

					.moduleBtn {
						cursor: pointer;

						span {
							margin-right: 1rem;
						}
					}
				}
			}
		}

		.footerText {
			color: #EC6161;
			margin-top: 6rem;
			font-size: 1.8rem;
			text-align: left;
			margin-bottom: 5rem;
			padding-left: 9rem;
		}
	}
</style>
