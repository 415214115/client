import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'

NProgress.configure({
	easing: 'ease', // 动画方式    
	speed: 300, // 递增进度条的速度    
	showSpinner: false, // 是否显示加载ico    
	trickleSpeed: 300, // 自动递增间隔    
	minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
	// 每次切换页面时，调用进度条
	NProgress.start()
	NProgress.inc() //这会以随机数量递增，且永远达不到100%，也可以设指定增量
	const routerPath = {
		'/login': '/login',
		'/register': '/register',
		'/agreement': '/agreement'
	}
	if(routerPath[to.path]){
	  return next()
	}
	if(store.state.users.token){
	  return  next()
	}else{
	  return next('/login')
	}
	// 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
	// next()
});
router.afterEach(() => {  
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})