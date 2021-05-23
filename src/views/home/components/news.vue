<template>
	<card class="rightCard" title="最新公告" leftIcon="el-icon-s-data" rightIcon="el-icon-more" iconDeg="90" iconColor="#8CA0B3" :bodyStyle="{ padding: '0px' }">
		<template slot="content">
			<div class="rightCardContent" v-if="pageData.list&&pageData.list.length > 0">
				<el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;padding-bottom: 0;position: relative;top: 17px;">
					<div v-for="(item, index) in pageData.list" :key="item.id">
						<div class="rightCardContentList">
							<i class="el-icon-message-solid rightCardContentIcon"></i>
							<div class="rightCardContentNew" v-if="index < 5&&pageNum==1">NEW</div>
							<div class="rightCardContentText" :style="{width: index < 5&&pageNum==1?'50%':'87%'}">
								<div class="rightCardContentTextTitle">{{ item.title }}</div>
							</div>
						</div>
						<div class="rightCardContentTextTime">{{ item.createTime }}</div>
						
					</div>
				</el-scrollbar>
			</div>
			<div v-else class="rightCardContent">
				<div style="text-align: center;padding-top: 3rem;">暂无数据</div>
			</div>
		</template>
		<template slot="footer">
			<div class="footerPagination">
				<i class="el-icon-arrow-left" @click="previousPage"></i><span>{{ pageData.pageNum }} / {{ pageData.pages }}</span><i class="el-icon-arrow-right" @click="nextPage"></i>
			</div>
		</template>
	</card>
</template>

<script>
	export default{
		data(){
			return{
				isNew: false,
				pageNum: 1,
				pageData: ''
			}
		},
		mounted() {
			this.getPageData()
		},
		methods:{
			previousPage(){
				if (this.pageNum == 1) {
					this.pageNum = 1
					this.$alert('已经是第一页了')
				} else{
					this.pageNum -= 1
					this.getPageData()
				}
			},
			nextPage(){
				if (this.pageNum == this.pageData.pages) {
					this.pageNum = this.pageData.pages
					this.$alert('已经是最后一页了')
				} else{
					this.pageNum += 1
					this.getPageData()
				}
			},
			getPageData(){
				this.$request.postJson('/config/message', {
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
	.rightCard{
			margin-left: 2rem;
			width: 35rem;
			overflow: hidden;
		}
		.leftContent{
			width: 100%;
		}
		.footerPagination{
			width: 100%;
			color: #FFFFFF;
			background: #1E87F0;
			height: 5rem;
			text-align: center;
			line-height: 5rem;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			position: relative;
			z-index: 5;
		}
		.footerPagination span{
			word-spacing: 0.4rem;
		}
		.footerPagination i{
			cursor: pointer;
		}
		.rightCardContent{
			// padding: 20px;
			height: calc(100vh - 24.2rem);
		}
		.rightCardContentList{
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			white-space: nowrap;
			// margin-bottom: 2rem;
			cursor: pointer;
			padding: 0 2rem;
		}
		.rightCardContentList:last-child{
			margin-bottom: 0px;
		}
		.rightCardContentNew{
			border-radius: 64px;
			background: #F4C872;
			color: #FFFFFF;
			margin-right: 1.5rem;
			font-size: 12px;
			padding: 2px 5px;
		}
		.rightCardContentIcon{
			margin-right: 1.5rem;
			color: #8CA0B3;
		}
		/* .rightCardContentText{
			width: 50%;
		} */
		.rightCardContentTextTitle{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.rightCardContentTextTime{
			font-size: 1.2rem;
			color: #6D6969;
			text-align: right;
			padding: 0 2rem;
			margin-bottom: 2rem;
			margin-top: 0.5rem;
		}
		
</style>
