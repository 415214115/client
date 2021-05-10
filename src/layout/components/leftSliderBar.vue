<template>
	<div class="slideBar">
		<div class="leftLogo flex" :class="!$store.state.slidBar.unfold?'unfold':'pack'">
			<div v-if="!$store.state.slidBar.unfold"></div>
			<img class="leftLogoImg" v-if="!$store.state.slidBar.unfold" src="../../assets/logo.png" alt="">
			<i class="elIcon" :class="!$store.state.slidBar.unfold?'el-icon-s-fold':'el-icon-s-unfold'"
				:title="!$store.state.slidBar.unfold?'收起':'展开'" @click="setUnfold"></i>
		</div>
		<el-scrollbar wrap-class="scrollbar-wrapper" :style="{width: !$store.state.slidBar.unfold?'380px':'63px'}">
			<el-menu 
				:default-active="$route.path" 
				text-color="#fff" 
				active-text-color="#333333"
				:router="true"
				:unique-opened="true"
				:collapse="$store.state.slidBar.unfold"
				class="el-menu-vertical-demo" :class="!$store.state.slidBar.unfold?'unfold':'pack'"
			>
				<div  v-for="(item, index) in navSliderBar" :key="index">
					<el-submenu :index="`${item.path}${index}`" v-if="item.children">
						<template slot="title">
							<img class="menuLftIcon" :src="item.meta.icon" v-if="item.meta.icon" style="width: 20px;height: 20px;" alt="">
							<div v-else class="menuTag" :style="{background:item.meta.color}"></div>
							<span slot="title">{{ item.meta.title }}</span>
						</template>
						<div v-for="list in item.children" :key="list.name">
							<div v-if="list.children">
								<el-submenu :index="list.path">
									<template slot="title">
										<img class="menuLftIcon" :src="list.meta.icon" v-if="list.meta.icon" style="width: 20px;height: 20px;" alt="">
										<div v-else class="menuTag" :style="{background:list.meta.color}"></div>
										<span slot="title">{{ list.meta.title }}</span>
									</template>
									<el-menu-item v-for="listItem in list.children" :key="listItem.name" v-show="!listItem.hidden" :index="`${listItem.path}`" :class="$route.path==listItem.path?'el-menubefore':''">
										<img class="menuLftIcon" :src="listItem.meta.icon" v-if="listItem.meta.icon" style="width: 20px;height: 20px;" alt="">
										<div v-else class="menuTag" :style="{background:listItem.meta.color}"></div><span slot="title">{{ listItem.meta.title }}</span>
									</el-menu-item>
								</el-submenu>
							</div>
							<div v-else>
								<el-menu-item :index="`${list.path}`" v-show="!list.hidden" :class="$route.path==list.path?'el-menubefore':''" @click="submenuItemClick(list)">
									<img class="menuLftIcon" :src="list.meta.icon" v-if="list.meta.icon" style="width: 20px;height: 20px;" alt="">
									<div v-else class="menuTag" :style="{background:list.meta.color}"></div><span slot="title">{{ list.meta.title }}</span>
								</el-menu-item>
							</div>
						</div>
					</el-submenu>
					<el-menu-item :index="item.path" v-else v-show="!item.hidden" :class="$route.path==item.path?'el-menubefore':''" @click="menuItemClick(item)">
						<img class="menuLftIcon" :src="item.meta.icon" v-if="item.meta.icon" style="width: 20px;height: 20px;" alt="">
						<div v-else class="menuTag" :style="{background:item.meta.color}"></div>
						<span slot="title">{{ item.meta.title }}</span>
					</el-menu-item>
				</div>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navSliderBar: this.$store.state.leftMenu,
				// settings: this.$store.state.layOutSetTing
			}
		},
		mounted() {
			// this.navSliderBar = this.$store.state.routers
			// console.log(this.navSliderBar)
		},
		computed: {

		},
		methods: {
			setUnfold() {
				this.$store.commit('setUnfold')
			},
			menuItemClick(item){
				let data = []
				data.push(item.meta.title)
				this.$store.commit('setBreadcrumb', data)
			},
			submenuItemClick(item){
				let cItem = item.meta
				const fItem = this.navSliderBar.filter(v => {
					return v.meta.id == cItem.id
				})
				let data = []
				data.push(fItem[0].meta.title)
				data.push(cItem.title)
				this.$store.commit('setBreadcrumb', data)
			}
		}
	}
</script>

<style scoped="scoped">
	/* .islogos {
	height: calc(100% - 50px);
}
.noislogos{
	height: 100%;
} */
	.slideBar {
		height: 100%;
	}

	.el-menu {
		text-align: initial;
	}

	.logoBox {
		height: 50px;
		width: 100%;
		overflow: hidden;
		padding: 0 20px;
		background: #2B2F3A;
		display: flex;
		justify-content: space-around;
		flex-wrap: nowrap;
		color: #FFFFFF;
		line-height: 50px;
		font-weight: 600;
		font-family: "楷体";
		font-size: 15px;
	}

	.logoImg {
		/* width: 30px; */
		height: 20px;
		margin-top: 15px;
	}

	.slideBar>>>.el-scrollbar__wrap {
		overflow: auto;
		height: 100%;
	}

	.slideBar>>>.scrollbar-wrapper {
		margin-right: -19px !important;
		/* border-right: 1px solid #304156; */
		/* background-color: #304156; */
		height: 100%;
		/* transition: all 2s; */
	}

	.el-scrollbar {
		height: calc(100% - 90px);
		/* width: 100% !important; */
		transition: all .4s;
	}
	.slideBar>>>.el-icon-arrow-right{
		display: none;
	}
	.el-menu-vertical-demo {}

	.menuLftIcon {
		display: inline-block;
		margin-right: 35px;
		width: 35px;
		height: 35px;
	}

	.unfold {
		width: 380px;
	}

	.pack {
		width: 63px;
	}

	.el-menu .titleIcon {
		color: #ffffff;
		margin-right: 5px;
	}

	.el-menu {
		border: none;
	}

	/* .el-submenu >>> .el-menu,.el-submenu>>>.el-menu-item{
	background-color: #2B3540;
	position: relative;
} */
	.el-submenu>>>.el-submenu__title:hover,
	.el-submenu>>>.el-menu-item:hover,
	.el-menu-vertical-demo>>>.el-menu-item:focus,
	.el-menu-vertical-demo>>>.el-menu-item:hover {
		background-color: #D0E5F6;
		color: #1E87F0 !important;
	}

	.el-menubefore {
		background-color: #D0E5F6;
		color: #1E87F0 !important;
	}

	.el-menubefore span {
		color: #1E87F0 !important;
	}

	.el-menubefore::before {
		width: 5px;
		height: 100%;
		background: #1E87F0;
		left: 0;
		top: 0;
		content: '';
		position: absolute;
	}

	/* .el-submenu>>>.el-menu-item:focus{
	background-color: #2B2F3A;
} */
	.el-submenu>>>.el-submenu__icon-arrow {
		right: 30px;
	}

	.leftLogo {
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		font-size: 28px;
		padding-left: 20px;
		height: 90px;
		background: #1E87F0;
		transition: all .4s;
	}

	.leftLogoImg {
		height: 30px
	}

	.elIcon {
		cursor: pointer;
	}

	.menuTag {
		width: 14px;
		height: 14px;
		display: inline-block;
		margin-right: 38px;
		margin-left: 3px;
		border-radius: 100%;
	}
</style>
<style>
	.el-menu-item,
	.el-submenu span {
		font-weight: 600;
		color: #333333 !important;
	}
</style>
