import {
	home
} from '../router/module/home.js' // 首页
import {
	userCenter
} from '../router/module/userCenter.js' // 个人中心
import {
	invite
} from '../router/module/invite.js' // 邀请返现
import {
	operatorSite
} from '../router/module/operatorSite.js' // 站点--操作员
import {
	vipSite
} from '../router/module/vipSite.js' // 站点--会员

import request from './request.js'
import store from '../store/index.js'

const siteListColor = ['#DEB19D', '#E4AF58', '#6BE458', '#68A21D', '#1DA27C', '#A2911D', '#5B1DA2', '#A21D65',
	'#721DA2', '#DEB19D', '#E4AF58', '#6BE458', '#68A21D', '#1DA27C', '#A2911D', '#5B1DA2', '#A21D65', '#721DA2'
]


export default function leftMenus() {
	var  siteList = []
	request.get('/config/getStationList').then(res => {
		if (res.code == 200) {
			const data = res.data
			data.forEach((v, i) => {
				v.title = v.name
				v.color = siteListColor[i]
			})
			siteList = data
			setMenu(siteList)
			store.commit('setSiteList', data)
		}
	})
	
}
function setMenu(siteList){
	let routerLists = []
	// let siteList = store.state.users.siteList
	routerLists.push(home)
	if (siteList.length > 0) {
		siteList.forEach(v => {
			// 登陆角色--------2会员，1操作员 
			let item = ''
			if (store.state.users.loginRole == 2) {
				item = JSON.parse(JSON.stringify(vipSite))
			} else if (store.state.users.loginRole == 1) {
				item = JSON.parse(JSON.stringify(operatorSite))
			}
			item.meta.title = v.title
			item.meta.color = v.color
			item.meta.id = v.id
			item.children.forEach((c, i) => {
				c.path = `${c.path.split(':')[0]}${v.id}`
				c.meta.id = v.id
	
			})
			routerLists.push(item)
		})
		// 邀请返现--------无页面
		routerLists.push(invite)
		routerLists.push(userCenter)
	}
	
	store.commit('setLeftMenu', routerLists)
}
