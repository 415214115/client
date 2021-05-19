import Layout from '../../views/layout'
export const vipSite = {
	path: "vipsite",
	name: "vipsite",
	component: Layout,
	hidden: false,
	meta: {
		title: '站点',
		icon: '',
		color: '#F0506E'
	},
	children: [
		{
			path: "vipunluckily/:id",
			name: "vipunluckily",
			component: () => import("@/views/vip/unluckily/index.vue"),
			hidden: false,
			meta: {
				title: '待退款',
				icon: '',
				color: ''
			}
		},
		{
			path: "vipadvertising/:id",
			name: "vipadvertising",
			component: () => import("@/views/vip/advertising/index.vue"),
			hidden: false,
			meta: {
				title: '广告充值',
				icon: '',
				color: ''
			}
		},
		{
			path: "vipreturnedmoney/:id",
			name: "vipreturnedmoney",
			component: () => import("@/views/vip/returnedmoney/index.vue"),
			hidden: false,
			meta: {
				title: '本土回款',
				icon: '',
				color: ''
			}
		}
	]
}
