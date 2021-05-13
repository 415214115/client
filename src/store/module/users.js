const users = {
	state: {
		token: '',
        userInfo: '',
        loginRole: '' // 登陆角色--------1会员，2操作员 
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
		}
	},
	actions: {}
}
export default users