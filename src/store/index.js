import Vue from 'vue'
import Vuex from 'vuex'
import setTing from '../appSetting.js'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)
// import {routerList, menus} from './navSlider.js'
// console.log(leftMenu)

import slidBar from './module/slidBar.js'
import breadcrumb from './module/breadcrumb.js'
import menu from './module/menu.js'
import users from './module/users.js'
import handle from './module/handle.js'
export default new Vuex.Store({
	state: {
		layOutSetTing: setTing
	},
	mutations: {},
	actions: {},
	modules: {
		breadcrumb,
		slidBar,
		menu,
        users,
		handle
	},
    getters:{
        getBreadcrumb: (state) => {
            return state.breadcrumb.breadcrumb
        }
    },
	plugins: [createVuexAlong({
		name: 'appSession',
		local: {
			list: ['breadcrumb', 'slidBar', 'menu', 'users', 'handle'],
			// 过滤模块 header 数据， 将其他的存入 localStorage
			isFilter: true,
		  },
		session: {
			list: ['breadcrumb', 'slidBar', 'users', 'menu', 'handle']
		}
	})]
})
