const api = {
	login: '/back/login', // 登陆
	getLunBoTu: '/car/getLunBoTu', // 获取轮播图
	upLoadImg: '/upload/one/upLoadImg', // 上传单张文件
	addLunBo: '/back/addLunBo' ,// 添加轮播图
	deleteLunBo: '/back/deleteLunBo' ,// 删除轮播图
	selectAnLi: '/car/selectAnLi' ,// 获取案例列表
	addColorType: '/back/addColorType',// 添加车辆颜色
	selectColorList: '/car/selectColorList' ,// 获取车辆颜色列表
	deleteColorType: '/back/deleteColorType' ,// 删除颜色
	deleteCheMo: '/back/deleteCheMo' ,// 删除产品系列
	addCheMoType: '/back/addCheMoType' ,// 添加产品系列
	selectCheMoList: '/car/selectCheMoList' ,// 查询产品系列
	addCarType: '/back/addCarType' ,// 新增汽车品牌
	selectCarType: '/back/selectCarType' ,// 获取汽车品牌列表---
	delCarType: '/back/delCarType' ,// 删除汽车品牌
	addStore: '/back/addStore' ,// 添加店铺
	getStoreList: '/car/getStoreList' ,// 店铺列表
	delStore: '/back/delStore' ,// 删除店铺
	addCarModelType: '/back/addCarModelType' ,// 新增案例
	deleteModelType: '/back/deleteModelType' ,// 删除案例
	addInformation: '/back/addInformation' ,// 新增资讯
	selectInformations: '/car/selectInformations' ,// 查询资讯列表
	delInformation: '/back/delInformation' ,// 删除资讯列表
	addModelPrice: '/back/addModelPrice' ,// 价位配置
	selectPricelist: '/back/selectPricelist',//价格列表查询
	delModelPrice: '/back/delModelPrice' ,// 删除价格
	addOrUpdateUserCarinfo: '/back/addOrUpdateUserCarinfo' ,// 添加质保卡
	selectUserTypeList: '/back/selectUserTypeList' ,// 获取质保卡列表
	delUserTypeList: '/back/delUserTypeList' // 删除质保卡
}
export default api
/**
 * 后台api列表,
 * 若api地址直接写到请求体里面，直接忽略本文件
 */