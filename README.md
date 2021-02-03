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