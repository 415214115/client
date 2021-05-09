<template>
	<el-card>
		首页
		<!-- <div slot="header" class="clearfix">
			<span>用户管理</span>
		</div>
		<el-form :inline="true" class="demo-form-inline" :model="searchData">
			<el-form-item label="用户昵称">
				<el-input v-model="searchData.userName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="手机号码">
				<el-input v-model="searchData.phone" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryFunc">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="pageData.list" border style="width: 100%">
			<el-table-column prop="date" label="头像">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.heardImg" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="nickName" label="昵称"></el-table-column>
			<el-table-column prop="phone" label="手机号"></el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion> -->
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				pageData: '',
				searchData: {
					userName: '',
					phone: '',
					pageNum: 1,
					pageSize: this.$globalData.pageSize
				},
			}
		},
		mounted() {
			this.getBannerData()
		},
		watch: {},
		methods: {
			queryFunc(){
				this.getBannerData()
			},
			paginaClick(val){
				this.searchData.pageNum = val
				this.getBannerData()
			},
			getBannerData() {
				this.$request.postJson('/back/selectUserInfoList', this.searchData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
					}
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.bannerImage {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}

	.dialogContent>>>.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>
