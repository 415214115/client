import Vue from 'vue'
import Vuex from 'vuex'
import setTing from '../appSetting.js'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)
import {routerList, leftMenu} from './navSlider.js'
// console.log(leftMenu)
import slidBar from './module/slidBar.js'
import breadcrumb from './module/breadcrumb.js'
export default new Vuex.Store({
	state: {
		routers: routerList,
		leftMenu: leftMenu,
		layOutSetTing: setTing
	},
	mutations: {},
	actions: {},
	modules: {
		breadcrumb,
		slidBar
		
	},
	plugins: [createVuexAlong({
		name: 'appSession',
		local: {
			list: ['breadcrumb', 'slidBar'],
			// 过滤模块 header 数据， 将其他的存入 localStorage
			isFilter: true,
		  },
		session: {
			list: ['breadcrumb', 'slidBar']
		}
	})]
})
