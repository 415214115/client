import {home} from '../router/module/home.js' // 首页
import {userCenter} from '../router/module/userCenter.js' // 个人中心
import {invite} from '../router/module/invite.js' // 邀请返现
import {operatorSite} from '../router/module/operatorSite.js' // 站点--操作员
import {vipSite} from '../router/module/vipSite.js' // 站点--会员
// import reconsitution from './reconsitution.js'
// console.log( new Object(site)   )
import store from '../store/index.js'
const siteList = [
	{
		id: 1,
		title: '台湾',
		color: '#F0506E'
	},
	{
		id: 2,
		title: '马来西亚',
		color: '#0670E3'
	},
	{
		id: 3,
		title: '泰国',
		color: '#5CF908'
	},
	{
		id: 4,
		title: '菲律宾',
		color: '#F0506E'
	},{
		id: 5,
		title: '越南',
		color: '#F0506E'
	},{
		id: 6,
		title: '新加坡',
		color: '#F0506E'
	}
	
]


export default function leftMenus(){
	let routerLists = []
	
	routerLists.push(home)
	siteList.forEach(v => {
	    // 登陆角色--------1会员，2操作员 
	    let item = ''
		if (store.state.users.loginRole == 1) {
		    item = JSON.parse(JSON.stringify(vipSite))
	    } else if (store.state.users.loginRole == 2) {
		    item = JSON.parse(JSON.stringify(operatorSite))
	    }
		item.meta.title = v.title
		item.meta.color = v.color
		item.meta.id = v.id
		item.children.forEach(c=>{
			c.path = `${c.path.split(':')[0]}${v.id}`
			c.meta.id = v.id
		})
		routerLists.push(item)
	})
	routerLists.push(invite)
	routerLists.push(userCenter)
	store.commit('setLeftMenu', routerLists)
}



