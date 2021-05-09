import Vue from 'vue'
import Vuex from 'vuex'
import setTing from '../appSetting.js'
Vue.use(Vuex)
import routers from './navSlider.js'
import slidBar from './module/slidBar.js'
export default new Vuex.Store({
	state: {
		routers: routers,
		// layOutSetTing: setTing
	},
	mutations: {},
	actions: {},
	modules: {
		slidBar
		
	}
})
