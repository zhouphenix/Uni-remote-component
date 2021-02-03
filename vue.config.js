const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	// runtimeCompiler: true,
	// 路径别名
	configureWebpack: {
		resolve: {
			alias: {
				vue$: "vue/dist/vue.esm.js", // runtimeCompiler: true,
				"@c": resolve("/components"),
				"@a": resolve("/assets"),
				"@img": resolve("/static/images"),
			}
		}
	}
};
