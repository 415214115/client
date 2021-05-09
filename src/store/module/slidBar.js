import Vuex from 'vuex'
const slidBar = {
	state: {
		unfold: false
	},
	mutations: {
		setUnfold(self, data){
			self.unfold = !self.unfold
			console.log(self.unfold)
		}
	},
	actions: {}
}
export default slidBar