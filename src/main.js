import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(ElementUI)
import './nprogress' // permission control

Vue.config.productionTip = false

import leftMenus from './utils/getMenu'
Vue.prototype.$setMenu = leftMenus
// 全局请求or api
import request from './utils/request'
import api from './utils/api'
Vue.prototype.$request = request
Vue.prototype.$api = api

// 全局变量
import globalData from './utils/global.js'
Vue.prototype.$globalData = globalData
// 公共函数
import publicFonc from './utils/publicFonc.js'
Vue.prototype.$publicFonc = publicFonc

import VueWechatTitle from "vue-wechat-title"
Vue.use(VueWechatTitle)
// 全局分页组件
import pagination from './components/pagination'
Vue.component('paginaTion',pagination)
import card from './components/card'
Vue.component('card',card)
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
