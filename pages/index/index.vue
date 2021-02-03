<template>
	<view class="content">
		<button type="default" @click="getData">本地端button, 点击加载Remote组件</button>
		<view class="remote-container">
			<remote :remote-id="remoteId" :value="remoteData"></remote>
		</view>
	</view>
</template>

<script>
	import logo from '@img/logo.png'
	import Remote from '@/components/v587-remote/v587-remote.vue'
	import request from '@/api'

	export default {
		components: {
			Remote
		},
		data() {
			return {
				title: '异步组件示例',
				logo,
				remoteData: null,
				remoteId: null
			}
		},
		methods: {
			getId() {
				let d = new Date().getTime()
				let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					let r = (d + Math.random() * 16) % 16 | 0
					d = Math.floor(d / 16)
					return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
				})
				return uid
			},
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
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	button {
		margin: 10px auto;
	}

	.remote-container {
		border: 1px dashed blue;
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
	}
</style>
