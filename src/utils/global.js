import request from "./request.js"
import store from '../store/index.js'
const globalData = {
	defaultImg: require('@/assets/image/defaultImg.png'), // 默认图片
	pageSize: 20, // 分页请求数量
	getCodeTime: 60, // 获取验证码时间设定
	dialogWidth: '700px' ,// 对话框宽度
	passwordReg: /^[a-zA-Z0-9]{6,10}$/, // 密码正则验证----密码由6-10位大小写字母和数字组成
	phoneReg: /^1[3-9]\d{9}$/ // 手机号码验证
}
window.$globalData = globalData
export default globalData