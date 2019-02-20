var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'development',
	entry: path.join(__dirname,'./src/main.js'),
	output: {
		path: path.join(__dirname,'./dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname,'./src/index.html'),
			filename: 'index.html'
		}),
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader','css-loader','less-loader']
			},
			{//图片的配置选项
				test: /\.(jpg|png|gif|jpeg)/,
				use: 'url-loader?limit=29107&name=[hash:8]-[name].[ext]'
			},
			{//字体的配置规则
				test: /\.(ttf|svg|eot|woff|woff2)/,
				use: 'url-loader'
			},
			{//js的配置规则,配置babel转换js高级语法
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{//处理 .vue 文件的loader
				test: /\.vue$/,
				use: 'vue-loader'
			}
		]
	},
	resolve: {//设置寻找包的别名
		//alisa别名的意思 修改vue被导入时的入口文件
		alias: {
			// 如果是以vue结尾的包，就去这个路径下去寻找这个包的入口文件
			"vue$": "vue/dist/vue.js"
		}
	}
}