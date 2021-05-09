module.exports = {
	lintOnSave: false,
	devServer: {
		port: 9527,
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		// proxy: {
		// 	'^/api/test': {
		// 		target: 'http://192.168.0.106:8081', //接口域名
		// 		changeOrigin: true, //是否跨域
		// 		ws: true, //是否代理 websockets
		// 		secure: false, //是否https接口
		// 		pathRewrite: { //路径重置
		// 			'^/api': '/api'
		// 		}
		// 	},
		// 	'^/api/ceshi': {
		// 		target: 'http://192.168.0.103:6666', //接口域名
		// 		changeOrigin: true, //是否跨域
		// 		ws: true, //是否代理 websockets
		// 		secure: false, //是否https接口
		// 		pathRewrite: { //路径重置
		// 			'^/test': '/test'
		// 		}
		// 	}
		// }

	},
}
