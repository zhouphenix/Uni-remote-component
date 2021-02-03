# Uni-remote-component

## 介绍
此插件用于加载远程服务端组件


## 使用
使用方式： 和普通组件一样

1. 导入组件  ` 	import Remote from '@/components/v587-remote/v587-remote.vue' `
2. 注册组件
	+ 本地注册  ` components: {Remote}`
	+ 全局注册  `Vue.component('Remote', Remote)` 
3. template 中引入 `<remote :remote-id="remoteId" :value="remoteData"></remote>`

其中`remoteId` 通过工具方法生成

```
getId() {
		let d = new Date().getTime()
		let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = (d + Math.random() * 16) % 16 | 0
			d = Math.floor(d / 16)
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
		})
		return uid
	}
```

`remoteData` 为远程端组件（未编译过的）

获取示例

```
async getData() {
		// 缓存远程组件数据， 这里只是举个栗子， 并未实现
		// const url = '/static/AsyncPluginCmt.vue'
		// let remoteData = this.$store.getters.getRemoteByUrl(url)
		// if (remoteData) {
		// 	this.remoteData = remoteData
		// } else {
		// 	const res = await request.get(url)
		// 	this.remoteData = res
		// 	this.remoteId = this.getId()
		// 	this.$store.dispatch('cacheRemote', {
		// 			url: url,
		// 			cssId: this.remoteId,
		// 			resData: this.remoteData
		// 		})
		// }

		const url = '/static/AsyncPluginCmt.vue'
		const res = await request.get(url)
		this.remoteData = res
		this.remoteId = this.getId()
	}

```


## 原理

提取模板字符串 + 解析template、 css、 style + 渲染到dom

如存在服务端远程组件 `/static/AsyncPluginCmt.vue`, 完整内容入下
```
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

```

+ 步骤一： 提取模板
```
resolveStr(str) {
		return {
			templates: str.match(/<template>([\s\S]*)<\/template>/)[1],
			sctipts: str.match(/<script.*>([\s\S]*)<\/script>/)[1],
			styles: str.match(/<style.*>([\s\S]*)<\/style>/)[1],
		}
	}
```

+ 步骤二：解析 + 渲染

	这里css 使用了Less render方法渲染， 所以支持Less （至于Sass/Scss暂不支持）
	思路是：`new SassCssProcessor().process(resource, reader, writer)`
```
	computed: {
		currentView() {
			if (!this.value) return {
				name: 'Loading',
				template: "<div class='z-loading'>正在加载中...</div>"
			}
			const tplData = this.resolveStr(this.value)
			let ponentObj = new Function(
				`return ${tplData.sctipts.slice(tplData.sctipts.indexOf('{'),tplData.sctipts.lastIndexOf('}')+1)}`)()
			ponentObj.template = tplData.templates
			this.$el.setAttribute('class', `remote css${this.remoteId}`)
			if (!document.querySelector(`style[id=css${this.remoteId}]`)) { //防止重复创建
				let cssStr =
					`
				.css${this.remoteId}{
					${tplData.styles}
				}
			`
				this.resolveCss(cssStr)
			}
			return ponentObj
		}
	}
	
	methods:{
		resolveCss(lessInput) {
			// new SassCssProcessor().process(resource, reader, writer)
			less.render(lessInput).then(function(output) {
				let style = document.createElement("style")
				style.setAttribute("type", "text/css")
				style.setAttribute("id", 'css' + this.remoteId)
				if (style.styleSheet) // IE
					style.styleSheet.cssText = output.css
				else { // w3c
					let cssText = document.createTextNode(output.css)
					style.appendChild(cssText)
				}
				let heads = document.getElementsByTagName("head")
				if (heads.length)
					heads[0].appendChild(style)
				else
					document.documentElement.appendChild(style)
			}.bind(this))
		}
	}	
```

## 使用时需要注意

* 远程端组件使用需要写完整标签，如button 需要用uni-button（非components引入的组件样式可能会丢失）
* 第三方组件引用示例(需要预先注册才能使用)
* ...待更新
