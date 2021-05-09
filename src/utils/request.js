import {http} from './http.js'
const request = {
	// getCode获取登陆验证码
	getCode:(url, params) => http({
	  url: url,
	  method: 'GET',
	  params,
	  headers: {'Content-type': 'application/x-www-form-urlencoded'},
	  responseType: 'arraybuffer'
	}),
	// get请求
	get:(url, params) => http({
	  url: url,
	  method: 'GET',
	  params,
	  headers: {'Content-type': 'application/x-www-form-urlencoded'}
	}),
	// post请求，字符串
	postForm:(url, data = {}) => http({
	  url:url,
	  method:'POST',
	  data,
	  postType: 1,
	  headers:{'Content-type': 'application/x-www-form-urlencoded'}
	}),
	// post请求，json
	postJson:(url, data = {}) => http({
	  url:url,
	  method:'POST',
	  data,
	  postType: 0,
	  headers:{'Content-type': 'application/json; charset=utf-8'}
	}),
	// GET请求，上传文件
	uploading:(url, data = {}) => http({
	  url:url,
	  method:'POST',
	  data,
	  postType: 0,
	  headers:{'Content-type': 'multipart/form-data;'},
	  processData: false,
	  contentType: false
	}),
	// get请求，下载文件
	download:(url, data = {}) => http({
	  url:url,
	  method:'GET',
	  params:data,
	  headers:{'Content-type': 'application/x-www-form-urlencoded'},
	  responseType: 'blob'
	})
}
export default request
/**
 * get请求文件下载实例
 */

// ExportFile(type, DATA).then((res) => {
//     const blob = res.data;
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onload = (e) => {
//       const a = document.createElement('a');
//       a.download = Date.parse(new Date()) + '.xlsx';
//       // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
//       a.href = e.target.result;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     };
//   }).catch(err => {
//     Message.error('下载失败！');
//   })
