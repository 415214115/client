import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'

import reconsitution from './reconsitution.js'
Vue.use(VueRouter)
import store from '../store/index.js'
// import module
// import {banner} from './module/banner.js' // 首页
import {
	home
} from './module/home.js' // 首页
import {
	userCenter
} from './module/userCenter.js' // 个人中心
import {
	invite
} from './module/invite.js' // 邀请返现
import {
	vipSite
} from './module/vipSite.js' // 站点 会员
import {
	operatorSite
} from './module/operatorSite.js' // 站点操作员
import {
	bill
} from './module/bill.js' // 收支账单



// import './getMenu.js' // 

// console.log(routerLists)
export const routes = [{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
			icon: ''
		},
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/register',
		name: 'register',
		meta: {
			title: '注册',
			icon: ''
		},
		component: () => import('@/views/register/index.vue')
	},
	{
		path: '/agreement',
		name: 'agreement',
		meta: {
			title: '用户协议',
			icon: ''
		},
		component: () => import('@/views/agreement/index.vue')
	},
	{
		path: '/',
		name: 'layout',
		component: () => import('@/layout/index.vue'),
		redirect: '/index',
		children: [
			home,
			bill,
			vipSite,
			operatorSite,
			invite,
			userCenter
		]
		// children: routerLists
	}
]



// routes = routes.concat(classifyRouter)
const editRouter = reconsitution(routes)

store.commit('setRouters', editRouter)

const router = new VueRouter({
	mode: 'history',
	routes
})


export default router

// 一级嵌套路由实例
/**
 * {
	path: 'management',
	name: 'management',
	component: Layout,
	meta: {
		title: '首页2',
		icon: 'el-icon-location'
	},
	children: [{
			path: "index",
			name: "defaultPage",
			component: Layout,
			meta: {
				title: '专享',
				icon: 'el-icon-location'
			}
		}
	]
}
 */
// 二级嵌套路由实例
/**
 * {
	path: 'management',
	name: 'management',
	component: Layout,
	meta: {
		title: '首页2',
		icon: 'el-icon-location'
	},
	children: [{
			path: "index",
			name: "defaultPage",
			component: Layout,
			meta: {
				title: '专享',
				icon: 'el-icon-location'
			},
			children: [{
					path: "indexall",
					name: "defaultPage123",
					component: () => import("@/views/test/index.vue"),
					hidden: true,
					meta: {
						title: '专享福利333333',
						icon: 'el-icon-location'
					}
				}
			]
		}
	]
}
 */
