export const userCenter = {
	path: "usercenter",
	name: "usercenter",
	component: () => import("@/views/userCenter/index.vue"),
	meta: {
		title: '个人中心',
		// icon: require('@/assets/image/defaultImg.png'),
		icon: 'el-icon-user-solid',
		color: ''
	}
}
