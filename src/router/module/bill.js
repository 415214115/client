export const bill = {
	path: "home/bill",
	name: "bill",
	component: () => import("@/views/home/bill/index.vue"),
	meta: {
		title: '收支账单',
		// icon: require('@/assets/image/defaultImg.png'),
		// color: ''
	}
}
