<template>
	<card class="topCard">
		<template slot="content">
			<div class="infoBox">
				<div>
					<el-image class="headerImage" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" fit="cover"></el-image>
					<div>
						<div></div>
					</div>
				</div>
				<div>又想</div>
			</div>
		</template>
	</card>
</template>

<script>
</script>

<style scoped="scoped">
	.topCard{
		margin-bottom: 20px;
	}
	.infoBox{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.headerImage{
		width: 120px;
		height: 120px;
		border-radius: 100%;
		margin-right: 20px;
	}
</style>
