export const operatorSite = {
	path: "operatorsite",
	name: "operatorsite",
	component: () => import("@/views/home/index.vue"),
	meta: {
		title: '站点',
		icon: '',
		color: '#F0506E'
	},
	children: [
		{
			path: "operatorunluckily/:id",
			name: "operatorunluckily",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '待退款',
				icon: '',
				color: ''
			}
		},
		{
			path: "operatoradvertising/:id",
			name: "operatoradvertising",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '广告充值',
				icon: '',
				color: ''
			}
		},
		{
			path: "operatorreturnedmoney/:id",
			name: "operatorreturnedmoney",
			component: () => import("@/views/home/index.vue"),
			meta: {
				title: '本店回款',
				icon: '',
				color: ''
			}
		}
	]
}
