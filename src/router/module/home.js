export const home = {
	path: "index",
	name: "index",
	component: () => import("@/views/home/index.vue"),
	meta: {
		title: '首页',
		icon: require('@/assets/image/defaultImg.png'),
		color: ''
	}
}
