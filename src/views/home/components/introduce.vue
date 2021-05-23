<template>
	<el-card :body-style="{ padding: '2rem 0' }">
		<div class="listBox" v-if="pageData.list&&pageData.list.length > 0">
			<el-scrollbar wrap-class="scrollbar-wrapper" style="height: 104%;padding-left: 2rem;">
				<div class="introduce" v-for="item in pageData.list" :key="item.id">
					<img :src="item.img?item.img:$globalData.defaultImg" alt="">
					<div class="rightIntroduce">
						<div class="rightTitle">
							{{ item.title }}
						</div>
						<div class="rightTitleTime">
							发布时间：{{ item.createTime }}
						</div>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<div v-else class="rightCardContent">
			<div style="text-align: center;padding-top: 3rem;">暂无数据</div>
		</div>
		
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				pageNum: 1,
				pageData: ''
			}
		},
		mounted() {
			this.getPageData()
		},
		methods:{
			paginaClick(val){
				this.pageNum = val
				this.getPageData()
			},
			getPageData(){
				this.$request.postJson('/config/rule', {
					pageSize: this.$globalData.pageSize,
					pageNum: this.pageNum
				}).then(res=>{
					if(res.code == 200){
						this.pageData = res.data
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.listBox{
		height: calc(100vh - 45.6rem);
		overflow: hidden;
	}
	.introduce{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 2rem;
		cursor: pointer;
		padding-right: 2rem;
		img{
			width: 18rem;
			height: 11rem;
			object-fit: cover;
			border-radius: 10px;
			margin-right: 3rem;
		}
		.rightIntroduce{
			width:85%;
			// align-items: center;
			// flex-direction: column;
			// text-align: left;
			.rightTitle{
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
			.rightTitleTime{
				color: #6B6767;
				font-size: 1.8rem;
				word-spacing: 2rem;
				width: 100%;
				text-align: right;
			}
		}
	}
</style>
