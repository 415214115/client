<template>
	<el-card>
		<el-image style="width: 50rem; height: 50rem;position: relative;left: 50%;margin-left: -25rem;"
			:src="images?images:$globalData.defaultImg" fit="cover"></el-image>
		<div style="text-align: center;margin-top: 8rem;">
			<el-input v-model="input" style="width: 30rem;margin-right: 2rem;" disabled size="mini" placeholder="请输入内容">
			</el-input>
			<el-button type="primary" size="mini" @click="copyLink">复制邀请</el-button>
		</div>
		<div style="text-align: center;margin-top: 3rem;color: #F44242;margin-bottom: 6rem;">
			备注：合伙人等级越高，返现金额越高
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				sitetId: '',
				input: '',
				imagesData: '',
				images: ''
				// input: 'http://shopee100.com/register?code=zzzzz'
				// input: 'http://192.168.0.113:9527/register?code=zzzzz'
			}
		},
		mounted() {
			this.getStoreUserInfo()
			this.getPageData()
		},
		methods: {
			getPageData() {
				this.$request.postJson('/admin/selectUrlToShare', {
					stationId: this.sitetId
				}).then(res=>{
					if(res.code == 200){
						if(res.data.length > 0){
							this.imagesData = res.data[0]
							this.images = this.imagesData.url
						} else {
							this.imagesData = ''
							this.images = ''
						}
						
					}
				})
			},
			getStoreUserInfo(){
				let userInfo = this.$store.state.users.userInfo
				if(userInfo){
					this.input = `http://shopee100.com/register?code=${userInfo.userCode}`
				}
				// console.log(userInfo)
			},
			copyLink() {
				const input = document.createElement('input');
				document.body.appendChild(input);
				input.setAttribute('value', this.input);
				input.select();
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					// console.log('复制成功');
					this.$message.success('复制成功')
				}
				document.body.removeChild(input);
			}
	
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.listBox {
		height: calc(100vh - 45.6rem);
		overflow: hidden;
	}

	.introduce {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 2rem;
		cursor: pointer;
		padding-right: 2rem;

		img {
			width: 18rem;
			height: 11rem;
			object-fit: cover;
			border-radius: 10px;
			margin-right: 3rem;
		}

		.rightIntroduce {
			width: 85%;

			// align-items: center;
			// flex-direction: column;
			// text-align: left;
			.rightTitle {
				width: 100%;
				margin-bottom: 1.6rem;
				font-size: 1.8rem;
				height: 5rem;
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				white-space: pre-wrap;
				text-overflow: ellipsis;
				line-height: 2.5rem;
				text-align: justify;
			}

			.rightTitleTime {
				color: #6B6767;
				font-size: 1.8rem;
				word-spacing: 2rem;
				width: 100%;
				text-align: right;
			}
		}
	}
</style>
