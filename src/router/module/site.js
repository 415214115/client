export const site = {
	path: "site",
	name: "site",
	component: () => import("@/views/home/index.vue"),
	meta: {
		title: '新加坡',
		icon: '',
		color: '#F0506E'
	},
	children: [
		{
			path: "site1",
			name: "site1",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '待退款',
				icon: '',
				color: ''
			}
		},
		{
			path: "site2",
			name: "site2",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '广告充值',
				icon: '',
				color: ''
			}
		},
		{
			path: "site3",
			name: "site3",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '本店回款',
				icon: '',
				color: ''
			}
		}
	]
}
