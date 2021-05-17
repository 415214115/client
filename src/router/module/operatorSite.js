import Layout from '../../views/layout'
export const operatorSite = {
	path: "operatorsite",
	name: "operatorsite",
	component: Layout,
	hidden: false,
	meta: {
		title: '站点',
		icon: '',
		color: '#F0506E'
	},
	children: [
		{
			path: "operatorunluckily/:id",
			name: "operatorunluckily",
			component: () => import("@/views/operator/unluckily/index.vue"),
			hidden: false,
			meta: {
				title: '待退款',
				icon: '',
				color: ''
			}
		},
		{
			path: "operatoradvertising/:id",
			name: "operatoradvertising",
			component: () => import("@/views/operator/advertising/index.vue"),
			hidden: false,
			meta: {
				title: '广告充值',
				icon: '',
				color: ''
			}
		},
		{
			path: "operatorreturnedmoney/:id",
			name: "operatorreturnedmoney",
			component: () => import("@/views/operator/returnedmoney/index.vue"),
			hidden: false,
			meta: {
				title: '本店回款',
				icon: '',
				color: ''
			}
		},
		// 待退款
		{
			path: "operatorunluckily/operatororderbay/:id",
			name: "operatororderbay",
			component: () => import("@/views/operator/orderBay/index.vue"),
			hidden: true,
			meta: {
				title: '我的订单',
				icon: '',
				color: ''
			}
		},
		// 广告充值
		{
			path: "operatoradvertising/operatoradvertisingorderbay/:id",
			name: "operatoradvertisingorderbay",
			component: () => import("@/views/operator/advertisingOrder/index.vue"),
			hidden: true,
			meta: {
				title: '我的订单',
				icon: '',
				color: ''
			}
		},
		// 本店回款
		{
			path: "operatorreturnedmoney/operatorreturnedmoneyorderbay/:id",
			name: "operatorreturnedmoneyorderbay",
			component: () => import("@/views/operator/returnedmoneyOrder/index.vue"),
			hidden: true,
			meta: {
				title: '我的订单',
				icon: '',
				color: ''
			}
		}
	]
}
