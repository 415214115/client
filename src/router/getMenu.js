import {home} from './module/home.js' // 首页
import {userCenter} from './module/userCenter.js' // 个人中心
import {invite} from './module/invite.js' // 邀请返现
import {operatorSite} from './module/operatorSite.js' // 站点--操作员
import {vipSite} from './module/vipSite.js' // 站点--会员
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
    // console.log(item.path)
	item.children.forEach(c=>{
        // console.log(c.path)
		c.path = `/${item.path}/${c.path.split(':')[0]}${v.id}`
		// console.log(c.path)
		c.meta.id = v.id
	})
	routerLists.push(item)
})
routerLists.push(invite)
routerLists.push(userCenter)

// function reconsitution(route){
// 	route.forEach((page, i) => {
// 		if(page.children && page.children.length > 0){
// 			page.children.forEach((child, i)=>{
// 				child.path = `${page.path}/${child.path}`
// 				if(child.children){
// 					child.children.forEach((childjunior, i)=>{
// 						childjunior.path = `${child.path}/${childjunior.path}`
// 						if(childjunior.children){
// 							childjunior.children.forEach((v, i)=>{
// 								v.path = `${childjunior.path}/${v.path}`
// 							})
// 						}
// 					})
// 				}
// 			})
// 		}
// 	})
// 	return route
// }
// const menuList = reconsitution(routerLists)
store.commit('setLeftMenu', routerLists)
// const menuList = routerLists
		// console.log(menuList)
// export default menuList
