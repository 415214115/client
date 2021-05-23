const users = {
	state: {
		token: '',
        userInfo: '',
        loginRole: '' ,// 登陆角色--------2会员，1操作员 ,
		siteList: [] // 站点列表
	},
	mutations: {
		setToken(state, self){
			state.token = self
		},
        setUserInfo(state, self){
			state.userInfo = self
		},
        setLoginRole(state, self){
			state.loginRole = self
		},
		setSiteList(state, self){
			state.siteList = self
		}
	},
	actions: {}
}
export default users