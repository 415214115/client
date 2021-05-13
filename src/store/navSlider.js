/**
 * 遍历路由生成左部导航
 */
import { editRouter} from '../router/index.js'
 let routerList = []
function getRouter(){
	editRouter.forEach((v, i) => {
		if(v.name == 'layout'){
			routerList = routerList.concat(v.children)
		}
	})
}
getRouter()
// console.log(routerList)
/**
 * 遍历动态菜单生成导航
 */
import menuList from '../utils/getMenu.js'
 let menus = menuList
// console.log(leftMenu)



export {
	routerList,
	menus
}