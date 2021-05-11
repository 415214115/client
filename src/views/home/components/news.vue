<template>
	<card class="rightCard" title="最新公告" leftIcon="el-icon-s-data" rightIcon="el-icon-more" iconDeg="90" iconColor="#8CA0B3" :bodyStyle="{ padding: '0px' }">
		<template slot="content">
			<div class="rightCardContent">
				<el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;padding-bottom: 0;position: relative;top: 17px;">
					<div class="rightCardContentList" v-for="item in 20" :key="item">
						<i class="el-icon-message-solid rightCardContentIcon"></i>
						<div class="rightCardContentNew" v-if="isNew">NEW</div>
						<div class="rightCardContentText" :style="{width: isNew?'50%':'87%'}">
							<div class="rightCardContentTextTitle">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
							<div class="rightCardContentTextTime">2021-5-10 23:08:50</div>
						</div>
					</div>
				</el-scrollbar>
			</div>
		</template>
		<template slot="footer">
			<div class="footerPagination">
				<i class="el-icon-arrow-left"></i><span>1 / 5</span><i class="el-icon-arrow-right"></i>
			</div>
		</template>
	</card>
</template>

<script>
	export default{
		data(){
			return{
				isNew: false
			}
		},
		methods:{
			paginaClick(val){
				console.log(val)
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
			font-size: 12px;
			color: #6D6969;
			text-align: right;
		}
		
</style>
