export const site = {
	path: "site",
	name: "site",
	component: () => import("@/views/home/index.vue"),
	meta: {
		title: '站点',
		icon: '',
		color: '#F0506E'
	},
	children: [
		{
			path: "unluckily/:id",
			name: "unluckily",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '待退款',
				icon: '',
				color: ''
			}
		},
		{
			path: "advertising/:id",
			name: "advertising",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '广告充值',
				icon: '',
				color: ''
			}
		},
		{
			path: "returnedmoney/:id",
			name: "returnedmoney",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '本店回款',
				icon: '',
				color: ''
			}
		}
	]
}
