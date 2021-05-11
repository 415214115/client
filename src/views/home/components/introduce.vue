<template>
	<el-card :body-style="{ padding: '2rem 0' }">
		<div class="listBox">
			<el-scrollbar wrap-class="scrollbar-wrapper" style="height: 104%;padding-left: 2rem;">
				<div class="introduce" v-for="item in 10" :key="item">
					<img src="../../../assets/image/defaultImg.png" alt="">
					<div class="rightIntroduce">
						<div class="rightTitle">
							跨境电子商务是基于网络发展起来的，网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间
						</div>
						<div class="rightTitleTime">
							发布时间：2021-5-11 11:34:05
						</div>
					</div>
				</div>
			</el-scrollbar>
		</div>
		
		
		<paginaTion :totalNum="0" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				
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
			width: 93rem;
			// align-items: center;
			// flex-direction: column;
			// text-align: left;
			.rightTitle{
				width: 100%;
				margin-bottom: 1.6rem;
				font-size: 1.8rem;
				height: 4.5rem;
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
