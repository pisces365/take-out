import { baseUrl } from '../common/config.js'
//通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
export function accessTemporaryCode(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/user/code`,
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
//调用 auth.code2Session 接口，换取 用户唯一标识 OpenID
export function authLogin(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/user/authLogin`,
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function makeOrder(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/order/makeOrder`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('外卖员输入用户手机号，生成订单信息', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function closeCabinetByMan(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/order/closeCabinetByMan`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('获取到哪个柜门关闭，外卖员关闭柜门', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function takeFoodByCustomer(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/order/takeFoodByCustomer`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('获取用户外卖的柜门集合', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function closeDoorByCustomer(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/order/closeDoorByCustomer`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('顾客关闭外卖柜门，订单结束', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function takefoodMessage(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/sms/takeFood`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('发短信', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function bindUserPhone(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/user/bindUserPhone`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('绑定手机号码', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}

export function historyOrder(data) {
	return new Promise(function(reslove, reject) {
		var token = uni.getStorageSync('token');
		uni.request({
			url: `${baseUrl}/order/historyOrder`,
			method: 'POST',
			data: data,
			header: {
				"authorization": token
			},
			success: res => {
				let result = res;
				console.log('历史订单', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}