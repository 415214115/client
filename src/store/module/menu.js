const menu = {
	state: {
		routers: '',
		leftMenu: '',
	},
	mutations: {
		setRouters(state, self){
			state.routers = self
		},
		setLeftMenu(state, self){
			state.leftMenu = self
		}
	},
	actions: {}
}
export default menu