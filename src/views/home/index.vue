<template>
	<div class="pageHome">
		<div class="leftContent">
			<userInfo></userInfo>
			<div class="Ptext">系统及功能说明：</div>
			<el-card>
				首页
				<!-- <paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion> -->
			</el-card>
		</div>
		<card class="rightCard" title="最新公告" leftIcon="el-icon-s-data" rightIcon="el-icon-more" iconDeg="90" iconColor="#8CA0B3" :bodyStyle="{ padding: '0px' }">
			<template slot="content">
				<div class="rightCardContent">
					<div class="rightCardContentList" v-for="item in 20" :key="item">
						<i class="el-icon-message-solid rightCardContentIcon"></i>
						<div class="rightCardContentNew" v-if="isNew">NEW</div>
						<div class="rightCardContentText" :style="{width: isNew?'50%':'87%'}">
							<div class="rightCardContentTextTitle">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
							<div class="rightCardContentTextTime">2021-5-10 23:08:50</div>
						</div>
					</div>
				</div>
				
			</template>
			<template slot="footer">
				<div class="footerPagination">
					<i class="el-icon-arrow-left"></i><span>1 / 5</span><i class="el-icon-arrow-right"></i>
				</div>
			</template>
		</card>
		<!-- <div class="rightCard">
			首页
		</div> -->
	</div>
	
</template>

<script>
	import userInfo from './components/userInfo.vue'
	export default {
		components:{
			userInfo
		},
		data() {
			return {
				isNew: false
			}
		},
		mounted() {
			
		},
		watch: {},
		methods: {
			queryFunc(){
				this.getBannerData()
			},
			paginaClick(val){
				this.searchData.pageNum = val
				this.getBannerData()
			}
		}
	}
</script>

<style scoped="scoped">
	.pageHome{
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		flex-direction: row;
	}
	
	.rightCard{
		margin-left: 20px;
		width: 350px;
		overflow: hidden;
	}
	.leftContent{
		width: 100%;
	}
	.footerPagination{
		width: 100%;
		color: #FFFFFF;
		background: #1E87F0;
		height: 50px;
		text-align: center;
		line-height: 50px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.footerPagination span{
		word-spacing: 4px;
	}
	.footerPagination i{
		cursor: pointer;
	}
	.rightCardContent{
		padding: 20px;
	}
	.rightCardContentList{
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		white-space: nowrap;
		margin-bottom: 20px;
		cursor: pointer;
	}
	.rightCardContentList:last-child{
		margin-bottom: 0px;
	}
	.rightCardContentNew{
		border-radius: 64px;
		background: #F4C872;
		color: #FFFFFF;
		margin-right: 15px;
		font-size: 12px;
		padding: 2px 5px;
	}
	.rightCardContentIcon{
		margin-right: 15px;
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
		font-size: 12px;
		color: #6D6969;
		text-align: right;
	}
	.Ptext{
		font-size: 20px;
		margin-bottom: 20px;
	}
</style>
