import request from "./request.js"
import store from '../store/index.js'
const publicFonc = {
	getUserInfo: () => {
		// 获取用户信息
		request.postJson('/back/getUserInfo').then(res=>{
			if(res.code == 200){
				store.commit('setUserInfo', res.data)
			}
		})
	},
	balancePayment: (payPassword, money, orderId) => {
		// 余额支付
		return new Promise((reslove, reject) => {
			request.postJson('/refundPay', {
				money,
				payPassword,
				orderId
			}).then(data=>{
				if(data.code == 200){
					reslove(data)
				}
			}).catch(e=>{
				reject(e)
			})
		})
	},
	uploadFile: (file) => {
		// 上传文件
		// console.log(file)
		const formData = new FormData()
		formData.append('fileList', file)
		return new Promise((reslove, reject) => {
			request.uploading('/upload/one/upLoadImg', formData).then(data=>{
				if(data.code == 200){
					reslove(data)
				}
			}).catch(e=>{
				reject(e)
			})
		})
	},
	paging: (total) => {
		return Math.ceil((total-1)/$globalData.pageSize)
	},
	deleteExisting(id){
		let div = document.getElementById(id)
		if(div){
			let body = document.getElementsByTagName('body')[0]
			body.removeChild(div)
		}
	}
}
window.$publicFonc = publicFonc
export default publicFonc