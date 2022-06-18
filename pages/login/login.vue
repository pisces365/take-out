<template>
	<view class="container">
		<swiper class="banner-swiper" circular autoplay :interval="5000" :duration="1000">
			<swiper-item class="banner-swiper-item" v-for="(item, index) in swipers" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="content">
			<!-- section-1 begin -->
			
			<view class="section-1">
				<view class="item" open-type="switchTab"  hover-class="none" @click="Login(1)">
					<image src="/static/images/home/home_icon_ziqu1.png" mode="widthFix"></image>
					<view class="wenyue-font">普通用户</view>
					<view class="text-color-assist">取餐</view>
				</view>
				<view class="item" open-type="navigate"  hover-class="none" @click="Login(2)">
					<image src="/static/images/home/home_icon_waimai1.png" mode="widthFix"></image>
					<view class="wenyue-font">外卖员</view>
					<view class="text-color-assist">外卖存柜</view>
				</view>
			</view>
			<!-- section-2 end -->
			<!-- section-2 begin -->
			<!-- <view class="section-2">
				<navigator class="item" open-type="switchTab" url="/pages/mart/mart" hover-class="none">
					<view class="title">
						<image src="/static/images/home/home_icon_baihuo1.png"></image>
						<view>喜茶百货</view>
					</view>
					<view class="tips">灵感商品 立即选购</view>
				</navigator>
				<navigator class="item" open-type="navigate" url="/pages/home/group-dinner" hover-class="none">
					<view class="title">
						<image src="/static/images/home/home_icon_qiye1.png"></image>
						<view>企业团餐</view>
					</view>
					<view class="tips">50份起送</view>
				</navigator>
			</view> -->
			<!-- section-2 end -->
			<view class="section-3">
				<view class="my-integral" open-type="navigate" url="/pages/integrals/mall" hover-class="none">
					<view class="integrals">
						<view>请按照身份登录系统</view>
						<!-- <view class="neutra-font">63</view> -->
						<view class="tips"> </view>
					</view>
					<view class="tips">
						饱格外卖柜管理集团保留所有权利
					</view>
				</view>
				<!-- <navigator class="my-code" open-type="navigate" url="/pages/my/code" hover-class="none">
					<image src="/static/images/home/home_icon_erweima.png"></image>
					<view>会员码</view>
				</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
			accessTemporaryCode,
			authLogin
		} from '../../api/api.js'
	export default {
		onLoad() {
					this.wxLogin();
		},
		data() {
			return {
				swipers: [
					"https://pic.imgdb.cn/item/620a65de2ab3f51d91f2ca6a.jpg",
				],
				sessionId: ""
			}
		},
		methods: {
			Login(type) {
				if(type == 1) {
					console.log("1");
					this.wxAuthLogin();
					uni.switchTab({
						url: "../home/home"
					})
					
				} else {
					console.log("2");
					this.wxAuthLogin();
					uni.redirectTo({
						url: "../tabbar/tabbar"
					})
				}
				
			},
			wxLogin() {
				if(uni.getStorageSync('token'))
				{
					console.log(uni.getStorageSync('token'));
					return;
				}
				
				let _this = this;
				console.log("wxLogin");
				wx.login({
					success(res) {
						if (res.code) {
							let data = {
								code: res.code
							}
							accessTemporaryCode(data).then((result) => {
								if (result.code == "200") {
									console.log(result.data.sessionId)
									_this.sessionId = result.data.sessionId;
								}
							})
						} 
					}
				})
			},
			wxAuthLogin(){
				
				let _this = this;
				if(_this.sessionId != ""){
					uni.getUserProfile({
						desc: '获取你的名称、头像、地区',
						success: infoRes => {
							//调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户在当前小程序的唯一标识（openid）
							if (infoRes.errMsg === 'getUserProfile:ok') {
								// 获取到的当前数据存入缓存
								console.log(infoRes.encryptedData);
								console.log(infoRes.iv);
								let authData = {
									encryptedData: infoRes.encryptedData,
									iv: infoRes.iv,
									sessionId: _this.sessionId
								}
								authLogin(authData).then((secondRes) => {
									console.log(secondRes.data.token);
									if (secondRes.code == "200") {
										console.log('uni.getUserProfile',infoRes)
										uni.setStorageSync('encryptedData',infoRes.encryptedData);
										uni.setStorageSync('iv',infoRes.iv);
										uni.setStorageSync('rawData',infoRes.rawData);
										uni.setStorageSync('signature',infoRes.signature);
										uni.setStorageSync('securityStatus', 1);
										uni.setStorageSync('userInfo',infoRes.userInfo);
										uni.setStorageSync('mainPage',1);
										uni.setStorageSync('token', secondRes.data.token);
										uni.setStorageSync('id',secondRes.data.id);
										uni.setStorageSync('nickname', secondRes.data.nickname);
										console.log(secondRes.data.token);
									}
								})
							} else {
								uni.showToast({
									title: '授权失败',
									icon: 'error'
								});
							}
						},
						fail: err => {
							console.log('userInfo-err', JSON.stringify(err));
						}
					})					
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		max-height: 100%;
	}
	
	.banner-swiper {
		width: 100%;
		height: 500rpx;
		
		.banner-swiper-item {
			image {
				width: 100%;
			}
		}
	}
	
	.content {
		width: 100%;
		padding: 0 30rpx;
		position: relative;
	}
	
	.section-1 {
		position: relative;
		background-color: $bg-color-white;
		margin-top: -60rpx;
		border-radius: $border-radius-lg;
		padding: 60rpx 0;
		display: flex;
		margin-bottom: 30rpx;
		box-shadow: $box-shadow;
		
		.item {
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			
			&:nth-child(1):after {
				content: '';
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				width: 2rpx;
				background-color: $border-color;
			}
			
			image {
				width: 100rpx;
				margin-bottom: 20rpx;
			}
			
			.wenyue-font {
				font-size: 48rpx;
				margin-bottom: 10rpx;
			}	
		}
	}
	
	.section-2 {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		
		.item {
			width: 335rpx;
			background-color: #EAEBEC;
			padding: $spacing-row-lg 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: $border-radius-lg;
			
			.title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $font-size-lg;
				
				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 10rpx;
				}
			}
			
			.tips {
				display: block;
				margin: 0 auto;
				color: $text-color-assist;
				font-size: $font-size-base;
			}
		}
	}
	.tips {
		display: block;
		margin: 0 auto;
		color: $text-color-assist;
		font-size: $font-size-base;
	}
	.section-3 {
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color-assist;
		padding: 0 10rpx;
		
		.my-integral {
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.integrals {
				display: block;
				align-items: center;
				font-size: $font-size-lg;
				color: $text-color-base;
				margin-bottom: 10rpx;
				margin: 0 auto;
				.neutra-font {
					margin-left: 10rpx;
					font-size: 42rpx;
				}
			}
		}
		
		.my-code {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 30rpx;
			position: relative;
			
			image {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: $spacing-col-sm;
			}
			
			&:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				border-left: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			}
		}
	}
</style>
