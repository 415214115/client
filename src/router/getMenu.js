import {home} from './module/home.js' // 首页
import {userCenter} from './module/userCenter.js' // 个人中心
import {invite} from './module/invite.js' // 个人中心



const siteList = ['台湾', '马来西亚', '泰国', '菲律宾', '越南', '新加坡']
let routerLists = []


routerLists.push(home)


siteList.forEach(v => {
	let item = {
		path: "site",
		name: "site",
		component: () => import("@/views/home/index.vue"),
		meta: {
			title: '',
			icon: require('@/assets/image/defaultImg.png'),
			color: ''
		},
		children: [{
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

	item.meta.title = v


	routerLists.push(item)
	// console.log(routerLists)
})
routerLists.push(userCenter)
routerLists.push(invite)

export default routerLists
