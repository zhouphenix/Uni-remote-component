<template>
	<view class="box">
		<!-- 步骤条 -->
		<view class="set-1">
			<view class="set-2" :key="index" v-for="(item,index) in options">
				<text class="set2-test">{{item.text1}}</text>
				<view class="set-view">
					<view class="set-view-test">
						<view class="set-view-test1">{{item.text2}}</view>
						<view class="set-view-test2">任务信息：委托原因/检修项目名称</view>
					</view>
					<view class="set-view-test3">任务来源：检修标准</view>
					<view class="set-view-test4">
						<view class="set-zuo">处理详情：检修项目名称</view>
						<view class="set-you">查看详情</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			options: Array, //数据
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box{
	}
	.set-2:last-child::after {
		display: none;
	}
	.set2-test{
		font-size: 26rpx;
		color: #78849e;
	}
	.set-1 {
		margin: 30upx;
	}

	.set-2 {
		height:340rpx;
		border-radius: 10upx;
		width: 600upx;
		margin-left: 100upx;
		margin-top: 60upx;
		position: relative;
		.set-view{
			width: 100%;
			height: 266rpx;
			background-color: #ffffff;
			box-shadow: 0px 4px 16px 0px rgba(69, 91, 99, 0.08);
			border-radius: 12rpx;
			margin-top: 24rpx;
			.set-view-test{
				width: 538rpx;
				margin: 0 auto;
				padding-top: 26rpx;
				padding-bottom: 30rpx;
				border-bottom: 1px solid  #78849e;
				.set-view-test1{
					width: 100%;
					height: 32rpx;
					font-size: 26rpx;
					line-height: 32rpx;
					color: #959dad;
				}
				.set-view-test2{
					width: 100%;
					height: 32rpx;
					font-family: Gibson;
					font-size: 32rpx;
					color: #959dad;
					color: #454f63;
				}
			}
			.set-view-test3{
				width: 538rpx;
				margin: 0 auto;
				height: 32rpx;
				font-size: 26rpx;
				line-height: 32rpx;
				color: #959dad;
				margin-top: 26rpx;
			}
			.set-view-test4{
				width: 538rpx;
				margin: 6rpx auto;
				display: flex;
				align-items: center;
				.set-zuo{
					width: 70%;
					height: 32rpx;
					font-size: 12px;
					line-height: 32rpx;
					color: #959dad;
				}
				.set-you{
						width: 30%;
						text-align: right;
						height: 42rpx;
						font-size: 32rpx;
						line-height: 42rpx;
						color: #3497fd;
						text-decoration: underline;
				}
			}
		}
	}
	

	.set-2::after {
		content: '';/* 必须存在如果没有图标就留空 */
		top: 24%;/* 定位 距离*/
		border-style: dotted;
		border-left: 1px ;/* 横线颜色 */
		border-color: #78849e;
		left: -82upx;/* 定位 距离*/
		height: 90%;/* 高度 */
		position: absolute;/* 定位 */
	}

	.set-2::before {
		content: "";/* 必须存在如果没有图标就留空 */
		background: url(../../static/logo.png) no-repeat;
		background-size: 66rpx 66rpx;
		width: 66rpx;
		height: 66rpx;
		position: absolute;/* 定位 */
		left: -108upx;/* 移动到左边 */
		font-weight: bold;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-family: "iconfont" !important;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-size: 54upx;/* 图标大小 */
		font-style: normal;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-webkit-font-smoothing: antialiased;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-moz-osx-font-smoothing: grayscale;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	}



</style>
