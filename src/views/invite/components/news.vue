<template>
	<card class="rightCard" title="合伙人排名" leftIcon="el-icon-user-solid" rightIcon="el-icon-more" iconColor="#8CA0B3" :bodyStyle="{ padding: '0px' }">
		<template slot="content">
			<div class="rightCardContent" v-if="pageData&&pageData.list.length > 0">
			<!-- <div class="rightCardContent"> -->
				<el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;padding-bottom: 0;position: relative;top: 17px;">
					<div v-for="(item, index) in pageData.list" :key="index">
						<div class="rightCardContentList">
							<!-- <i class="el-icon-message-solid rightCardContentIcon"></i> -->
							<div class="rightCardContentListindex" :style="{'background': item.sort == 1?'#F44242':item.sort == 2?'#F9961E':item.sort == 3?'#81C881':'#8c8c8c'}">{{index + 1}}</div>
							<!-- <div class="rightCardContentNew" v-if="index < 5&&pageNum==1">NEW</div> -->
							<div class="rightCardContentText" :style="{'font-size':index < 3?'1.8rem':'1.4rem'}">
								<div class="rightCardContentTextTitle">{{item.nickName?item.nickName:item.name}}</div>
							</div>
							<div class="rightCardContentText" :style="{'font-size':index < 3?'1.8rem':'1.4rem'}">
								<div class="rightCardContentTextTitle">
									<!-- 客户 -->
									<div v-if="item.leaveType == 1">一星</div>
									<div v-else-if="item.leaveType == 2">二星</div>
									<div v-else-if="item.leaveType == 3">三星</div>
									<div v-else-if="item.leaveType == 4">四星</div>
									<div v-else-if="item.leaveType == 5">五星</div>
									<div v-else>普通</div>
								</div>
							</div>
							<div class="rightCardContentText" :style="{'font-size':index < 3?'1.8rem':'1.4rem'}">
								<div class="rightCardContentTextTitle">{{item.money?item.money:0}}</div>
							</div>
						</div>
						<!-- <div class="rightCardContentTextTime">{{ item.createTime }}</div> -->
						
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
				pageData: '',
				sitetId: ''
			}
		},
		mounted() {
			this.sitetId = this.$store.state.users.siteList[0].id
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
				this.$request.postJson('/back/Paiming', {
					pageSize: this.$globalData.pageSize,
					pageNum: this.pageNum,
					stationId: this.sitetId
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
			margin-bottom: 2rem;
			cursor: pointer;
			padding: 0 2rem;
			
			.rightCardContentListindex{
				width: 3.2rem;
				height: 3.2rem;
				line-height: 3.2rem;
				text-align: center;
				background: #8c8c8c;
				color: #FFFFFF;
				border-radius: 100%;
				
			}
		}
		// .rightCardContentList:nth-child(1) .rightCardContentListindex{
		// 	background: #F44242;
		// }
		// .rightCardContentList:nth-child(2) .rightCardContentListindex{
		// 	background: #F9961E;
		// }
		// .rightCardContentList:nth-child(3) .rightCardContentListindex{
		// 	background: #81C881;
		// }
		// .rightCardContentList:last-child{
		// 	margin-bottom: 0px;
		// }
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
		.rightCardContentText{
			width: 25%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
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
