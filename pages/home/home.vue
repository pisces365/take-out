<template>
	<view class="container">
		<swiper class="banner-swiper" circular autoplay :interval="5000" :duration="1000">
			<swiper-item class="banner-swiper-item" v-for="(item, index) in swipers" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="content">
			<!-- section-1 begin -->
			<!-- <view class="section-1">
				<navigator class="item" open-type="switchTab" url="/pages/index/index" hover-class="none">
					<image src="/static/images/home/home_icon_ziqu1.png" mode="widthFix"></image>
					<view class="wenyue-font">门店自取</view>
					<view class="text-color-assist">下单免排队</view>
				</navigator>
				<navigator class="item" open-type="navigate" url="/pages/addresses/addresses" hover-class="none">
					<image src="/static/images/home/home_icon_waimai1.png" mode="widthFix"></image>
					<view class="wenyue-font">外卖</view>
					<view class="text-color-assist">无需接触 送喜到家</view>
				</navigator>
			</view> -->
			<!-- <view style="height: 40rpx;"></view> -->
			<!-- section-2 end -->
			<!-- section-2 begin -->
			<view class="section-2">
				<navigator class="item" open-type="navigate" url="/commonuser/takefood/takefood" hover-class="none">
					<view class="title">
						<image src="/static/images/home/home_icon_qiye1.png"></image>
						<view>我要取餐</view>
					</view>
					<view class="tips">输入取件码</view>
				</navigator>
				<navigator class="item" open-type="switchTab" url="/pages/order/order" hover-class="none">
					<view class="title">
						<image src="/static/images/home/home_icon_baihuo1.png"></image>
						<view>外卖订单</view>
					</view>
					<view class="tips">历史记录</view>
				</navigator>
			</view>
			<!-- section-2 end -->
			<view class="section-3">
				<!-- <navigator class="my-integral" open-type="navigate" url="/pages/integrals/mall" hover-class="none">
					<view class="integrals">
						<view>我的积分</view>
						<view class="neutra-font">63</view>
					</view>
					<view class="tips">
						可兑换喜茶劵和丰富灵感周边
					</view>
				</navigator>
				<navigator class="my-code" open-type="navigate" url="/pages/my/code" hover-class="none">
					<image src="/static/images/home/home_icon_erweima.png"></image>
					<view>会员码</view>
				</navigator> -->
			</view>
		</view>
		
		
		<uni-popup ref="popup3" :type="type2" :animation="true" :maskClick="false" @change="change">
			<view style="padding: 50px; background-color: #fff;">
				<view class="code-section" style="">
					<view style="font-size: 60rpx;">请绑定手机号</view>
					<input type="number" style="height: 100rpx;
						background-color: #666666; 
						color: white;
						" :value="userphone" @input="onInput"/>
					<view class="user-form">
						
						<button type="primary" style="margin-top: 120rpx; height: 80rpx; width: 300rpx;" @click="close2">确认</button>
						
					</view>
					<view style="height: 60rpx; "></view>
					<view class="tips">注意：绑定后将不可修改</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
			bindUserPhone
		} from '../../api/api.js'
	export default {
		data() {
			return {
				swipers: [
					"http://preview.qiantucdn.com/58pic/39/69/35/11z58PICXw0DJVw758PICdwg58PIC_PIC2018.jpg!qt324_nowater_jpg",
					"http://preview.qiantucdn.com/ing/62/87/35/90F58PIChxniUinVyJ8X2_PIC2018.jpg!qt324_nowater_jpg",
					"http://preview.qiantucdn.com/58pic/39/70/82/47058PICm3mXPf5d3J7u3_PIC2018.jpg!qt324_nowater_jpg",
					"http://preview.qiantucdn.com/58pic/39/69/68/67658PIC695tM600ciW6p_PIC2018.jpg!qt324_nowater_jpg",
					"http://preview.qiantucdn.com/58pic/40/48/01/33M58PICfW3ctbmQvUh6z_origin_PIC2018.jpg!qt324_nowater_jpg"
				],
				type2: 'center',
				userphone: ''
			}
		},
		onShow() {
			if(!uni.getStorageSync('userphone'))
			{
				console.log("???")
				this.$refs['popup3'].open();
			}
		},
		methods: {
			onInput(e) {this.userphone=e.detail.value},
			close2() {
				
				uni.setStorageSync('userphone',this.userphone);
				let data = {
					userId: uni.getStorageSync("id"),
					phone: this.userphone
				}
				bindUserPhone(data).then((result) => {
								if (result.code == "200") {
									console.log("good!")
								}
							})
				
				
				this.$refs['popup3'].close();
				
			},
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
		margin-top: 60rpx;
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
				color: $text-color-assist;
				font-size: $font-size-base;
			}
		}
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
				display: flex;
				align-items: center;
				font-size: $font-size-lg;
				color: $text-color-base;
				margin-bottom: 10rpx;
				
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
	
	.code-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-size-base;
		color: $font-size-base;
		
		.tips {
			font-size: $font-size-sm;
			color: $text-color-assist;
		}
	}
	.user-form {
		.form-item {
			width: 100%;
			display: flex;
			align-items: center;
			
			.label {
				width: 160rpx;
			}
			
			input {
				flex: 1;
			}
			
			.radio {
				display: flex;
				margin-right: 50rpx;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
