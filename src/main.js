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


// 全局请求or api
import request from './utils/request'
import api from './utils/api'
Vue.prototype.$request = request
Vue.prototype.$api = api

// 全局变量
import globalData from './utils/global.js'
Vue.prototype.$globalData = globalData


import VueWechatTitle from "vue-wechat-title"
Vue.use(VueWechatTitle)
// 全局分页组件
import pagination from './components/pagination'
Vue.component('paginaTion',pagination)
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
