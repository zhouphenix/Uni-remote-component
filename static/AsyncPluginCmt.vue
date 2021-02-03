<template>
	<view class="async-plugin-cmt">
		<p>
			我是异步方式加载的插件组件AsyncPluginCmt
		</p>
		<img src="/static/logo.png">
		<p>* 远程端组件使用需要写完整标签，如button 需要用uni-button</p>
		<uni-button type="default" @click="handleClick">remote端button</uni-button>
		<!-- 本地项目的资源无法访问 -->
		<!-- <img src="../../src/assets/logo.png"> -->
		<h4 style="margin-top: 20px;">
			第三方组件引用示例(需要全局注册才能使用)
		</h4>
		<uni-steps :options="stepslist"></uni-steps>
		<view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'AsyncPluginCmt',
		data() {
			return {
				stepslist: [{
					text1: "2020-10-10 12:00",
					text2: "工单产生1"
				}, {
					text1: "2020-10-10 12:00",
					text2: "工单产生2"
				}]

			}
		},
		mounted() {
			console.log("异步组件AsyncPluginCmt加载完成: ");
		},
		methods: {
			handleClick(e) {
				console.log('e:', e);
				alert(JSON.stringify(e.pageX))
			}
		}
	}
</script>

<style scoped>
	.async-plugin-cmt {
		color: red;
		font-size: 12px;
	}

	p {
		text-align: center;
		line-height: 30px;
	}
</style>
