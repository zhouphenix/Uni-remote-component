<template>
	<view class="z-remote">
		<component :is="currentView" v-bind="$props" />
	</view>
</template>

<script>
	import '@/hooks/less.min.js'

	export default {
		name: 'V587Remote',
		props: {
			value: String,
			remoteId: String
		},
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
		},
		methods: {
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
			},
			resolveStr(str) {
				return {
					templates: str.match(/<template>([\s\S]*)<\/template>/)[1],
					sctipts: str.match(/<script.*>([\s\S]*)<\/script>/)[1],
					styles: str.match(/<style.*>([\s\S]*)<\/style>/)[1],
				}
			}
		}
	}
</script>

<style lang="scss">
	.z-remote {}
</style>
